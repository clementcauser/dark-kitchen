import { Textarea } from "@/components/ui/textarea";
import { render } from "@testing-library/react";

describe("textarea", () => {
  it("renders correctly", () => {
    const { container } = render(
      <Textarea placeholder="Type your message here." />
    );

    expect(container).toMatchSnapshot();
  });

  it("can be disabled", () => {
    const { getByTestId } = render(
      <Textarea
        data-testid="textarea"
        placeholder="Type your message here."
        disabled={true}
      />
    );

    expect(getByTestId("textarea")).toHaveProperty("disabled", true);
  });
});
