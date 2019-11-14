import React from 'react'
import PropTypes from 'prop-types'
import AceEditor from 'react-ace'

import autocomplete from './ace/autocomplete.js'

import 'brace/ext/language_tools'
import 'brace/ext/searchbox'
import 'brace/theme/xcode'

import vim from './ace/vim'
import './ace/mnky'

class CodeEditor extends React.Component {
  constructor(props) {
    super(props)
    this.bound = false
    vim(() => {
      props.onVimWrite()
    })
    autocomplete(props.getRepository)
  }

  static propTypes = {
    value: PropTypes.string.isRequired,
    getRepository: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onAutoSave: PropTypes.func.isRequired,
    onVimWrite: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    editorAutocomplete: PropTypes.bool.isRequired,
    annotations: PropTypes.func.isRequired,
    keyboardHandler: PropTypes.string
  }

  handleChange(content, event) {
    if (event) {
      event.preventDefault()
    }
    this.props.onChange(content)
    // annotations={annotations} on the AceEditor
    // does not work properly (probably due my misunderstanding of react;) )
    // the following works and also adds some soft delay on the annotation update
    setTimeout(() => this._updateAnnotations(), 150)
  }

  _updateAnnotations() {
    if (this.editor) {
      this.editor.session.setAnnotations(this.props.annotations(this.editor.getValue()))
    }
  }

  render() {
    return <div className="editor-box"><AceEditor
      value={this.props.value}
      onChange={(content) => this.handleChange(content)}
      onLoad={(editor) => {
        this.editor = editor
        window.editor = editor
        console.log(editor)
        this._updateAnnotations()
      }}
      width="100%"
      height="calc(100% - 40px)"
      theme="xcode"
      mode="mnky"
      readOnly = {this.props.readOnly === true}
      className = {this.props.readOnly === true ? 'disabled' : ''}
      enableBasicAutocompletion={true}
      enableLiveAutocompletion={this.props.editorAutocomplete}
      enableSnippets={false}
      keyboardHandler={this.props.keyboardHandler}
      editorProps={{$blockScrolling: 'Infinity'}}
      name="contentarea"
      commands={[
        {
          name: 'Toggle Comment',
          bindKey: {win: 'Ctrl-Shift-7', mac: 'Cmd-Shift-7'},
          exec: 'togglecomment'
        },
        {
          name: 'Save On Enter',
          bindKey: {win: 'Enter', mac: 'Enter'},
          exec: (editor) => {
            editor.insert('\n')
            this.props.onAutoSave(event)
          }
        }
      ]}
    />
    </div>
  }
}
export default CodeEditor
