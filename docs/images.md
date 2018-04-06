---
layout: simple
---

[Image API](https://support.wixmp.com/en/article/image-service-3835799)  


In order to edit and deliver images using Wix Media Platform, create an `Image` instance using one of the following constructors:
 
```javascript
import {Image} from 'media-platform-js-sdk';

/**
* The Image constructor accepts a FileDescriptor, FileMetadata or URL  
*/
var image = new Image(url);
var image = new Image(fileDescriptor);
var image = new Image(FileMetadata);
```
__Parameters__:
- `url` (string): url of an existing image - useful when the image file is not uploaded to the platform.
- `fileDescriptor` ([FileDescriptor][file-descriptor]): FileDescriptor of the file that was uploaded to the platform.
- `fileMetadata` (FileMetadata): FileMetadata of the file that was uploaded to the platform.

## Image Methods

__`setHost(host)`__  
Sets the url of the image's host. For example, if the image file was uploaded to Wix Media Platform, its host is the project's image host.  

```javascript
var image = new Image(fileDescriptor).setHost(host);
```
__Parameter__: `host` (string) - the url of the image's host.  
__Return value__: the updated Image.  


__`toUrl()`__  
Returns the URL of the image. For example, if the original image host is "http://test.com/file.png/" and the image was cropped, this method will return
"http://test.com/file.png/v1/crop/w_100,h_200,x_1,y_2,scl_3.0/file.png".
```javascript
var response = image.toUrl(host);

// Example of error handling:
if (response.error) {
    //TODO: handle error
} else {
    var stringUrl = response.url;
    //TODO: handle success
}

```
__Parameter__: `host` (string) - optional. If provided, the returned URL will be the image's full URL. If not provided, 
the full URL can only be provided if it was set (using the `setHost()` method or in the `Image` constructor) - otherwise the returned URL will be "/v1/crop[...]".
 Example: `"http://<image host>"`.  
  
__Return value__: {url: string|null, error: Error|null} - this dictionary contains either the URL of the Image (string)
 or an Error, allowing exception handling (see example above).


## Crop
Crops an image from the (x,y) pixel coordinates to be of size (width X height) pixels, scaled down times (scaleFactor).  

```javascript
var croppedImage = image.crop(x, y, width, height, scale);
```
__Parameters__:  
- `x` (int): The X pixel coordinate to start cropping from. Represents the top-left x axis corner point of the cropped area.
 Valid values: [0 : image width] 
- `y` (int): The Y pixel coordinate to start cropping from. Represents the top-left y axis corner point of the cropped area.
Valid values: [0 : image height]
- `width` (int): The width constraint, in pixels.
Valid values: [0 : image width]
- `height` (int): The height constraint, in pixels. Valid values: [0 : image height]
- `scale` (float): The Scale factor, as fraction of the original size. Scale cannot be 0. Valid values: (0 : 10]

__Return value__: The updated Image.

## Fill
Creates an image with the exact given width and height while retaining the original proportions. 
If the required proportions are different than the original, the image may be cropped to fit the provided 
width and height, so that only part of the original image might be visible.
```javascript
var filledImage = image.fill(width, height);
```
__Parameters__:  
- `width` (int): The width constraint, in pixels.
- `height` (int): The height constraint, in pixels

__Return value__: The updated Image.

## Fit
Adjusts the image size to fit in the given width and height while retaining the original proportions. 
All of the original image remains visible. The resulting width and height will not exceed the specified values;
 however, they may be smaller in order to best maintain the original aspect ratio.

```javascript
var fittedImage = image.fit(width, height);
```
__Parameters__:  
- `width` (int): The width constraint, in pixels. Valid values: [1 : original image width]
- `height` (int): The height constraint, in pixels. Valid values: [1 : original image height]

__Return value__: The updated Image.

## Filtering Operations

The following methods all receive `int` parameters and return the updated `Image` object:
```javascript
Image image = new Image(fileDescriptor)
                .brightness(brightness)
                .contrast(contrast)
                .hue(hue)
                .saturation(saturation)
                .blur(percentage)
                .unsharpMask(radius, amount, threshold);
```
- `brightness`: increases or reduces the level of image brightness as percentage of the original brightness. Valid values: [-100 : 100].  

- `contrast`: increases or reduces the difference between the image's lighter and darker areas,  as percentage of the original contrast. Valid values: [-100 : 100].  

- `hue`: shifts the colors of the image either clockwise or counter-clockwise around the [color wheel][color-wheel]. Valid values are [-180 : 180] degrees.  

- `saturation`: increases or reduces the color intensity of the photo, as percentage of the original saturation. Valid values: [-100 : 100].  

- `blur`: applies a blur effect to the image, as percentage of the original blurriness. Valid values: [0 : 100].  

- `unsharpMask`:  increases the image's visible sharpness by enhancing the contrast along the edges in the image.  

  __Parameters__:  
    - `radius` (float): the radius of the area to which each pixel is compared. Valid values: [0.1 : 128.0]  
      
    - `amount` (float): defines how much lighter or darker the edge border will be, as percentage of the original image (divided by 100, so that 1 represents 100%). 
    Valid values: [0 : 10.0].  
    - `threshold` (float): the minimum brightness change that will be affected by the filter and defines an edge in the image. Valid values: [0 : 255.0]  


## JPEG Encoder
This method converts the image to progressive JPEG. You can control the quality of the image to be between 1-100 percents of the original.  

```javascript
var jpegImage = image.jpeg(quality);
```
__Parameter__: `quality` (int) - as a percentage of the original image.  
__Return value__: the updated Image.
***
For more information and examples, please refer to the [Image API][image-api] documentation.


[file-descriptor]: /file-Management#filedescriptor
[image-api]: https://support.wixmp.com/en/article/image-service-3835799
[color-wheel]: https://color.adobe.com/create/color-wheel/

