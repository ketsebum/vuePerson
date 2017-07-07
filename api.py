# -*- coding: utf-8 -*-`
"""api.py - Create and configure the Game API exposing the resources.
This can also contain game logic. For more complex games it would be wise to
move game logic to another file. Ideally the API will be simple, concerned
primarily with communication to/from the API's users."""

import logging
import endpoints
from protorpc import remote, messages

from models import User
from models import StringMessage,UserForm, UserForms
from utils import get_by_urlsafe, get_user

USER_REQUEST = endpoints.ResourceContainer(firstName=messages.StringField(1),
                                           lastName=messages.StringField(2),
                                           dob=messages.StringField(3),
                                           phoneNumber=messages.StringField(4),
                                           zipCode=messages.StringField(5))

@endpoints.api(name='word_bait', version='v1')
class WordBaitAPI(remote.Service):
    """Person API"""

    @endpoints.method(request_message=USER_REQUEST,
                      response_message=StringMessage,
                      path='user',
                      name='create_user',
                      http_method='POST')
    def create_user(self, request):
        """Create a User. Requires a unique username"""
        # No validation required for duplication
        user = User(firstName=request.firstName,
                    lastName=request.lastName,
                    dob=request.dob,
                    phoneNumber=request.phoneNumber,
                    zipCode=request.zipCode)
        user.put()
        return StringMessage(message='{} created in our database!'.format(
            request.firstName))

    @endpoints.method(response_message=UserForms,
                      path='all/users',
                      name='all_users',
                      http_method='GET')
    def all_users(self, request):
        """Get All Users"""
        return User.query().get().get_all_users()


api = endpoints.api_server([WordBaitAPI])
