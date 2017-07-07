"""models.py - This file contains the class definitions for the Datastore
entities used by the Game. Because these classes are also regular Python
classes they can include methods (such as 'to_form' and 'new_game')."""

from datetime import date
from protorpc import messages
from google.appengine.ext import ndb
import time

class User(ndb.Model):
    """User profile"""
    firstName = ndb.StringProperty(required=True)
    lastName = ndb.StringProperty(required=True)
    dob = ndb.DateProperty(required=False)
    phoneNumber = ndb.IntegerProperty(required=True, default=1)
    zipcode = ndb.IntegerProperty(required=True, default=1)

    def get_all_users(self):
        users = User.query().fetch()
        return UserForms(items=[ref.to_form() for ref in users])

    def to_form(self, message):
        form = UserForm()
        form.firstName = self.firstName
        form.lastName = self.lastName
        form.date = self.dob.__format__('MM/DD/YY')
        form.phoneNumber = self.phoneNumber
        form.zipcode = self.zipcode
        return form


class UserForm(messages.Message):
    """Return multiple ScoreForms"""
    firstName = messages.StringField(1, required=True)
    lastName = messages.StringField(2, required=True)
    date = messages.StringField(3, required=True)
    phoneNumber = messages.StringField(4, required=True)
    zipcode = messages.StringField(5, required=True)

class UserForms(messages.Message):
    """Return multiple ScoreForms"""
    items = messages.MessageField(UserForm, 1, repeated=True)

class StringMessage(messages.Message):
    """StringMessage-- outbound (single) string message"""
    message = messages.StringField(1, required=True)
