"""models.py - This file contains the class definitions for the Datastore
entities used by the Game. Because these classes are also regular Python
classes they can include methods (such as 'to_form' and 'new_game')."""

# This import isn't working because of Python rules listed:
# https://cloud.google.com/appengine/kb/?csw=1#libraries
# Install a library that can do proper word validation
# from google.appengine.ext import vendor
# vendor.add('libs')
# import enchant

import random

from random import randint
from datetime import date
from protorpc import messages
from google.appengine.ext import ndb
import time
import webapp2_extras.appengine.auth.models

from webapp2_extras import security


class User(webapp2_extras.appengine.auth.models.User):
    """User profile"""
    name = ndb.StringProperty(required=True)
    email = ndb.StringProperty(required=True)

    def get_all_users(self):
        users = User.query().fetch()
        return UserForms(items=[ref.to_form() for ref in users])

    def to_form(self):
        return UserForm(name = self.name)

    def set_password(self, raw_password):
        """Sets the password for the current user

        :param raw_password:
            The raw password which will be hashed and stored
        """
        self.password = security.generate_password_hash(raw_password, length=12)

    @classmethod
    def get_by_auth_token(cls, user_id, token, subject='auth'):
        """Returns a user object based on a user ID and token.

        :param user_id:
            The user_id of the requesting user.
        :param token:
            The token string to be verified.
        :returns:
            A tuple ``(User, timestamp)``, with a user object and
            the token timestamp, or ``(None, None)`` if both were not found.
        """
        token_key = cls.token_model.get_key(user_id, subject, token)
        user_key = ndb.Key(cls, user_id)
        # Use get_multi() to save a RPC call.
        valid_token, user = ndb.get_multi([token_key, user_key])
        if valid_token and user:
            timestamp = int(time.mktime(valid_token.created.timetuple()))
            return user, timestamp

        return None, None

class UserForm(messages.Message):
    """Return multiple ScoreForms"""
    name = messages.StringField(1, required=True)

class UserForms(messages.Message):
    """Return multiple ScoreForms"""
    items = messages.MessageField(UserForm, 1, repeated=True)

class StringMessage(messages.Message):
    """StringMessage-- outbound (single) string message"""
    message = messages.StringField(1, required=True)
