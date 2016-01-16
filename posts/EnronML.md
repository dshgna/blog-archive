This post details my approach to the final project in Udacity's [Intro to Machine Learning](https://www.udacity.com/course/viewer#!/c-ud120/l-3335698626/m-3316018628). This was a wonderful project which forced me to **think** on the concepts I had learned throughout the course and appreciate the creativity and patience needed to garner effective results.  

### The Dataset and the Problem
In the early 2000s, the multi-million enrgy superpower, Enron, collapsed in what would turn out to be one of the largest instances of corporate fraud. Following the investigation, the company's [email corpus](https://www.cs.cmu.edu/~./enron/) was released to the public, becoming one of the most studied datasets of all time.

In this project, I will be investigating a dataset that combines the email corpus with employee financial data. My question revolves in identifying salient financial and email features of employees involved in the fraud (hereto referred as person of interest or poi).

### Data Exploration

Measurement     | Value         | Observations
| ------------- |:-------------:| -----|
Total data points | 146 | -
POI data points | 18 | Low POI representation ( around 12%)
non-POI data points | 128 | - 
Number of features | 21 | 14 financial features, 7 email features
Missing values  |-|All features have missing values


#### Handling Missing Values
 - Features with more than 50% missing values: `deferral_payments`, `loan_advances` ,`restricted_stock_deferred`, `deferred_income`, `long_term_incentive`, `director_fees`
 - POIs with more than 50% missing values: `deferral_payments`, `loan_advances`, `restricted_stock_deferred`, `director_fees`
 - __Conclusion__: The features `restricted_stock_deferred`, `director_fees`, `loan_advances` have both a large number of missing non-poi(>110) and poi(>17) values; therefore it would be imprudent to use them as features.

#### Outlier Detection
 - Visualization was used for outlier detection. While removing the top 10% values would have been faster and 'programmatic', this was not appropriate here as it would remove a significant POIs from the dataset. 
 - A data point significantly stood out in the initial dataset (Figure 2.1), dwarfing the rest of the data. On inspection, this turned out to be the 'TOTAL' which had been erroneously appended to the dataset.
 - The resultant dataset was visualized by plotting `salary` against the other financial features (Figure 2.2).

Feature | Outliers | Decision
--- | --- | ---
Salary-Total Payments | 3 outliers in salary and total payments | The points correspond to key Enron employees (e.g.Chairman Kenneth Lay) thus we can safely assume that they are valid.
Bonus | A mid-wage non-POI earns a higher bonus than the CEO! | Given the unexplainable discrepacy, this outlier was removed.
Deferred income | Five points below the average trend (2 non-pois and 3 pois) | The points are retained. Removing 3 POIs would be detrimental for the quality of the data.
Total stock value | A low-wage POI owning stocks well above the average | Could be an indication of fraud - data point left in
Expenses | Three mid-wage, non-POIs incur huge expenses | *"God-fearing souls splurging on rich stationery!"* The outliers were removed.
Exercised stock options | A low-wage POI owning stocks well above the average | Could be an indication of fraud - data point left in
Long term incentives | A low-waged employee POI owning stocks well above the average | Could be an indication of fraud - data point left in
Restricted stock | A low-wage POI owning stocks well above the average | Could be an indication of fraud - data point left in

