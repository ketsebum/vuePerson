# -*- coding: utf-8 -*-`
"""api.py - Create and configure the Person API exposing the resources."""

import logging
import endpoints
from protorpc import remote, messages

from datetime import datetime
from models import User
from models import StringMessage, UserForm, UserForms, IDMessage

USER_REQUEST = endpoints.ResourceContainer(UserForm)
DELETE_USER = endpoints.ResourceContainer(id=messages.IntegerField(1))


@endpoints.api(name='person', version='v1')
class PersonAPI(remote.Service):
    """Person API"""

    @endpoints.method(request_message=USER_REQUEST,
                      response_message=IDMessage,
                      path='user',
                      name='create_user',
                      http_method='POST')
    def create_user(self, request):
        """Create a Person"""
        # No validation required for duplication

        try:
            dob = datetime.strptime(request.dob, '%m/%d/%Y')
        except ValueError:
            raise endpoints.BadRequestException('Wrong date format provided')

        user = User(firstName=request.firstName,
                    lastName=request.lastName,
                    dob=dob,
                    phoneNumber=request.phoneNumber,
                    zipCode=request.zipCode)
        user.put()
        return IDMessage(message='{} was created successfully in the database!'.format(user.firstName),
                             id='{}'.format(user.key.id()))

    @endpoints.method(response_message=UserForms,
                      path='all/users',
                      name='all_users',
                      http_method='GET')
    def all_users(self, request):
        """Get All People"""
        base = User.query().get()
        if not base:
            raise endpoints.NotFoundException('There are no people found in our database!')
        return base.get_all_users()

    @endpoints.method(request_message=DELETE_USER,
                      response_message=IDMessage,
                      path='user/{id}',
                      name='delete_user',
                      http_method='DELETE')
    def delete_user(self, request):
        """Delete Person"""
        remove = User.get_by_id(request.id)
        user = remove.firstName
        id = request.id
        if not remove:
            raise endpoints.NotFoundException('Person not found!')
        remove.delete()
        return IDMessage(message='{} was deleted successfully in the database!'.format(user),
                         id='{}'.format(id))

    @endpoints.method(request_message=USER_REQUEST,
                      response_message=StringMessage,
                      path='update/user',
                      name='update_user',
                      http_method='POST')
    def update_user(self, request):
        """Update a Person"""

        if not request.id:
            raise endpoints.BadRequestException('ID required for update')

        try:
            dob = datetime.strptime(request.dob, '%m/%d/%Y')
        except ValueError:
            raise endpoints.BadRequestException('Wrong date format provided')

        user = User.get_by_id(request.id)

        if not user:
            raise endpoints.NotFoundException('Person not found!')

        user.update(request, dob)

        return StringMessage(message='{} was updated in our database!'.format(
          request.firstName))

api = endpoints.api_server([PersonAPI])
