import Poetess from "./poetess";

const carmen = new Poetess();

carmen.inspire().then(() => {
  console.log("Carmen writes:\n");
  console.log(
    carmen
      .writeBalladStanza()
      .lines.map(line => line.padStart(6))
      .join("\n")
  );
});
