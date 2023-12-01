import { render } from "@testing-library/react";
import {
  FormContext,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

const Component = ({ name }: { name: string }) => {
  const form = useForm<{ name: string }>({
    defaultValues: { name },
  });

  return (
    <FormContext {...form}>
      <form>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <input {...field} />
              </FormControl>
              <FormDescription>Votre nom de famille</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </FormContext>
  );
};

describe("form", () => {
  it("renders correctly", () => {
    const { container } = render(<Component name="default" />);

    expect(container).toMatchSnapshot();
  });
});
