(function(a){var b=function(a){if(window.console){console.debug(a)}};a.ajaxPrefilter(function(c,d,e){if(c.cacheJStorage===undefined||!c.cacheJStorage)return;var f;if(c.cacheKey)f=c.cacheKey;else f=c.url+c.type+c.data;if(c.isCacheValid&&!c.isCacheValid())a.jStorage.deleteKey(f);if(a.jStorage.get(f)){var g=a.extend(true,{},a.jStorage.get(f));if(c.success)c.success(g);e.abort()}else{var h=c.success,i=c.cacheTTL||0;c.success=function(d){a.jStorage.set(f,d);if(a.jStorage.setTTL){a.jStorage.setTTL(f,i*1e3)}else b("Your jStorage version doesn't support TTL on key, please update jStorage ( http://www.jstorage.info/ )");var e=a.extend(true,{},d);if(h)h(e);c.success=h}}})})(jQuery)