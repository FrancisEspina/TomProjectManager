import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./getCroppedImg"; // Utility to crop the image

import Overlay from "./../Overlay";
import { useDispatch } from "react-redux";
import { updateUserState } from "../../services/store/reducers/AuthSlice.js";
import { updateProfilePic } from "../../api.js";

const UploadDialog = (props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1); // Square aspect ratio for profile picture
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null); // Store cropped area pixels

  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const onCropChange = useCallback((crop) => {
    setCrop(crop);
  }, []);

  const onZoomChange = useCallback((zoom) => {
    setZoom(zoom);
  }, []);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels); // Save the cropped area for later use
  }, []);

  const handleFileChange = (event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(selectedImage);
  };

  const handleSliderChange = (event) => {
    setZoom(event.target.value);
  };

  const handleUploadImage = async (event) => {
    event.preventDefault();
    if (!file || !croppedAreaPixels) {
      alert("Please select and crop an image before uploading.");
      return;
    }

    try {
      // Crop the image using the utility function
      const croppedImage = await getCroppedImg(preview, croppedAreaPixels);

      // Create a blob from the cropped image
      const formData = new FormData();
      formData.append("profile_picture", croppedImage);

      const response = await updateProfilePic(formData, props.user_id);
      dispatch(updateUserState(response.user));
      props.fetchUser();
      props.close();
    } catch (error) {
      console.error("Error uploading cropped image:", error);
    }
  };

  return (
    <div onClick={props.close}>
      <Overlay isVisible={props.isOpen}>
        <div className="w-full mx-5">
          <div
            onClick={(e) => e.stopPropagation()}
            className={`p-5 bg-white rounded-xl ${
              props.width ? `w-${props.width}` : "max-w-[500px] m-[auto]"
            }`}
          >
            <div>
              {preview && (
                <>
                  <div className="rounded-lg">
                    <div className="crop-container">
                      <Cropper
                        image={preview}
                        crop={crop}
                        cropShape="round"
                        zoom={zoom}
                        aspect={aspect}
                        onCropChange={onCropChange}
                        onCropComplete={onCropComplete}
                        onZoomChange={onZoomChange}
                      />
                      <div className="controls">
                        <input
                          type="range"
                          min={1}
                          max={3}
                          step={0.1}
                          value={zoom}
                          onChange={handleSliderChange}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="">
              <form onSubmit={handleUploadImage}>
                <div className="my-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <button className="w-32 bg-gray-200" onClick={props.close}>
                    Cancel
                  </button>

                  <button className="w-32" type="submit">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Overlay>
    </div>
  );
};

export default UploadDialog;
