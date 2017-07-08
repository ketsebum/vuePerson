# -*- coding: utf-8 -*-`
"""api.py - Create and configure the Game API exposing the resources.
This can also contain game logic. For more complex games it would be wise to
move game logic to another file. Ideally the API will be simple, concerned
primarily with communication to/from the API's users."""

import logging
import endpoints
from protorpc import remote, messages

from datetime import datetime
from models import User
from models import StringMessage, UserForm, UserForms

USER_REQUEST = endpoints.ResourceContainer(UserForm)
DELETE_USER = endpoints.ResourceContainer(id=messages.IntegerField(1))

@endpoints.api(name='person', version='v1')
class PersonAPI(remote.Service):
    """Person API"""

    @endpoints.method(request_message=USER_REQUEST,
                      response_message=StringMessage,
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
        return StringMessage(message='{} was created in our database!'.format(
            request.firstName))

    @endpoints.method(response_message=UserForms,
                      path='all/users',
                      name='all_users',
                      http_method='GET')
    def all_users(self):
        """Get All Users"""
        return User.query().get().get_all_users()

    @endpoints.method(request_message=DELETE_USER,
                      response_message=StringMessage,
                      path='user/{id}',
                      name='delete_user',
                      http_method='DELETE')
    def delete_user(self, request):
        """Delete User"""
        remove = User.get_by_id(request.id)
        if not remove:
            raise endpoints.NotFoundException('Person not found!')
        name = remove.firstName
        remove.delete()
        return StringMessage(message='{} was deleted in our database!'.format(
            name))


api = endpoints.api_server([PersonAPI])
