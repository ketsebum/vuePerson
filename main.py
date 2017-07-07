#!/usr/bin/env python

"""main.py - This file contains handlers that are called by taskqueue and/or
cronjobs."""

import webapp2
from webapp2_extras import auth
from webapp2_extras import sessions

from models import User, Game, Leaderboard
webapp2_config = {}
webapp2_config = {
  'webapp2_extras.auth': {
    'user_model': 'models.User',
    'user_attributes': ['name', 'verified']
  },
  'webapp2_extras.sessions': {
    'secret_key': 'Im_an_alien'
  }
}
CLIENT_ID = '1066114691418-nm0p4krul7jenj0vck20glcrh23nm1lm.apps.googleusercontent.com'

class BaseHandler(webapp2.RequestHandler):
    """
         BaseHandler for all requests

         Holds the auth and session properties so they are reachable for all requests
     """

    def dispatch(self):
        """
              Save the sessions for preservation across requests
          """
        try:
            response = super(BaseHandler, self).dispatch()
            self.response.write(response)
        finally:
            self.session_store.save_sessions(self.response)

    @webapp2.cached_property
    def auth(self):
        """Shortcut to access the auth instance as a property."""
        return auth.get_auth()

    @webapp2.cached_property
    def session_store(self):
        return sessions.get_store(request=self.request)

    @webapp2.cached_property
    def session(self):
        """Shortcut to access the current session."""
        # Returns a session using the default cookie key.
        return self.session_store.get_session()

    @webapp2.cached_property
    def user_model(self):
        """Returns the implementation of the user model.
        It is consistent with config['webapp2_extras.auth']['user_model'], if set.
        """
        return self.auth.store.user_model

    @webapp2.cached_property
    def user_info(self):
        """Shortcut to access a subset of the user attributes that are stored
        in the session.
        The list of attributes to store in the session is specified in
          config['webapp2_extras.auth']['user_attributes'].
        :returns
          A dictionary with most user information
        """
        return self.auth.get_user_by_session()




class MainEntry(BaseHandler):
    def get(self):
        test_value = self.session.get('currentuser')
        if test_value:
            self.response.write('Session has this value: %r.' % test_value)
        else:
            self.redirect_to('login')
            self.response.write('Session is empty.')

app = webapp2.WSGIApplication([
    ('/', MainEntry),
], debug=True, config=webapp2_config)
