// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: #00C3FF; icon-glyph: magic;
// ─── Toyota Car Widget by @rushhiii ───
// Displays a modern dashboard for your car in all widget sizes
// Large widget includes car image, others show text details
// ──────────────────────────────────────

// ── 1. Config & Mock Data ──
// const widgetSize = config.widgetFamily || 'large'
// const widgetSize = config.widgetFamily || 'medium' // Change to 'small' or 'large' as needed

const carInfo = {
  brand: "Toyota",
  model: "Corolla",
  year: 2020,
  mileage: "23,456 miles",
  fuel: "Gasoline",
  status: "Locked",
  imageURL: "https://dbhdyzvm8lm25.cloudfront.net/stills_0640_png/MY2020/13478/13478_st0640_116.png"
}

// ── 2. Theme ──
const backgroundColor = new Color("#000000")
const textColor = Color.white()
const secondaryTextColor = new Color("#AAAAAA")
const accentColor = new Color("#253E8F")

// ── 3. Create Widget ──
const widget = new ListWidget()
widget.backgroundColor = backgroundColor

if (widgetSize === "large") {
  await buildLargeWidget(widget)
} else {
  buildCompactWidget(widget)
}

Script.setWidget(widget)
if (config.runsInApp) await widget.presentLarge()
Script.complete()

// ── 4. Large Widget Layout ──
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

// ── 5. Detail Grid for Large ──
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

// ── 6. Detail Block Renderer ──
function addDetailBlock(stack, label, value) {
  const block = stack.addStack()
  block.layoutVertically()

  const lbl = block.addText(label)
  lbl.font = Font.mediumSystemFont(11)
  lbl.textColor = secondaryTextColor

  const val = block.addText(value.toString())
  val.font = Font.boldSystemFont(14)