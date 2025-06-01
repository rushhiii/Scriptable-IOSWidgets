## 🛠️ Widget Usage

Here’s how to configure the widget for different modes:

1. **Single Event View (Small Widget)**
   * **Applies to:** Small widgets by default.  
   * **Displays:** The next upcoming event with days left, age (if a birthday/anniversary is today), and date.
  
2. **Default List View**
    - **Applies to:** Medium and Large widgets by default.  
    - **Displays:** A scrollable list of the top upcoming events with countdowns.


### 🔹 **Parameters Configuration**

<p align="center">

<table>
  <tr>
    <th>Option</th>
    <th>Defaults</th>
    <th>Change to</th>
  </tr>
  <tr>
    <td>Script</td>
    <td>Choose</td>
    <td>Widget Name (e.g., Countdown Widget)</td>
  </tr>
  <tr>
    <td>While Interacting (optional)</td>
    <td>Open App</td>
    <td>Run Script</td>
  </tr>
  <tr>
    <td>Parameters</td>
    <td>Text</td>
    <td>For example:<br/>- <code>age</code> to show age in small widget.<br/>- <code>2</code> to select second event.<br/>- <code>john,age</code> to select by name and show age (order doesn’t matter).<br/>- <code>col</code> to enable grid view (best for large widgets).</td>
  </tr>
</table>
</p>

like so,

{add parma's instering image}

### **Examples**
* **Show Age Mode:**
```
age
```
* **Select by index:**
```
2
```
* **Select by name and show age:**
```
john,age
```
* **Enable Grid View:**
```
col
```

