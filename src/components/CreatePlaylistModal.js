import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaImage } from 'react-icons/fa';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: #282828;
  border-radius: 12px;
  padding: 24px;
  width: 100%;
  max-width: 500px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  font-size: 20px;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 24px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: white;
`;

const Input = styled.input`
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    border-color: #1DB954;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 14px;
  outline: none;
  resize: vertical;
  min-height: 80px;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    border-color: #1DB954;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const ImageUpload = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #1DB954;
    background: rgba(29, 185, 84, 0.1);
  }
`;

const ImagePreview = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
`;

const UploadText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const UploadTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: white;
`;

const UploadSubtitle = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

const Button = styled.button`
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.primary ? `
    background: #1DB954;
    color: white;
    
    &:hover {
      background: #1ed760;
      transform: translateY(-2px);
    }
  ` : `
    background: rgba(255, 255, 255, 0.1);
    color: white;
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const CreatePlaylistModal = ({ isOpen, onClose, onCreatePlaylist }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      const playlist = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        image: imagePreview || `https://picsum.photos/seed/${Date.now()}/300/300`,
        tracks: 0,
        createdBy: 'You',
        createdAt: new Date().toISOString()
      };
      
      onCreatePlaylist(playlist);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({ name: '', description: '', image: null });
    setImagePreview(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={handleClose}>
              <FaTimes />
            </CloseButton>
            
            <ModalTitle>Create New Playlist</ModalTitle>
            
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Playlist Name *</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter playlist name"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Description</Label>
                <TextArea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Add a description (optional)"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Cover Image</Label>
                <ImageUpload onClick={() => document.getElementById('image-upload').click()}>
                  {imagePreview ? (
                    <ImagePreview src={imagePreview} alt="Preview" />
                  ) : (
                    <FaImage size={24} color="rgba(255, 255, 255, 0.6)" />
                  )}
                  <UploadText>
                    <UploadTitle>Choose a photo</UploadTitle>
                    <UploadSubtitle>or drag and drop</UploadSubtitle>
                  </UploadText>
                </ImageUpload>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </FormGroup>
              
              <ButtonGroup>
                <Button type="button" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" primary disabled={!formData.name.trim()}>
                  Create Playlist
                </Button>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default CreatePlaylistModal; 