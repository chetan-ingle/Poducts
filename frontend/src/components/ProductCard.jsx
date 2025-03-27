import React, { useState } from 'react';
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
  VStack,
  Input,
  Button,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useProductStore } from '../store/product';

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bg = useColorModeValue('white', 'gray.800');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    toast({
      title: success ? 'Success' : 'Error',
      description: message,
      status: success ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProduct = async () => {
    try {
      const { success, message } = await updateProduct(product._id, updatedProduct);
      toast({
        title: success ? 'Updated' : 'Error',
        description: message,
        status: success ? 'success' : 'error',
        duration: 3000,
        isClosable: true,
      });

      if (success) onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update product',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.25s"
      _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} h="48" w="full" objectFit="cover" />

      <Box p="4">
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          {product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
          <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme="red" />
        </HStack>
      </Box>

      {/* Modal for Updating Product */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={4}>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} p={4}>
              <Input placeholder="Product Name" name="name" value={updatedProduct.name} onChange={handleInputChange} />
              <Input placeholder="Product Price" name="price" value={updatedProduct.price} onChange={handleInputChange} />
              <Input placeholder="Image URL" name="image" value={updatedProduct.image} onChange={handleInputChange} />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateProduct}>
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
