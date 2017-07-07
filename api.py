# -*- coding: utf-8 -*-`
"""api.py - Create and configure the Game API exposing the resources.
This can also contain game logic. For more complex games it would be wise to
move game logic to another file. Ideally the API will be simple, concerned
primarily with communication to/from the API's users."""

import logging
import endpoints
from protorpc import remote, messages
from google.appengine.api import memcache
from google.appengine.api import taskqueue

from models import User
from models import StringMessage,UserForm, UserForms
from utils import get_by_urlsafe, get_user

USER_REQUEST = endpoints.ResourceContainer(firstName=messages.StringField(1),
                                           lastName=messages.StringField(2),
                                           dob=messages.StringField(3),
                                           phoneNumber=messages.StringField(4),
                                           zipCode=messages.StringField(5),)
LOGIN_REQUEST = endpoints.ResourceContainer(user_name=messages.StringField(1),
                                           password=messages.StringField(2))

MEMCACHE_MOVES_REMAINING = 'MOVES_REMAINING'


@endpoints.api(name='word_bait', version='v1')
class WordBaitAPI(remote.Service):
    """Game API"""

    @endpoints.method(request_message=USER_REQUEST,
                      response_message=StringMessage,
                      path='user',
                      name='create_user',
                      http_method='POST')
    def create_user(self, request):
        """Create a User. Requires a unique username"""
        # No validation required for duplication
        user = User(name=request.user_name, email=request.email)
        user.put()
        return StringMessage(message='User {} created!'.format(
            request.user_name))

    @endpoints.method(response_message=UserForms,
                      path='all/users',
                      name='all_users',
                      http_method='GET')
    def all_users(self, request):
        """Get All Users"""
        return User.query().get().get_all_users()


api = endpoints.api_server([WordBaitAPI])
