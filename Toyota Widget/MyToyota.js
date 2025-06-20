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

// Toyota Car Widget - Part 3: Large Layout
async function buildLargeWidget(widget) {
  const imgReq = new Request(carInfo.imageURL)
  const carImage = await imgReq.loadImage()

  const imgStack = widget.addStack()
  imgStack.size = new Size(0, 160)
  imgStack.centerAlignContent()
  const image = imgStack.addImage(carImage)
  image.imageSize = new Size(320, 160)
  image.cornerRadius = 10
  image.resizable = true
  widget.addSpacer(10)

  const brandStack = widget.addStack()
  brandStack.centerAlignContent()
  const logo = brandStack.addText("🚗  " + carInfo.brand)
  logo.font = Font.mediumSystemFont(16)
  logo.textColor = textColor
  widget.addSpacer(2)

  const modelText = widget.addText(carInfo.model)
  modelText.font = Font.semiboldSystemFont(20)
  modelText.textColor = accentColor
  widget.addSpacer(8)

  addDetailsGrid(widget)
}

// Toyota Car Widget - Part 4: Detail Grid for Large Widget
function addDetailsGrid(widget) {
  const grid = widget.addStack()
  grid.layoutVertically()

  const row1 = grid.addStack()
  addDetailBlock(row1, "Year", carInfo.year)
  row1.addSpacer()
  addDetailBlock(row1, "Mileage", carInfo.mileage)

  widget.addSpacer(4)

  const row2 = grid.addStack()
  addDetailBlock(row2, "Fuel", carInfo.fuel)
  row2.addSpacer()
  addDetailBlock(row2, "Status", carInfo.status)
}

// Toyota Car Widget - Part 6: Text-only layout for small/medium
function buildCompactWidget(widget) {
  widget.setPadding(12, 14, 12, 14)

  const title = widget.addText(`${carInfo.brand} ${carInfo.model}`)
  title.font = Font.boldSystemFont(16)
  title.textColor = textColor
  widget.addSpacer(6)

  addDetailText(widget, "Year", carInfo.year)
  addDetailText(widget, "Mileage", carInfo.mileage)
  addDetailText(widget, "Fuel", carInfo.fuel)
  addDetailText(widget, "Status", carInfo.status)
}


// Toyota Car Widget - Part 5: Add key-value detail box
function addDetailBlock(stack, label, value) {
  const block = stack.addStack()
  block.layoutVertically()

  const lbl = block.addText(label)
  lbl.font = Font.mediumSystemFont(11)
  lbl.textColor = secondaryTextColor

  const val = block.addText(value.toString())
  val.font = Font.boldSystemFont(14)
  val.textColor = textColor
}

// Toyota Car Widget - Part 7: Add label/value to compact view
function addDetailText(widget, label, value) {
  const row = widget.addStack()
  const lbl = row.addText(`${label}: `)
  lbl.textColor = secondaryTextColor
  lbl.font = Font.mediumSystemFont(12)

  const val = row.addText(value.toString())
  val.textColor = textColor
  val.font = Font.mediumSystemFont(12)
}



if (widgetSize === "large") {
  await buildLargeWidget(widget)
} else {
  buildCompactWidget(widget)
}

Script.setWidget(widget)
widget.presentPreview()
Script.complete()
