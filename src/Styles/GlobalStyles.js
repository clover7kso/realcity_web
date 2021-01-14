import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    ${reset};
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700');
    * {
        box-sizing:border-box;
    }
    body {
        background-color:${(props) => props.theme.bgColor};
        color:${(props) => props.theme.blackColor};
        font-size:14px;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    a {
        color:${(props) => props.theme.blueColor};
        text-decoration:none;
    }
    input:focus{
        outline: none !important;
    }
    
    .ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-rounded-corners.ck-focused{
        border: 0px solid transparent;
        box-shadow: 0 0 5px var(--ck-color-focus-border);
    }
    .ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-rounded-corners{
        border: 0px solid transparent;
        box-shadow: 0 0 0px;
        padding:0px
    }
    & .ck-editor__top .ck-sticky-panel .ck-toolbar {
		/* https://github.com/ckeditor/ckeditor5-editor-classic/issues/62 */
		z-index: var(--ck-z-modal);
		border: 0px solid transparent;
    }
    .fade-enter {
        opacity: 0;
    }
    .fade-enter-active {
        opacity: 1;
        transition: opacity 300ms ease-in;
    }
    .fade-exit {
        opacity: 1;
    }
    .fade-exit-active {
        opacity: 0;
        transition: opacity 300ms ease-in;
    }
      
`;
