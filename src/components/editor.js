// import React, { useState } from "react";
// import { Editor } from "@jeremyling/react-material-ui-rich-text-editor";

// const initialDocument = [
//   {
//     type: "Paragraph",
//     children: [{ text: "" }],
//   },
// ];

// export default function RichTextEditor(props) {
//   const [document, setDocument] = useState(initialDocument);

//   return (
//     <Editor
//       document={document}
//       onChange={(document) => setDocument(document)}
//       onBlur={(html) => console.log(html)}
//     />
//   );
// }

// import ReactDOM from "react-dom";
// import { Editor, EditorState } from "draft-js";
// import "draft-js/dist/Draft.css";

// const MyEditor = () => {
//   const [editorState, setEditorState] = React.useState(() =>
//     EditorState.createEmpty()
//   );

//   return (
//     <Editor
//       editorState={editorState}
//       onChange={setEditorState}
//     />
//   );
// };

// export default MyEditor;

import React from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
} from "draft-js";
import { Button, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {
  FormatItalic,
  FormatBold,
  FormatUnderlined,
} from "@mui/icons-material";

class RichEditorExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) =>
      this.setState({ editorState });

    this.handleKeyCommand =
      this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand =
      this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle =
      this._toggleInlineStyle.bind(this);
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(
      editorState,
      command
    );
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  render() {
    const { editorState } = this.state;

    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState.getBlockMap().first().getType() !==
        "unstyled"
      ) {
        className += " RichEditor-hidePlaceholder";
      }
    }

    return (
      <div
        className="RichEditor-root"
        style={{
          border: "none",
          paddingTop: "0px",
          paddingLeft: "0px",
        }}
      >
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <div
          className={className}
          onClick={this.focus}
          style={{
            minHeight: "50vh",
            maxHeight: "60vh",
            overflowY: "auto",
            overflowX: "hidden",
            border: "none",
            fontSize: ".9rem",
            wordBreak: "break-all",
          }}
        >
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            onChange={this.onChange}
            // placeholder=""
            ref="editor"
            spellCheck={true}
          />
        </div>
        <Grid container >
          <Grid item>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              size="small"
              sx={{ margin: "0 2px" }}
            >
              Send
            </Button>
          </Grid>
          <Grid item flex="1"></Grid>
          <Grid item sx={{paddingTop:"4px"}} >
            <InlineStyleControls
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: "monospace",
    fontSize: 12,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }
    var label = this.props.label;
    var ICON;
    if (
      label === "Bold" ||
      label === "Italic" ||
      label === "Underline"
    ) {
      if (label === "Bold") {
        ICON = FormatBold;
      }
      if (label === "Italic") {
        ICON = FormatItalic;
      }
      if (label === "Underline") {
        ICON = FormatUnderlined;
      }
      return (
        <span
          style={{padding:"0px",margin:"1px"}}
          className={className}
          onMouseDown={this.onToggle}
        >
          <ICON />
        </span>
      );
    }
    return (
      <span
        className={className}
        onMouseDown={this.onToggle}
      >
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  // { label: "H1", style: "header-one" },
  // { label: "H2", style: "header-two" },
  //   { label: "H3", style: "header-three" },
  //   { label: "H4", style: "header-four" },
  //   { label: "H5", style: "header-five" },
  //   { label: "H6", style: "header-six" },
  //   { label: "Blockquote", style: "blockquote" },
  //   { label: "UL", style: "unordered-list-item" },
  //   { label: "OL", style: "ordered-list-item" },
  //   { label: "Code Block", style: "code-block" },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  // { label: "Monospace", style: "CODE" },
];

const InlineStyleControls = (props) => {
  const currentStyle =
    props.editorState.getCurrentInlineStyle();

  return (
    <div
      className="RichEditor-controls"
    >
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default RichEditorExample;
