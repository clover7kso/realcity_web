import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor.js";
import ImgurUploaderInit from "ckeditor5-imgur-uploader";

import installedPlugins from "../Components/CKEditorPlugin";

export default () => {
  const ImgurUploader = ImgurUploaderInit({ clientID: "818d43b4be21dd8" });

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        config={{
          extraPlugins: [ImgurUploader],
          plugins: [...installedPlugins],
          toolbar: [
            "fontFamily",
            "fontSize",
            "fontColor",
            "alignment",
            "|",
            "strikethrough",
            "underline",
            "horizontalLine",
            "|",
            "indent",
            "outdent",
            "|",
            "link",
            "blockQuote",
            "imageUpload",
            "insertTable",
            "mediaEmbed",
            "|",
            "undo",
            "redo",
          ],
        }}
      />
    </div>
  );
};
