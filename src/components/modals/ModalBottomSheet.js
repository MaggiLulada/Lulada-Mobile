import React, { useState, useMemo, useRef, useCallback } from 'react'
import BottomSheet, { BottomSheetBackdrop, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Platform, useWindowDimensions } from 'react-native';

const ModalBottomSheet = ({visible, size, backgroundModal, children, backDrop, onClose}) => {

  const window = useWindowDimensions()
  const refModal = useRef(null);

  const handleSnapOpen = useCallback(() => {
    refModal.current?.snapToIndex(1);
  }, []);

  const handleSnapClose = useCallback(() => {
    refModal.current?.close();
  }, [])

  const sizeModal = (size) => {
    switch (size) {
      case 'small':
        return useMemo(() => Platform.OS === 'ios' ? [ '1%', window.height/6.5]: ['1%', window.height/5.5], [] );
      case 'smallXl':
        return useMemo(() => Platform.OS === 'ios' ? [ '1%', window.height/5]: ['1%', window.height/4.5], [] );
      case 'medium':
        return useMemo(() => Platform.OS === 'ios' ? [ '1%', '55%']: ['1%', '60%'], [] );
      case 'mediumXl':
        return useMemo(() => Platform.OS === 'ios' ? [ '1%', '70%']: ['1%', '75%'], [] );
      case 'large':
        return useMemo(() => Platform.OS === 'ios' ? [ '1%', '88%']: ['1%', '89%'], [] )
    }
  }


  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop {...props}/>
    ),[]
  );

  if (visible === true) {
    handleSnapOpen();
  } else {
    handleSnapClose();
  }


  return (

    <BottomSheet
      ref={refModal}
      snapPoints={sizeModal(size)}
      backgroundStyle={{backgroundColor: backgroundModal}}
      style={{
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
      }}
      enablePanDownToClose
      backdropComponent={backDrop === true ? renderBackdrop : null }
      onChange={(index) => {
        if(index === 0){
          onClose()
          console.log('close' + index)
        }
        console.log('change' + index)
      }}
    >
      
      {children}
      
    </BottomSheet>
  )
}

export default ModalBottomSheet