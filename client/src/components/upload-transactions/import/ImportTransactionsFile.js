import React from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#eeeeee';
};

const DropzoneContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  text-align: center;
`;

const ImportTransactionsFile = ({ readUploadedFiles }) => {
  return (
    <Dropzone
      acceptedFiles="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      onDrop={(acceptedFiles) => readUploadedFiles(acceptedFiles)}
    >
      {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => (
        <div className="col-md-6 mt-4">
          <DropzoneContainer {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop or click to select transaction files</p>
          </DropzoneContainer>
        </div>
      )}
    </Dropzone>
  );
};

export default ImportTransactionsFile;
