# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'SmileRedirect'
        db.create_table(u'smilecounter_smileredirect', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('time', self.gf('django.db.models.fields.DateTimeField')()),
        ))
        db.send_create_signal(u'smilecounter', ['SmileRedirect'])


    def backwards(self, orm):
        # Deleting model 'SmileRedirect'
        db.delete_table(u'smilecounter_smileredirect')


    models = {
        u'smilecounter.smileredirect': {
            'Meta': {'object_name': 'SmileRedirect'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'time': ('django.db.models.fields.DateTimeField', [], {})
        }
    }

    complete_apps = ['smilecounter']