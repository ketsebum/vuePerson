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
    zipCode = ndb.IntegerProperty(required=True, default=1)

    def get_all_users(self):
        users = User.query().fetch()
        return UserForms(items=[ref.to_form() for ref in users])

    def to_form(self):
        form = UserForm()
        form.firstName = self.firstName
        form.lastName = self.lastName
        form.dob = self.dob.strftime('%m/%d/%Y')
        form.phoneNumber = self.phoneNumber
        form.zipCode = self.zipCode
        form.id = self.key.id()
        return form

    def delete(self):
        self.key.delete()


class UserForm(messages.Message):
    """Return UserForm"""
    firstName = messages.StringField(1, required=True)
    lastName = messages.StringField(2, required=True)
    dob = messages.StringField(3, required=True)
    phoneNumber = messages.IntegerField(4, required=True)
    zipCode = messages.IntegerField(5, required=True)
    id = messages.IntegerField(6, required=False)


class UserForms(messages.Message):
    """Return multiple UserForms"""
    items = messages.MessageField(UserForm, 1, repeated=True)


class StringMessage(messages.Message):
    """StringMessage-- outbound (single) string message"""
    message = messages.StringField(1, required=True)
