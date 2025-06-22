// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: #00C3FF; icon-glyph: magic;
// ─── Toyota Car Widget by @rushhiii ───
// Displays a modern dashboard for your car in all widget sizes
// Large widget includes car image, others show text details
// ──────────────────────────────────────

// ── 1. Config & Mock Data ──
const widgetSize = config.widgetFamily || 'large'

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
const backgroundColor = new Color("#111111")
const textColor = Color.white()
const secondaryTextColor = new Color("#AAAAAA")
const accentColor = new Color("#F5F5F5")

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
  val.textColor = textColor
}

// ── 7. Compact Widget Layout (Small/Medium) ──
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

// ── 8. Compact Text Row ──
function addDetailText(widget, label, value) {
  const row = widget.addStack()
  const lbl = row.addText(`${label}: `)
  lbl.textColor = secondaryTextColor
  lbl.font = Font.mediumSystemFont(12)

  const val = row.addText(value.toString())
  val.textColor = textColor
  val.font = Font.mediumSystemFont(12)
}
