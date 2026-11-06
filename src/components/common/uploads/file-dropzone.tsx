'use client'

import { Box, Field, Icon, Text, VStack } from '@chakra-ui/react'
import { LuFilm, LuUpload } from 'react-icons/lu'
import { PALETTES } from '@/constants/common/theme.constants'
import { useFileDropzone } from '@/hooks/common/use-file-dropzone'
import type { FileDropzoneProps } from '@/interfaces/components/common/uploads/file-dropzone-props.interface'

export function FileDropzone(props: FileDropzoneProps) {
  const { file, onFileChange, accept, maxSizeBytes, idleLabel, activeLabel, hint, error, isDisabled } = props
  const { getRootProps, getInputProps, isDragActive, rejection } = useFileDropzone({
    accept,
    maxSizeBytes,
    isDisabled,
    onFileChange
  })
  const message = error ?? rejection ?? undefined

  return (
    <Field.Root invalid={Boolean(message)}>
      <Box
        {...getRootProps()}
        w="full"
        p="8"
        borderWidth="2px"
        borderStyle="dashed"
        borderRadius="xl"
        colorPalette={PALETTES.BRAND}
        borderColor={isDragActive ? 'colorPalette.solid' : message ? 'border.error' : 'border'}
        bg={isDragActive ? 'colorPalette.subtle' : 'bg.subtle'}
        cursor={isDisabled ? 'not-allowed' : 'pointer'}
        textAlign="center"
        transition="background 0.2s"
      >
        <input {...getInputProps()} />
        <VStack gap="2">
          <Icon size="2xl" color="colorPalette.fg">
            {file ? <LuFilm /> : <LuUpload />}
          </Icon>
          <Text fontWeight="medium">{file ? file.name : isDragActive ? activeLabel : idleLabel}</Text>
          <Text fontSize="sm" color="fg.muted">
            {hint}
          </Text>
        </VStack>
      </Box>
      <Field.ErrorText>{message}</Field.ErrorText>
    </Field.Root>
  )
}
