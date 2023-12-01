import { render } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("button", () => {
  it("renders correctly", () => {
    const { container } = render(<Button>Click me</Button>);

    expect(container).toMatchSnapshot();
  });
});
