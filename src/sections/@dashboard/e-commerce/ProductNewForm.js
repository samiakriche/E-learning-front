import { useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, Input, Button } from '@mui/material';
// redux
import { createProduit } from '../../../redux/actions/E-commerceActions/productActions';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFEditor,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadMultiFile,
  RHFUploadSingleFile,
} from '../../../components/hook-form';


import storage from '../../../firebase';

// ----------------------------------------------------------------------

const GENDER_OPTION = ['Men', 'Women', 'Kids'];

const CATEGORY_OPTION = [
  { group: 'Clothing', classify: ['Shirts', 'T-shirts', 'Jeans', 'Leather'] },
  { group: 'Tailored', classify: ['Suits', 'Blazers', 'Trousers', 'Waistcoats'] },
  { group: 'Accessories', classify: ['Shoes', 'Backpacks and bags', 'Bracelets', 'Face masks'] },
];

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots',
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function ProductNewForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClosePreview = () => {
    setOpen(false);
  };
  const [uploaded, setUploaded] = useState(0);

const handleOpenPreview = () => {
  setOpen(true);
};

  const defaultValues = {
    name: '',
    description: '',
    image: '',
    countInStock: '',
    price: 0,
    oldPrice: 0,
    category: '',
  };

  const [produitData, setProduitData] = useState({
    name: '',
    status: 'new',
    description: '',
    image: '',
    countInStock: 0,
    price: 0,
    oldPrice: 0,
    category: '',
  });

  const methods = useForm({
    resolver: yupResolver(),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      handleClosePreview();
      dispatch(createProduit(produitData));
      enqueueSnackbar('Create success!');
      navigate(PATH_DASHBOARD.eCommerce.list);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(produitData);
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'image', // images ??????????
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/produits/${fileName}`).put(item.file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setProduitData((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: produitData.image, label: 'image' },
    ]);
  };
  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setProduitData({ ...produitData, [e.target.name]: value });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField
                name="name"
                label="Product Name"
                value={produitData.name}
                onChange={(e) => setProduitData({ ...produitData, name: e.target.value })} />

              <div>
                <LabelStyle>Description</LabelStyle>
                <RHFTextField
                  name="description"
                  label="Description"
                  multiline
                  rows={3}
                  value={produitData.description}
                  onChange={(e) => setProduitData({ ...produitData, description: e.target.value })}
                />
              </div>

              <div>
                <LabelStyle>Image</LabelStyle>
                <Input
                  name="image"
                  type="file"
                  multiple={false}
                  onChange={(e) => setProduitData({ ...produitData, image: e.target.files[0] })}
                />
              </div>
            </Stack>
          </Card>
          {uploaded === 1 ? (
              <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                <Button disabled fullWidth color="inherit" variant="outlined" size="large" onClick={handleOpenPreview}>
                  Upload
                </Button>
                <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                  Submit
                </LoadingButton>
              </Stack>
            ) : (
              <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                <Button fullWidth color="inherit" variant="outlined" size="large" onClick={handleUpload}>
                  Upload
                </Button>
                <LoadingButton disabled fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                  Submit
                </LoadingButton>
              </Stack>
            )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              {/* <RHFSwitch name="inStock" label="In stock" /> */}

              <Stack spacing={3} mt={2}>
                <RHFTextField
                  name="countInStock"
                  label="Count In Stock"
                  value={produitData.countInStock}
                  onChange={(e) => setProduitData({ ...produitData, countInStock: e.target.value })}
                />

                {/* <RHFSelect name="category" label="Category">
                  {CATEGORY_OPTION.map((category) => (
                    <optgroup key={category.group} label={category.group}>
                      {category.classify.map((classify) => (
                        <option key={classify} value={classify}>
                          {classify}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </RHFSelect> */}

                {/* <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      multiple
                      freeSolo
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={TAGS_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <TextField label="Tags" {...params} />}
                    />
                  )}
                /> */}
              </Stack>
            </Card>

            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mb={2}>
                <RHFTextField
                  name="price"
                  label="Price"
                  placeholder="0.00"
                  value={produitData.price}
                  onChange={(e) => setProduitData({ ...produitData, price: e.target.value })}
                />

                <RHFTextField
                  name="oldPrice"
                  label="oldPrice"
                  placeholder="0.00"
                  value={produitData.oldPrice}
                  onChange={(e) => setProduitData({ ...produitData, oldPrice: e.target.value })}
                />
              </Stack>
            </Card>
            {/* <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              Save
            </LoadingButton> */}
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
