'use client'

import { Box, Icon, Stack, Text } from '@chakra-ui/react'
import { LuCloudUpload, LuPaperclip } from 'react-icons/lu'
import { MEDIA_MESSAGES } from '@/constants/media/media/media-messages.constants'
import type { MultiFileDropzoneProps } from '@/interfaces/components/common/uploads/multi-file-dropzone-props.interface'
import { useMultiFileDropzone } from '@/hooks/common/use-multi-file-dropzone'
import { MotionBox } from '../motion/motion-box'

/** Drop area for several files; it lifts and glows while files are dragged over it. */
export function MultiFileDropzone(props: MultiFileDropzoneProps) {
  const { hint, isCompact = false, isDisabled } = props
  const { getRootProps, getInputProps, isDragActive, rejection } = useMultiFileDropzone(props)

  if (isCompact) {
    return (
      <Box {...getRootProps()} as="button" aria-label={MEDIA_MESSAGES.DROP_IDLE} p="2" rounded="full" _hover={{ bg: 'bg.muted' }} cursor="pointer">
        <input {...getInputProps()} />
        <Icon size="md" color="fg.muted">
          <LuPaperclip />
        </Icon>
      </Box>
    )
  }

  return (
    <Stack gap="2">
      <Box {...getRootProps()} cursor={isDisabled ? 'not-allowed' : 'pointer'}>
      <MotionBox
        animate={{ scale: isDragActive ? 1.02 : 1 }}
        p="10"
        rounded="2xl"
        borderWidth="2px"
        borderStyle="dashed"
        borderColor={isDragActive ? 'brand.solid' : 'app.border'}
        bg={isDragActive ? 'brand.subtle' : 'app.surface'}
        shadow={isDragActive ? 'glow' : 'none'}
        textAlign="center"
      >
        <Stack align="center" gap="3">
          <Icon size="2xl" color="brand.fg" animation={isDragActive ? 'waveBob 1s ease-in-out infinite' : undefined}>
            <LuCloudUpload />
          </Icon>
          <Text fontWeight="semibold">{isDragActive ? MEDIA_MESSAGES.DROP_HERE : MEDIA_MESSAGES.DROP_IDLE}</Text>
          {hint && (
            <Text fontSize="sm" color="fg.muted">
              {hint}
            </Text>
          )}
        </Stack>
      </MotionBox>
      <input {...getInputProps()} />
      </Box>
      {rejection && (
        <Text fontSize="sm" color="fg.error">
          {rejection}
        </Text>
      )}
    </Stack>
  )
}
