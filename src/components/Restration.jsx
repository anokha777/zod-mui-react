import { Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useCallback } from "react";
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistrationSchema } from "./RegistrationSchema";

const Restration = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    mode: 'all',
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthday: undefined,
      gender: undefined,
      termsAndConditions: false
    },
    resolver: zodResolver(RegistrationSchema)
  });

  const onSubmit = (value) => {
    console.log('value= ', value);
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '15px' }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField 
              error={!!errors.name}
              label="Name"
              type="text"
              varient="outlined"
              helperText={errors.name?.message}
              {...field}
            />
          )}
        />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField 
                error={!!errors.email}
                label="Email"
                type="text"
                varient="outlined"
                helperText={errors.email?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField 
                error={!!errors.password}
                label="Password"
                type="password"
                varient="outlined"
                helperText={errors.password?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField 
                error={!!errors.confirmPassword}
                label="Confirm Password"
                type="password"
                varient="outlined"
                helperText={errors.confirmPassword?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="birthday"
            control={control}
            render={({ field }) => (
              <> 
                <InputLabel id="date" error={!!errors.birthday}>
                  Age
                </InputLabel>
              
                <TextField 
                  error={!!errors.birthday}
                  id="date"
                  label="Birthday"
                  type="date"
                  varient="outlined"
                  helperText={errors.birthday?.message}
                  {...field}
                />
              </>
            )}
          />

          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <> 
                <FormControl error={!!errors.gender}>
                  <InputLabel id="gender" error={!!errors.birthday}>
                    Gender
                  </InputLabel>
                  <Select {...field} labelId="gender" id="gender" label="Age" varient="outlined">
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                  {errors.gender && <FormHelperText>{errors.gender?.message}</FormHelperText>}
                </FormControl>
              
              </>
            )}
          />

          <Controller
            name="termsAndConditions"
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.termsAndConditions} variant="outlined">
                <FormControlLabel {...field} control={<Checkbox {...field} />} label="Accept term and conditions." />
                {errors.termsAndConditions && <FormHelperText>{errors.termsAndConditions?.message}</FormHelperText>}
              </FormControl>
            )}
          />
      </Box>
      <Button varient="contained" type="submit">Submit</Button>
    </form>
  );
}

export default Restration;