'use client'

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import Button from "@/components/button"

export default function AddNewProductForm() {

  const [productName, setProductName] = useState('')
  const [productNameInfo, setProductNameInfo] = useState('')
  const [productImage, setProductImage] = useState<File | null>(null)
  const [productImageInfo, setProductImageInfo] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [productCategoryInfo, setProductCategoryInfo] = useState('')
  const [productSubCategory, setProductSubCategory] = useState('')
  const [productSubCategoryInfo, setProductSubCategoryInfo] = useState('')
  const [productSubCategoryOptions, setProductSubCategoryOptions] = useState<{ label: string, value: string }[]>([])
  const [productPrice, setProductPrice] = useState('')
  const [productPriceInfo, setProductPriceInfo] = useState('')
  const [productDiscountPrice, setProductDiscountPrice] = useState('')
  const [productDiscountPriceInfo, setProductDiscountPriceInfo] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInput = useRef<null | HTMLInputElement>(null)

  const handleImageImput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProductImage(e.target.files[0])
    }
  }

  const handleImageRemove = () => {
    setProductImage(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isValid = validation()
    if (isValid && productImage) {
      setIsSubmitting(true)
      const data = new FormData()
      data.append('name', productName)
      data.append('image', productImage)
      data.append('category', productCategory)
      data.append('subcategory', productSubCategory)
      data.append('price', productPrice)
      data.append('discountprice', productDiscountPrice)
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/add-new-product`, {
        method: 'POST',
        body: data,
      })
      const json = await response.json()
      if (json.ok) {
        console.log('Product added')
        const doReset = confirm('New product added successfully!\nReset form?')
        doReset && handleReset()
      } else {
        console.log('Some error occured')
      }
      setIsSubmitting(false)
    }
  }

  const validation = () => {
    let isProductNameValid = true
    if (productName.trim() === '') {
      isProductNameValid = false
      setProductNameInfo('Product name is required.')
    } else if (productName.trim().length < 3 || productName.trim().length > 50) {
      isProductNameValid = false
      setProductNameInfo('Product name\'s length should be between 2 to 50 characters.')
    } else {
      setProductNameInfo('')
    }

    let isImageValid = true
    if (!productImage) {
      isImageValid = false
      setProductImageInfo('Image file is required.')
    } else if (productImage?.size && productImage.size > 1000000) {
      isImageValid = false
      setProductImageInfo('Image file should be less than 1MB.')
    } else {
      setProductImageInfo('')
    }

    let isCategoryValid = true
    if (productCategory === '') {
      isCategoryValid = false
      setProductCategoryInfo('Please select a category.')
    } else {
      setProductCategoryInfo('')
    }

    let isSubCategoryValid = true
    if (productSubCategory === '') {
      isSubCategoryValid = false
      setProductSubCategoryInfo(productCategory === '' ? 'Please select a category first.' : 'Please select a sub-category.')
    } else {
      setProductSubCategoryInfo('')
    }

    let isPriceValid = true
    const price = parseInt(productPrice)
    if (productPrice === '' || productPrice === '0') {
      isPriceValid = false
      setProductPriceInfo('Price is required.')
    } else if (isNaN(price)) {
      isPriceValid = false
      setProductPriceInfo('Entered price is not a number.')
    } else {
      setProductPriceInfo('')
    }

    let isDiscountPriceValid = true
    const discountPrice = parseInt(productDiscountPrice)
    if (productDiscountPrice === '0') {
      isPriceValid = false
      setProductDiscountPriceInfo('Discount price cannot be 0.')
    } else if (productDiscountPrice !== '' && isNaN(discountPrice)) {
      isDiscountPriceValid = false
      setProductDiscountPriceInfo('Entered price is not a number.')
    } else if (price <= discountPrice) {
      isDiscountPriceValid = false
      setProductDiscountPriceInfo('Discount price should be less than original price.')
    } else {
      setProductDiscountPriceInfo('')
    }

    return isProductNameValid && isImageValid && isCategoryValid && isSubCategoryValid && isPriceValid && isDiscountPriceValid
  }

  const handleReset = () => {
    setProductName('')
    setProductNameInfo('')
    setProductImage(null)
    setProductImageInfo('')
    setProductCategory('')
    setProductCategoryInfo('')
    setProductSubCategory('')
    setProductSubCategoryInfo('')
    setProductPrice('')
    setProductPriceInfo('')
    setProductDiscountPrice('')
    setProductDiscountPriceInfo('')
  }

  useEffect(() => {
    setProductSubCategory('')
    const category = productTypes.filter(category => category.value === productCategory)[0]
    const subcategory = [...category.subCategories]
    if (productCategory !== '') {
      subcategory.unshift({ label: 'Select Sub Category', value: '' })
    }
    setProductSubCategoryOptions(subcategory)
  }, [productCategory])

  return (
    <form onSubmit={e => handleSubmit(e)} onReset={e => handleReset()} noValidate encType="multipart/form-data">
      <div className="my-4">
        <label htmlFor="product-name" className="text-sm">Product Name :</label><br />
        <input
          id="product-name"
          className="max-w-md w-full py-1 border-b-2"
          type="text"
          value={productName}
          onChange={e => setProductName(e.target.value)}
          placeholder="Enter product name..."
          autoComplete="false"
        />
        {productNameInfo && <span className="block my-1 text-sm text-red-600"> {productNameInfo}</span>}
      </div>
      <div className="my-4">
        <label htmlFor="image" className="text-sm">Product Image :</label><br />
        <div className="max-w-md min-h-[208px] my-2 p-2 border-4 border-dashed rounded-lg flex flex-col justify-center items-center">
          {
            productImage && <span>
              <Image src={URL.createObjectURL(productImage)} alt="Preview of uploaded image" width={200} height={200} />
            </span>
          }
          <span className="block py-2">{productImage?.name ? productImage.name : 'No image is selected.'}</span>
        </div>
        <input
          ref={fileInput}
          id="image"
          className="hidden"
          type="file"
          accept="image/png, image/jpeg"
          value={undefined}
          onChange={e => handleImageImput(e)}
        />
        {productImageInfo && <span className="block my-1 text-sm text-red-600"> {productImageInfo}</span>}
        <div className="flex gap-2">
          <Button variant="outline" type="button" onClick={e => fileInput.current?.click()}>Click to choose</Button>
          <Button variant="outline" type="button" onClick={e => handleImageRemove()}>Remove image</Button>
        </div>
        <div className="my-4">
          <label htmlFor="product-category" className="text-sm">Product Category :</label><br />
          <select className="px-3 py-2" id="product-category" value={productCategory} onChange={e => setProductCategory(e.target.value)}>
            {
              productTypes.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))
            }
          </select>
          {productCategoryInfo && <span className="block my-1 text-sm text-red-600"> {productCategoryInfo}</span>}
        </div>
        <div className="my-4">
          <label htmlFor="product-subcategory" className="text-sm">Product Sub-category :</label><br />
          <select className="px-3 py-2" id="product-subcategory" value={productSubCategory} onChange={e => setProductSubCategory(e.target.value)}>
            {
              productSubCategoryOptions.map((subcategory, index) => (
                <option key={subcategory.value + index} value={subcategory.value}>
                  {subcategory.label}
                </option>
              ))
            }
          </select>
          {productSubCategoryInfo && <span className="block my-1 text-sm text-red-600"> {productSubCategoryInfo}</span>}
        </div>
        <div className="my-4">
          <label htmlFor="product-price" className="text-sm">Product Price : <span className="text-xs text-neutral-400">(only integer value)</span></label><br />
          <input className="py-1 border-b-2" id="product-price" type="number" value={productPrice} onChange={e => setProductPrice(e.target.value)} min={0} />
          {productPriceInfo && <span className="block my-1 text-sm text-red-600"> {productPriceInfo}</span>}
        </div>
        <div className="my-4">
          <label htmlFor="product-discount-price" className="text-sm">Discount Price : <span className="text-xs text-neutral-400">(not madatory)</span></label><br />
          <input className="py-1 border-b-2" id="product-discount-price" type="number" value={productDiscountPrice} onChange={e => setProductDiscountPrice(e.target.value)} min={0} />
          {productDiscountPriceInfo && <span className="block my-1 text-sm text-red-600"> {productDiscountPriceInfo}</span>}
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Adding Product...' : 'Add Product'}</Button>
        <Button type="reset" disabled={isSubmitting}>Reset</Button>
      </div>
    </form>
  )
}

const productTypes = [
  {
    label: 'Select Category',
    value: '',
    subCategories: [
      {
        label: 'Select Category First!',
        value: '',
      },
    ],
  },
  {
    label: 'Electronics',
    value: 'electronics',
    subCategories: [
      {
        label: 'Mobiles',
        value: 'mobiles',
      },
      {
        label: 'Laptops',
        value: 'laptops',
      },
      {
        label: 'Cameras',
        value: 'cameras',
      },
      {
        label: 'Headphones',
        value: 'headphones',
      },
      {
        label: 'Projectors',
        value: 'projectors',
      },
      {
        label: 'Powerbanks',
        value: 'powerbanks',
      },
      {
        label: 'Random',
        value: 'random',
      },
    ],
  },
  {
    label: 'Home Appliances',
    value: 'home-appliances',
    subCategories: [
      {
        label: 'Mixer/Grinders',
        value: 'mixer-grinders',
      },
      {
        label: 'Iron Press',
        value: 'iron-press',
      },
      {
        label: 'Fans',
        value: 'fans',
      },
      {
        label: 'Random',
        value: 'random',
      },
    ],
  },
  {
    label: 'Fashion',
    value: 'fashion',
    subCategories: [
      {
        label: 'Wrist Watches',
        value: 'wrist-watches',
      },
      {
        label: 'Spectacles',
        value: 'spectacles',
      },
      {
        label: 'Shirts',
        value: 'shirts',
      },
      {
        label: 'Jeans',
        value: 'jeans',
      },
      {
        label: 'Shoes',
        value: 'shoes',
      },
      {
        label: 'T-Shirts',
        value: 't-shirts',
      },
      {
        label: 'Random',
        value: 'random',
      },
    ],
  },
]