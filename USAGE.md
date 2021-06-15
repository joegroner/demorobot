# DemoRobot - Usage

Read on to learn how you can use DemoRobot, to tamper your web application to demo almost anything.

## Configurations

DemoRobot is driven by configuration files you write in the integrated editor. You provide lists of search and replace patterns, that will be applied once DemoRobot is running. The structure of the file is similar to an **ini** file:

```
search = replace
```

Like ini files the format provides sections and comments to structure your document:

```
; Replace all the cities and countries in our webapp
[Cities]
San Francisco = Berlin
Paris = Rome
[Countries]
USA = Germany
France = Italy
```

Additionally you can use options, commands, imports and variables to achieve even more:

```
; The configuration only works if the url matches the following regex:
@include[] = /^https?://.*demo.*\.myapp\.com(:[0-9]+)?/.*$/
; You can use $customer in replacements as variable
$customer = My Customer//Set The customer className
; Import another configuration called "Cities"
+Cities
; Replace Order with Flight case insensitive
!/Order/i = Flight
```

Note, that **include** or **exclude** is an option that is required for every configuration you create.

Below you will find a list of available options and commands.

## Options

You can use the following options:

- **@include = regex**: The configuration is only available if the url matches the given regex.
- **@exclude** = regex: The configuration doesn't work if the url matches the given regex.
- **@blacklist = tag**: The configuration ignores the given tag.
- **@whitelist = tag**: The configuration includes the given tag (`script` and `style` are blacklisted by default).
- **@namespace = ns**: Load commands from a given namespace. Read below to learn more about namespaces
- **@template**: The configuration is only used as template, so no include/exclude is required.
- **@deprecated**: The configuration is deprecated and will not be available.
- **@textAttributes**: The given attributes are treated as text. The default is the `placeholder` attribute.
- **@author = name <email>**: A reserved keyword, you can use to add your name as author to a given configuration.

If you want to use a option multiple time you need to provide it in array notation:

```
@blacklist[] = input
@blacklist[] = textarea
```

## Commands

Outside of namespaces you can always use the following commands:

- **!replace(word, locationFilter, cssFilter, attribute)** = replacement: Replace the given word with the replacement if the locationFilter and the cssFilter matches. By setting the attribute, instead of the text itself an attribute of the parent DOM element is replaced (e.g. `src`)
- **!replaceAttribute(word, attribute, locationFilter, cssFilter)** = replacement: An alias for the replace command, that takes the attribute as second parameter. Use this if locationFilter and cssFilter are not required.
- **!/search/modifier = replacement**: Provide a regular expression to run your replacements.
- **!protect(word)**: Make sure that the given word is not affected by any replacement.
- **!style(word, property) = replacement**: Change the css property of a node containing word
- **!hide(word, nthParent, cssFilter, hrefFilter, hashFilter)**: Hide a text field and its nth parent elements. You can apply multiple filters.
- **!replaceImage(src) = replacement**: Replace the src attribute of an img tag
- **!overwriteHTML(locationFilter, cssSelector) = replacement**: Overwrite the inner HTML of the first element matching the cssSelector. If no selector is provided the main html can be overwritten. You can filter the application by location (href, hash)
- **!overwritePage(locationFilter, pageTitle) = url**: Overwrite the whole page with a fullscreen iframe that shows url.
- **!delayUrl(url) = seconds**: Delay a url by the given number of seconds
- **!blockUrl(url)**: Block access to url
- **!redirectUrl(url) = otherurl**: Redirect url to otherurl
- **!replaceNeighbor(word, nthParent, cssSelector, locationFilter) = replacement**: Search for word, walk up the DOM tree to the nth parent and apply a css selector to find a child where the replacement is applied. This is especially useful to replace labels "close by" a text
- **!insertBefore(search, nthParent, locationFilter) = html**: Inject HTML before the search word. Use the nthParent parameter to walk up the DOM tree.
- **!insertAfter(search, nthParent, locationFilter) = html**: Inject HTML after the search word. Use the nthParent parameter to walk up the DOM tree.

## Namespaces

Removed by Joe Groner to make more vendor neutral.


## Variables

To make a configuration much more reusable you can introduce variables with a default value and a description:

```
$variable = default//description
```

This is especially useful if you want to have an interchangeable company or domain name.

Variables are also helpful if you'd like use HTML in your replacements, especially for **!overwriteHTML**.
