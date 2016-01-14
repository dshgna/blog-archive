### Data Exploration

Measurement | Value | Observations
--- | --- | ---
Total data points | 146 | -
Allocation across classes | POI = 18 /non-POI = 128 | Low POI representation ( around 12%) 
Number of features | 21 | 14 financial features, 7 email features

##### Missing values
 - All features have missing values
 - The features (deferral_payments, loan_advances ,restricted_stock_deferred, deferred_income, long_term_incentive,director_fees) have more than 50% of their values missing.
 - The features ['deferral_payments', 'loan_advances', 'restricted_stock_deferred', 'director_fees'] have more than 50% of poi values missing. 
 - [restricted_stock_deferred, 'director_fees', 'loan_advances'] contains no or one value for POIs. However, given that these features do not have values for a large number of non-poi data points (>110), it is nt possible to divuluge whether these missing values are a novelty for pois. 
 - __Takeaway__: Due to the large amount of overall and poi missing values, it would be imprudent to use ['deferral_payments', 'loan_advances', 'restricted_stock_deferred', 'director_fees'] as features.
 
### Outlier Detection
Student response identifies outlier(s) in the financial data, and explains how they are removed or otherwise handled. Outliers are removed or retained as appropriate.