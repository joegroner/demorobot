/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-template-curly-in-string */

import SearchAndReplace from './SearchAndReplace'
import Protect from './Protect'
import Style from './Style'
import Hide from './Hide'
// import Group from './Group'
import ReplaceImage from './ReplaceImage'
import RecolorImage from './RecolorImage'
import ReplaceNeighbor from './ReplaceNeighbor'
import InsertHTML from './InsertHTML'
import OverwriteHTML from './OverwriteHTML'
import InterceptWebRequest from './InterceptWebRequest'
import Eval from './Eval'
import Stage from './Stage'
// import UndoElement from './UndoElement'
import QuerySelector from './QuerySelector'
import If from './If'
import AddScript from './AddScript'
import ReplaceAjaxResponse from './ReplaceAjaxResponse'
import PatchAjaxResponse from './PatchAjaxResponse'
// import extractParameters from '../helpers/extractParameters'

export default [
  {
    name: 'addScript',
    signature: '(${1}) = ${3}',
    aliases: [],
    command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
      return new AddScript(parameters, value)
    }
  },
  {
    name: 'replaceAjaxResponse',
    aliases: ['replaceAjax', 'replaceResponse'],
    signature: '(${1}, ${2}) = ${3}',
    command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
      return new ReplaceAjaxResponse(parameters[0], parameters[1], value)
    }
  },
  {
    name: 'patchAjaxResponse',
    aliases: ['patchAjax', 'patchResponse'],
    signature: '(${1}) = ${3}',
    command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
      return new PatchAjaxResponse(parameters[0], value)
    }
  },
  {
    name: 'if',
    aliases: [],
    signature: '(${1}, ${2}, ${3}) = ${4}',
    command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
      const locationFilter = parameters.shift()
      const cssFilter = parameters.shift()
      return new If(locationFilter, cssFilter, cmdBuilder.build(parameters.join(','), value), location)
    }
  },
  {
    name: 'ifLocation',
    aliases: [],
    signature: '(${1}, ${2}) = ${3}',
    command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
      const locationFilter = parameters.shift()
      return new If(locationFilter, '', cmdBuilder.build(parameters.join(','), value), location)
    }
  },
  {
    name: 'ifSelector',
    aliases: ['ifQuery', 'ifCss'],
    signature: '(${1}, ${2}) = ${3}',
    command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
      const cssFilter = parameters.shift()
      return new If('', cssFilter, cmdBuilder.build(parameters.join(','), value), location)
    }
  },
  {
    name: 'replace',
    aliases: [],
    signature: '(${1}, ${2}, ${3}, ${4}) = ${5}',
    command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
      return new SearchAndReplace(parameters[0], value, parameters[1], parameters[2], parameters[3], location)
    }
  },
  {
    name: 'replaceAttribute',
    aliases: [],
    signature: '(${1}, ${2}, ${3}, ${4}) = ${5}',
    command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
      return new SearchAndReplace(parameters[0], value, parameters[2], parameters[3], parameters[1], location)
    }
  },
  {
    name: 'protect',
    aliases: [],
    signature: '(${1})',
    command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
      return new Protect(parameters[0], parameters[1], parameters[2], location)
    }
  },
  {
    name: 'replaceNeighbor',
    aliases: [],
    signature: '(${1}, ${2}, ${3}, ${4}) = ${5}',
    command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
      return new ReplaceNeighbor(parameters[0], value, parameters[1], parameters[2], parameters[3], parameters[4], location)
    }
  },
  {
    name: 'insertBefore',
    aliases: [],
    signature: '(${1}, ${2}, ${3}) = ${4}',
    command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
      return new InsertHTML('afterbegin', parameters[0], value, parameters[1], parameters[2], location)
    }
  },
  {
    name: 'insertAfter',
    aliases: [],
    signature: '(${1}, ${2}, ${3}) = ${4}',
    command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
      return new InsertHTML('beforeend', parameters[0], value, parameters[1], parameters[2], location)
    }
  },
  {
    name: 'style',
    aliases: [],
    signature: '(${1}, ${2}, ${3}) = ${4}',
    command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
      return new Style(parameters[0], parameters[1], parameters[2], value)
    }
  },
  {
    name: 'querySelector',
    aliases: ['query'],
    signature: '(${1}, ${2}) = ${3}',
    command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
      return new QuerySelector(parameters[0], parameters[1], value)
    }
  },
  {
    name: 'hide',
    aliases: [],
    signature: '(${1}, ${2}, ${3}, ${4})',
    command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
      return new Hide(parameters[0], parameters[1], parameters[2], parameters[3], parameters[4], location)
    }
  },
  {
    name: 'replaceImage',
    aliases: [],
    signature: '(${1}) = ${2}',
    command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
      return new ReplaceImage(value, parameters)
    }
  },
  {
    name: 'recolorImage',
    aliases: ['recolourImage'],
    signature: '(${1}) = ${2}',
    command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
      return new RecolorImage(parameters[0], value)
    }
  },
  {
    name: 'replaceLink',
    aliases: [],
    signature: '(${1}) = ${2}',
    deprecated: true,
    command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
      return new QuerySelector(`a[href="${parameters[0]}"]`, 'href', value)
    }
  },
  {
    name: 'blockUrl',
    aliases: [],
    signature: '(${1})',
    command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
      return new InterceptWebRequest(parameters[0], value, 'block', parameters[1], includeRules, excludeRules)
    }
  },
  {
    name: 'delayUrl',
    aliases: [],
    signature: '(${1}) = ${2}',
    command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
      return new InterceptWebRequest(parameters[0], value, 'delay', parameters[1], includeRules, excludeRules)
    }
  },
  {
    name: 'replaceUrl',
    aliases: ['redirectUrl'],
    signature: '(${1}) = ${2}',
    command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
      return new InterceptWebRequest(parameters[0], value, 'replace', parameters[1], includeRules, excludeRules)
    }
  },
  {
    name: 'overwriteHTML',
    aliases: ['overwrite'],
    signature: '(${1}, ${2}) = ${3}',
    command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
      return new OverwriteHTML(parameters[0], parameters[1], value, location)
    }
  },
  {
    name: 'overwritePage',
    aliases: [],
    signature: '(${1}, ${2}) = ${3}',
    command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
      const iframeCode = '<head><title>' + parameters[1] + '</title><style>html {height:100%;}</style></head><body style="margin:0;padding:0;width:100%;height:100%;overflow:hidden;"><iframe src="' + value + '" style="width:100%;height:100%"></body>'
      return new OverwriteHTML(parameters[0], '', iframeCode, location)
    }
  },
  {
    name: 'eval',
    aliases: [],
    signature: '(${1}) = ${2}',
    command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
      return new Eval(parameters.shift(), parameters, value)
    }
  },
  {
    name: 'stage',
    aliases: [],
    signature: '(${1}) = ${2}',
    command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
      return new Stage(parameters[0], parameters[1], value)
    }
  },
  {
    name: 'turbonomic',
    registry: [{
      name: 'hideListItem',
      signature: '(${1})',
      command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
        return new Hide(parameters[0], 17, 'list-group-item', '', '', location)
      }
    }]
  },
  {
    name: 'segment',
    registry: [{
      name: 'analyticsLoad',
      signature: '(${1})',
      command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
        const script = `  !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="YOUR_WRITE_KEY";analytics.SNIPPET_VERSION="4.13.2";
        analytics.load(${value});
        analytics.page();
        }}();`
        return new AddScript([], script)
      }
    },
    {
      name: 'analyticsIdentify',
      signature: '(${1}, ${2}, ${3})',
      command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
        const script = `analytics.identify('${parameters[0]}', {
          name: '${parameters[1]}',
          email: '${parameters[2]}'
        });`
        return new AddScript([], script)
      }
    },
    {
      name: 'analyticsTrack',
      signature: '(${1}) = ${2}',
      command: function (value, parameters, location, includeRules, excludeRules, cmdBuilder) {
        const script = `analytics.identify('${parameters[0]}', ${JSON.stringify(value)});`
        return new AddScript([], script)
      }
    }]
  }
]
