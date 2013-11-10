DEBUG = True 
TEMPLATE_DEBUG = DEBUG 

DATABASES['default'] = {
    'ENGINE': 'django.db.backends.postgresql_psycopg2', # add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
    'NAME': 'smilecounter',                      # or path to database file if using sqlite3.
    # the following settings are not used with sqlite3:
    'USER': 'django_login',
    'PASSWORD': 'password',
    'HOST': 'localhost',                      # empty for localhost through domain sockets or '127.0.0.1' for localhost through tcp.
    'PORT': '',                      # set to empty string for default.
}
