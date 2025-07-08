import React, { useState, useEffect } from 'react'
import { ErrorMessage } from 'formik'

const CustomFile = ({
  field,
  form: { touched, errors, setFieldValue },
  label,
  required,
  multiple = false,
  url = [],
  ...props
}) => {
  const [previewUrls, setPreviewUrls] = useState(multiple ? [] : null)
  const isInvalid = !!touched[field.name] && !!errors[field.name]

  const handleFileChange = (event) => {
    const files = Array.from(event.currentTarget.files)
    setFieldValue(field.name, multiple ? files : files[0])

    if (multiple) {
      const previews = files.map((file) => {
        if (file && file.type.startsWith('image/')) {
          return URL.createObjectURL(file)
        }
        return null
      }).filter(Boolean) // Keep only valid image URLs
      setPreviewUrls(previews)
    } else {
      const file = files[0]
      if (file && file.type.startsWith('image/')) {
        const preview = URL.createObjectURL(file)
        setPreviewUrls(preview)
      } else {
        setPreviewUrls(null)
      }
    }
  }

  // Cleanup preview URLs when the component is unmounted or when new files are selected
  useEffect(() => {
    return () => {
      if (multiple && Array.isArray(previewUrls)) {
        previewUrls.forEach((url) => URL.revokeObjectURL(url))
      } else if (!multiple && previewUrls) {
        URL.revokeObjectURL(previewUrls)
      }
    }
  }, [previewUrls, multiple])

  // Set initial preview if URLs are provided as props
  useEffect(() => {
    if (url) {
      if (multiple && Array.isArray(url)) {
        const isSame = JSON.stringify(previewUrls) === JSON.stringify(url)
        if (!isSame) setPreviewUrls(url)
      } else if (!multiple && typeof url === 'string') {
        if (previewUrls !== url) setPreviewUrls(url)
      }
    }
  }, [url, multiple])
  

  return (
    <div className='w-full'>
      <h5 className='text-sm sm:text-base font-normal'>
        {label}
        {required && <span className='text-[#D34053]'>*</span>}
      </h5>
      <div
        className={`w-full border rounded-lg ${isInvalid ? 'border-[#D34053]' : 'border-gray-300'
          } p-[9px]`}
      >
        <input
          type='file'
          onChange={handleFileChange}
          className='w-full h-full'
          multiple={multiple}
          {...props}
        />
      </div>

      {/* Preview Images */}
      {multiple ? (
        <>

        </>
      ) : (
        previewUrls && (
          <div className='mt-2'>
            <img
              src={previewUrls}
              alt='Preview'
              className='w-32 h-32 object-contain rounded-md'
            />
          </div>
        )
      )}

      <ErrorMessage
        name={field.name}
        component='div'
        className='text-[#D34053] text-sm sm:text-base'
      />
    </div>
  )
}

export default CustomFile
