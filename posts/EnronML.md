This post details my approach to the final project in Udacity's [Intro to Machine Learning](https://www.udacity.com/course/viewer#!/c-ud120/l-3335698626/m-3316018628). This was a practical project which forced me to **think** and appreciate the creativity, logic and patience needed to garner accurate results.  

### The Dataset and the Problem
In the early 2000s, the multi-million energy superpower, Enron, collapsed in what would turn out to be one of the greatest cases of corporate fraud of all time.

In this project, I investigated the Enron [email corpus](https://www.cs.cmu.edu/~./enron/) together with employee financial data to identify employees' involved in the fraud (hereto referred as a person of interest or poi).

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

#### Outlier Investigation
 - This was the most time consuming step which made me fully appreciate the complexity of dealing with real world data.
 - Visualization was used for outlier detection. While removing the top 10% values would have been faster and 'programmatic', this was not appropriate here as it would remove a significant POIs from the dataset. 
 - A data point significantly stood out in the initial dataset, dwarfing the rest of the data. On inspection, this turned out to be the `TOTAL` which had been erroneously appended to the dataset.
 - The resultant dataset was visualized by plotting `salary` against the other financial features (Figure 1). The email features were derived from the actual email dataset and therefore outlier detection was applied.

![Financial Outliers](http://dshgna.github.io/images/financial_features.PNG "Financial Outliers")
Figure 1: Initial dataset

Feature | Outliers | Decision
--- | --- | ---
Salary-Total Payments | 3 outliers in salary and total payments | The points correspond to key Enron employees (e.g.Chairman Kenneth Lay) thus we can safely assume that they are valid.
Bonus | A mid-wage non-POI `LAVORATO JOHN J` earns a higher bonus than the CEO! | Removed.
Deferred income | Five points below the average trend, of which 2 were non-pois`ALLEN PHILLIP K, FREVERT MARK A` and 3 were pois `HANNON KEVIN P, BELDEN TIMOTHY N, RICE KENNETH D` | The points are retained. Removing 3 POIs would be detrimental for the quality of the data. 
Total stock value, Exercised stock options | Though this appears to be a low-wage POI owning above-average stocks, on hindsight this, was caused due to a missing value in `salary`: `HIRKO JOSEPH` was the broadband chief of Enron. | While this data point is explainable with regards of stock, it was removed due to the large amount of missing values in it(including all the email data). 
Expenses | Three mid-wage, non-POIs(`SHANKMAN JEFFREY A`, `MCCLELLAN GEORGE`, `URQUHART JOHN A`) incur huge expenses | *"God-fearing souls splurging on rich stationery!"* Removed.
Long term incentives | Non POI `MARTIN AMANDA K` | Removed
Restricted stock | Two mid-wage non-POIs(`WHITE JR THOMAS E`, `PAI LOU L`) | Removed

Now for the resultant dataset: significantly cleaner.

![Financial Outliers](http://dshgna.github.io/images/financial_features_adjusted.PNG "Financial Outliers")
Figure 2: Dataset after outlier removal

#### Feature Selection
