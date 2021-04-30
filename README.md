# VAGU Cinema player :cinema:
## ver. build 3004.21
```
VAGU Cinema player provides a simple responsive video player
for desktop and mobile devices that can be easily integrated into your solution.
```
## Release notes:
1. Providing playback of any video;
2. Convenient embedding through one tag into any solution (framework, native application);
3. Mobile responsiveness;
4. Ability to change video quality.

## Missing functionality:
1. The main functionality in build 3004.21 focuses on desktop solutions, therefore some mobile familiar functions are missing;
2. There is no function to change the speed of video playback;
3. There is no possibility to embed subtitles;
4. There is no possibility to rewind video by double-clicking on screen areas on mobile devices;
5. The video player does not have the ability to display a slider for serials (perhaps you were looking for a player to implement functionality for serials, at the moment our solution does not provide such an opportunity).

## Installation
The video player is a separate html page that is embedded in your solution using the `<Iframe>` tag.
```
1. Clone or download zip archive from this repository;
2. Copy the contents of the project to a place convenient for you in the project;
3. In index.html file find <source src="./src/video/test1.mp4" type="video/mp4"> and change the corresponding fields to default video and video type;
4. If you plan to change the video quality, go to the config.js file and follow the instructions in the comments;
5. The file test.html provides an example of implementation into your solution.
```
## Config.js
```
/**
 * Key - the value of the element during processing
   The first element of the array is a visual description of the option on the screen
   The second parameter of the array is the path to the desired file
   e.g here:
 */
const qualityOptions = {
    "1080p": ["1080", "./src/video/test1.mp4"],
    "480p": ["480", "./src/video/test2.mp4"]
}
```
## Example
<img src="public/videoeg.PNG"> <img src="public/videoeg-1.PNG">
