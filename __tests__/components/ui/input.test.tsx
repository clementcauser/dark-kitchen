import { render } from "@testing-library/react";
import { Input } from "@/components/ui/input";

describe("input", () => {
  it("renders correctly", () => {
    const { container } = render(<Input type="email" placeholder="Email" />);

    expect(container).toMatchSnapshot();
  });
});
