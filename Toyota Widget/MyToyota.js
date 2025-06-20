// Toyota Car Widget - Part 1: Setup & Fake Data
const widgetSize = config.widgetFamily || 'large'

// Placeholder data
const carInfo = {
  brand: "Toyota",
  model: "Corolla",
  year: 2020,
  mileage: "23,456 miles",
  fuel: "Gasoline",
  status: "Locked",
  imageURL: "https://cdn.motor1.com/images/mgl/VVVg1/s1/2020-toyota-corolla.jpg", // Replace with custom image if needed
}

// Theme config
const backgroundColor = new Color("#111111")
const textColor = Color.white()
const secondaryTextColor = new Color("#AAAAAA")
const accentColor = new Color("#F5F5F5")

// Toyota Car Widget - Part 2: Entry
const widget = new ListWidget()
widget.backgroundColor = backgroundColor

if (widgetSize === "large") {
  await buildLargeWidget(widget)
} else {
  buildCompactWidget(widget)
}

Script.setWidget(widget)
widget.presentPreview()
Script.complete()
