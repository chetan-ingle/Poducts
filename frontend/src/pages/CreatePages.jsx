// Desc: Create Product Page

import { Button, Container, Heading, Input, VStack, Box, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useProductStore } from '../store/product';

const CreatePages = () => {
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });
  const toast = useToast();
  const { createProduct } = useProductStore();

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true
      });
    } else {
      setNewProduct({ name: '', price: '', image: '' });
      toast({
        title: "Product Created",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true
      });
    }
  };

  return (
    <Container maxW={'container.sm'}>
      <VStack spacing={8}>
        <Heading as={'h1'} size={'2xl'} textAlign={'center'}>Create Product</Heading>
        <Box w={'full'} bg={'white'} p={6} rounded={'lg'} boxShadow={'md'}>
          <VStack spacing={4}>
            <Input placeholder={'Product Name'} name={'name'} value={newProduct.name} onChange={handleInputChange} />
            <Input placeholder={'Product Price'} name={'price'} type={'number'} value={newProduct.price} onChange={handleInputChange} />
            <Input placeholder={'Image URL'} name={'image'} value={newProduct.image} onChange={handleInputChange} />
            <Button colorScheme={'blue'} onClick={handleAddProduct} w={'full'}>Add Product</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePages;
