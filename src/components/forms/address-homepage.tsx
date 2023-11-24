"use client";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormContext,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const formSchema = yup.object().shape({
  address: yup.string().required("Ce champ doit être renseigné"),
});

type FormValues = yup.InferType<typeof formSchema>;

const DEFAULT_VALUES: FormValues = {
  address: "",
};

type AddressHomepageFormProps = {
  onSubmit: (formValues: FormValues) => void;
  isLoading?: boolean;
};

const AddressHomepageForm = ({
  onSubmit,
  isLoading = false,
}: AddressHomepageFormProps) => {
  const form = useForm<FormValues>({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(formSchema),
  });

  return (
    <FormContext {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="address"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Saisissez l&apos;adresse où vous vous trouvez
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="123 rue de la Paix..." />
              </FormControl>
              <FormDescription>
                Nous allons chercher les restaurants autour de chez vous.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="mt-2">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Chercher
        </Button>
      </form>
    </FormContext>
  );
};

export default AddressHomepageForm;
