'use client';
import LogoWebsite from '@/src/components/layout/LogoWebsite';
import { Box, Button, Container, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import LogoMobile from '@/public/Logo-mobile.png';
import { useRouter } from 'next/navigation';
import DisplayCartMobile from '@/src/components/layout/DisplayCartMobile';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/src/app/store';
import { RemoveItem } from '@/src/featuers/cart/cartSlice';
import { useEffect } from 'react';
import { setCartItems } from '@/src/featuers/cart/cartSlice';
import CloseIcon from '@mui/icons-material/Close';
import UseProductsReturn from '@/src/hooks/UseProductsReturn';
import SpinnerLoader from '@/src/components/layout/SpinnerLoader';

export default function page() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = UseProductsReturn();
  const shopsItem = useSelector((store: RootState) => store.cart.items);
  const totalPrice = shopsItem
    .map((item) => Number(item.price) * item.quantity)
    .reduce((acc, cur) => acc + cur, 0);
  const Tax = useSelector((store: RootState) => store.cart.Tax);
  const orderTotal = Number(Tax) + Number(totalPrice);
  useEffect(() => {
    const getItemCard = localStorage.getItem('cartItem');
    if (getItemCard) {
      dispatch(setCartItems(JSON.parse(getItemCard)));
    }
  }, [dispatch]);
  const handleRemove = (id: any) => {
    dispatch(RemoveItem(id));
  };
  const router = useRouter();

  if (loading) return <SpinnerLoader />;
  return (
    <Container sx={{ display: { md: 'none' } }}>
      <Box sx={{ mt: 3 }}>
        <Link href="/">
          <Image priority src={LogoMobile} alt="Logo for page" />
        </Link>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          marginBottom: '2rem',
        }}
      >
        <Button
          sx={{
            color: '#5A6D57',
            fontSize: '1rem',
            paddingLeft: '1.5rem',
            textTransform: 'capitalize',
          }}
          onClick={() => router.back()}
        >
          Back
        </Button>
        <Typography fontFamily={'inherit'} variant="h5" fontWeight={'700'}>
          Your Cart
        </Typography>
      </Box>

      <Typography>Order Summary</Typography>
      {/* <DisplayCartMobile /> */}
      <Box sx={{ padding: ' 3rem 0rem' }}>
        {shopsItem.map((items) => (
          <>
            <Box
              sx={{
                display: 'flex',
                gap: '1rem',
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <Image
                  src={items.image}
                  width={142}
                  height={142}
                  alt="image selected"
                  style={{
                    objectFit: 'cover',
                  }}
                />
                <Box
                  sx={{
                    background: 'white',
                    position: 'absolute',
                    top: '0.4rem',
                    right: '0.4rem',
                    padding: '0.3rem 1rem',
                  }}
                >
                  {items.quantity}
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.7rem',
                }}
              >
                {' '}
                <Typography sx={{ fontWeight: '600' }}>
                  {items.name.split(' ').slice(0, 2).join(' ')}
                </Typography>
                <Typography>Size : {items.size}</Typography>
                <Typography>Color : {items.color}</Typography>
                <Box
                  sx={{
                    display: 'flex',
                  }}
                >
                  <Typography sx={{ fontWeight: '600' }}>
                    {' '}
                    $ {items.price}{' '}
                  </Typography>
                  <Box
                    sx={{ position: 'absolute' as 'absolute', right: '2rem' }}
                  >
                    <Box
                      sx={{
                        background: '#D1D9CF',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0rem 0.9rem',

                        gap: '20px',
                      }}
                    >
                      <Button
                        sx={{
                          minWidth: '0',
                          color: '#404E3E',
                          fontSize: '1.4rem',
                          padding: '0',
                          fontWeight: '600',
                        }}
                      >
                        -
                      </Button>
                      <Typography>1</Typography>
                      <Button
                        sx={{
                          minWidth: '0',
                          color: '#404E3E',
                          fontSize: '1.4rem',
                          padding: '0',
                          fontWeight: '600',
                        }}
                      >
                        +
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Button
                  onClick={() => handleRemove(items.id)}
                  sx={{
                    color: 'black',
                    position: 'absolute' as 'absolute',
                    right: '0rem',
                  }}
                >
                  <CloseIcon />
                </Button>
              </Box>
            </Box>

            {/* item - 1 + ==> quantity */}
            {/* item chanta selected  */}
          </>
        ))}
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Subtotal({shopsItem.length})</Typography>
            <Typography>
              $
              {totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Typography>Tax</Typography>
            <Typography>
              ${Tax.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Typography>Shipping</Typography>
            <Typography>Free</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Typography fontWeight={'700'}>Order Total : </Typography>
            <Typography fontWeight={'700'}>
              $
              {orderTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Typography>
          </Box>
          <Typography sx={{ mt: 2, fontWeight: '700', fontSize: '0.9rem' }}>
            The total amount you pay includes all applicable customs duties &
            taxes. We guarantee no additional charges on delivery
          </Typography>
        </Box>
        <Box
          sx={{
            mt: 3,
            display: 'flex',
            alignItems: 'end',
            justifyContent: 'end',
          }}
        >
          <Button
            href="/checkout"
            sx={{
              background: '#5A6D57',
              color: 'white',
              borderRadius: 0,
              padding: '0.5rem 3rem',
              textTransform: 'capitalize',

              '&:hover': {
                background: '#5A6D57',
              },
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
