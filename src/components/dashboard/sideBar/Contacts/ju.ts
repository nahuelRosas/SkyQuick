const addProduct = (
  product: DocumentData,
  size: { value: string; label: string } | undefined,
  withOutToast: boolean = false
) => {
  const foundIndex = State.wishlist.findIndex(
    (x) => x.id === product.id && x.size.value === size?.value
  );

  if (foundIndex >= 0) {
    return;
  }

  try {
    if (size === undefined) {
      throw new Error(errors.noSize);
    }
    SetState({
      ...State,
      wishlist: [
        ...State.wishlist,
        {
          id: product.id,
          product,
          size: size,
        },
      ],
    });
    if (userData) {
      updateDoc(doc(firestore, "customers", UID), {
        wishlist: [
          ...State.wishlist,
          {
            id: product.id,
            product,
            size: size,
          },
        ],
      });
    }
    if (withOutToast) return;
    toast({
      title: "Product added to wishlist",
      description: "We've added the product to your wishlist",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  } catch (error: any) {
    if (withOutToast) return;
    toast({
      title: "Error adding product to wishlist",
      description: error.message,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
};
