/**********************************************************************************

Copyright (C) 2011 by Mozilla Foundation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

**********************************************************************************/

(function ( window, document, undefined ) {

  var modules = {};

  /****************************************************************************
   * Track
   ****************************************************************************/
  var numTracks = 0;
  var Track = function ( options ) {
    var trackEvents = [],
        id = numTracks++,
        that = this;

    options = options || {};
    this.name = options.name || 'Track' + Date.now();

    this.getId = function () {
      return id;
    };

    this.getTrackEvent = function ( trackId ) {
      for ( var i=0, l=trackEvents.length; i<l; ++i) {
        if ( trackEvents[i].id === trackId || trackEvents[i].name === trackId ) {
          return trackEvents[i];
        } //if
      } //for
    }; //getTrackEvent

    this.getTrackEvents = function () {
      return trackEvents;
    }; //getTrackEvents

    this.removeTrackEvent = function ( trackEvent ) {
      if ( typeof(trackEvent) === "string" ) {
        trackEvent = that.getTrackEvent( trackEvent );
      } //if

      var idx = trackEvents.indexOf( trackEvent );

      if ( idx > -1 ) {
        trackEvents.splice( idx, 1 );
      } //if
    }; //removeTrackEvent

    this.addTrackEvent = function ( trackEvent ) {
      trackEvents.push( trackEvent );
    }; //addTrackEvent
  };

  /****************************************************************************
   * TrackEvent
   ****************************************************************************/
  var numTrackEvents = 0;
  var TrackEvent = function ( options ) {
    var id = numTrackEvents++;

    options = options || {};
    this.name = options.name || 'Track' + Date.now();

    this.getId = function () {
      return id;
    };
  };

  /****************************************************************************
   * Butter
   ****************************************************************************/
  var numButters = 0;
  var Butter = function ( options ) {

    var events = {},
        tracksByName = {},
        tracks = [],
        targets = {},
        that = this;

    this.id = "Butter" + numButters++;

    //trigger - Triggers an event indicating a change of state in the core
    this.trigger = function ( name, options ) {
      if ( events[ name ] ) {
        for (var i=0, l=events[ name ].length; i<l; ++i) {
          events[ name ][ i ].call( that, options );
        } //for
      } //if
    }; //trigger

    //listen - Listen for events triggered by the core
    this.listen = function ( name, handler ) {
      if ( !events[ name ] ) {
        events[ name ] = [];
      } //if
      events[ name ].push( handler );
    }; //listen

    //unlisten - Stops listen for events triggered by the core
    this.unlisten = function ( name, handler ) {
      var handlerList = events[ name ];
      if ( handlerList ) {
        if ( handler ) {
          var idx = handlerList.indexOf( handler );
          handlerList.splice( idx, 1 );
        }
        else {
          events[ name ] = [];
        } //if
      } //if
    }; //unlisten

    //addTrackEvent - Creates a new Track Event
    this.addTrackEvent = function ( track, trackEvent ) {
      if ( typeof(track) === "string" ) {
        track = that.getTrack( track );
      } //if
      if ( !(options instanceof TrackEvent) ) {
        trackEvent = new TrackEvent( trackEvent );
      } //if
      track.addTrackEvent( trackEvent );
    }; //addTrackEvents

    //getTrackEvents - Get a list of Track Events
    this.getTrackEvents = function () {
      var trackEvents = {};
      for ( var i=0, l=tracks.length; i<l; ++i ) {
        var track = tracks[i];
        trackEvents[track.name] = track.getTrackEvents();
      } //for
    }; //getTrackEvents

    this.getTrackEvent = function ( track, trackEventId ) {
      if ( typeof(track) === "string" ) {
        track = that.getTrack( track );
      } //if
      track.getTrackEvent( trackEventId );
    }; //getTrackEvent

    //addTrack - Creates a new Track
    this.addTrack = function ( track ) {
      if ( !(options instanceof Track) ) {
        track = new Track( track );
      } //if
      tracksByName[ track.name ] = track;
      tracks.push( track );
    }; //addTrack

    //getTracks - Get a list of Tracks
    this.getTracks = function () {
      return tracks;
    }; //getTracks

    //getTrack - Get a Track by its id
    this.getTrack = function ( name ) {
      var track = tracksByName[ name ];
      if ( track ) {
         return track;
      } //if

      for ( var i=0, l=tracks.length; i<l; ++i ) {
        if ( tracks[i].id === name ) {
          return tracks[i];
        } //if
      } //for

      return undefined;
    }; //getTrack

    //removeTrackEvent - Remove a Track Event
    this.removeTrackEvent = function ( track, trackEvent ) {
      if ( !(options instanceof Track) ) {
        track = that.getTrack( track );
      } //if
      track.removeTrack( trackEvent );
    };

    //removeTrack - Remove a Track
    this.removeTrack = function ( track ) {
      if ( typeof(track) === "string" ) {
        track = that.getTrack( track );
      } //if
      var idx = tracks.indexOf( track );
      if ( idx > -1 ) {
        tracks.splice( idx, 1 );
        delete tracksByName[ track.name ];
      } //if
      return track;
    };

    //import - Import project data
    this.importProject = function () {
    };

    //export - Export project data
    this.exportProject = function () {
    };

    //play - Play the media
    this.play = function () {
    };

    //pause - Pause the media
    this.pause = function () {
    };

    //currentTime - Gets and Sets the media's current time.
    this.currentTime = function () {
    };

    //addTarget - add a target object
    this.addTarget = function () {
    };

    //removeTarget - remove a target object
    this.removeTarget = function () {
    };

    //editTarget - edits a targets data object
    this.editTarget = function () {
    };

    //getTargets - get a list of targets objects
    this.getTargets = function () {
    };

    //getTarget - get a target object by its id
    this.getTarget = function () {
    };

    //setProjectDetails - set the details of the project
    this.setProjectDetails = function () {
    };

    //getProjectDetails - get the projects details
    this.getProjectDetails = function () {
    };

    //getMedia - get the media's information
    this.getMedia = function () {
    };

    //setMedia - set the media's information
    this.setMedia = function () {
    };

    //setSelectedTarget - set a track's target
    this.setSelectedTarget = function () {
    };

    //getSelectedTarget - get a track's target
    this.getSelectedTarget = function () {
    };

    for ( var moduleName in modules ) {
      modules[moduleName].setup && modules[moduleName].setup.call(this);
    } //for

  };

  Butter.getScriptLocation = function () {
    var scripts = document.querySelectorAll( "script" );
    for (var i=0; i<scripts.length; ++i) {
      var pos = scripts[i].src.lastIndexOf('butter.js');
      if ( pos > -1 ) {
        return scripts[i].src.substr(0, pos) + "/";
      } //if
    } //for
  };

  //registerModule - Registers a Module into the Butter core
  Butter.registerModule = Butter.prototype.registerModule = function ( name, module ) {
    modules[ name ] = module;
    if ( module.extend ) {
      Butter.extendAPI( module.extend );
    } //if
  };

  Butter.extendAPI = function ( functions ) {
    for ( var fn in functions ) {
      if ( functions.hasOwnProperty( fn ) ) {
        Butter.prototype[ fn ] = functions[ fn ];
      } //if
    } //for
  };

  Butter.Track = Track;
  Butter.TrackEvent = TrackEvent;

  window.Butter = Butter;

})( window, document, undefined );