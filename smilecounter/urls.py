from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
     url(r'^$', 'smilecounter.views.home', name='home'),
     url(r'^faq/', 'smilecounter.views.faq', name='faq'),
    # url(r'^newredirect', 'smilecounter.views.addRedirect', name='home'),
    # url(r'^smilecounter/', include('smilecounter.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
