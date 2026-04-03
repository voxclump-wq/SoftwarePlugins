mergeInto(LibraryManager.library, {

    /**
     * Send events from Unity back to your website
     * Call from C# using [DllImport("__Internal")]
     */
    NotifyWebsiteEvent: function(eventTypePtr, detailsPtr) {
        var eventType = UTF8ToString(eventTypePtr);
        var details = UTF8ToString(detailsPtr);

        if (window.AGICharacterService && typeof window.AGICharacterService.onUnityEvent === 'function') {
            window.AGICharacterService.onUnityEvent(eventType, details);
        } else {
            console.log("[AGI Service] Event from Unity:", eventType, details);
        }
    }
});