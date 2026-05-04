window.STUDY_DATA = {
  "site": {
    "title": "AI/ML Final Deep Study Studio",
    "subtitle": "Interactive learning site for Unsupervised Learning through Generative AI"
  },
  "chapters": [
    {
      "chapter": 4,
      "slug": "unsupervised-learning",
      "title": "4 Unsupervised Learning",
      "shortTitle": "Unsupervised",
      "badge": "Chapter 4",
      "summary": "Clustering, dimensionality reduction, geometry, and how to reason about structure without labels.",
      "goals": [
        "Understand what unsupervised learning is trying to discover.",
        "Explain K-means, hierarchical clustering, PCA, and t-SNE in plain language.",
        "Recognize when distance, normalization, and geometry can distort interpretation."
      ],
      "traps": [
        "Calling PCA a clustering method.",
        "Forgetting that inertia always decreases as k increases.",
        "Trusting t-SNE cluster spacing as though it were exact global geometry."
      ],
      "formulas": [
        "Euclidean distance: d(x, y) = sqrt(sum_i (x_i - y_i)^2)",
        "K-means objective: sum_i ||x_i - mu_{c_i}||^2",
        "Conviction to remember: PCA finds directions of maximum variance, not clusters."
      ],
      "starterQuestions": [
        "If there are no labels, what counts as a good answer?",
        "Why can changing feature scale completely change clustering results?",
        "Why is t-SNE useful even though it is dangerous to over-interpret?"
      ],
      "introHtml": "<p>Unsupervised learning studies data without using explicit target labels. In supervised learning, the training data tells us what the correct answer is for each example. In unsupervised learning, the data gives us only the observations themselves. We are asked to find structure, organization, regularity, or lower-dimensional patterns hidden inside that data. This makes unsupervised learning intellectually attractive because it often feels closer to scientific discovery than to ordinary classification. At the same time, it is more ambiguous, because there is often no single perfect answer to compare against.</p>\n<p>In this chapter, the main topics are clustering and dimensionality reduction. The specific methods emphasized by the course are K-means clustering, hierarchical agglomerative clustering, Principal Component Analysis (PCA), and t-distributed Stochastic Neighbor Embedding (t-SNE). The lecture slides and homework use these methods for practical data analysis, but to understand them deeply it is useful to step back and study the ideas beneath them: similarity, distance, geometry, variance, and representation.</p>\n<figure class=\"md-figure\"><img src=\"figures/ch04_unsupervised_landscape.png\" alt=\"Clustering and dimensionality reduction answer different questions: clusters group nearby points, while PCA rotates the coordinate system to keep the most informative directions.\" loading=\"lazy\" /><figcaption>Clustering and dimensionality reduction answer different questions: clusters group nearby points, while PCA rotates the coordinate system to keep the most informative directions.</figcaption></figure>",
      "plainEnglishHtml": "<p>Unsupervised learning is what we do when the data exists but no one hands us the answers. We are trying to notice shape, neighborhoods, compression, and hidden structure before labels tell us what to care about.</p>",
      "mentalModelHtml": "<p>Imagine a cloud of points floating in space. Clustering asks whether the cloud naturally breaks into neighborhoods. PCA asks whether the cloud is really stretched mostly along a few directions. t-SNE asks how to draw the cloud so nearby points still look nearby to a human.</p>",
      "bridgeForwardHtml": "<p>Later deep-learning methods also learn hidden structure, but they often do it implicitly through representation learning instead of explicit clustering or PCA alone.</p>",
      "masteryChecklist": [
        "I can explain why clustering and dimensionality reduction are different tasks.",
        "I can say exactly why normalization can change K-means results.",
        "I can explain the elbow method without pretending it gives exact truth.",
        "I can explain why PCA is linear and why t-SNE is mainly for visualization."
      ],
      "equationNotebook": [
        {
          "label": "Euclidean distance",
          "latex": "d(x, y) = \\sqrt{\\sum_i (x_i - y_i)^2}",
          "meaning": "This measures straight-line separation between two points in feature space.",
          "intuition": "If one feature has a much larger scale than the others, it dominates this distance and can distort the geometry the algorithm sees."
        },
        {
          "label": "K-means objective",
          "latex": "\\sum_i \\lVert x_i - \\mu_{c_i} \\rVert^2",
          "meaning": "K-means tries to keep every point close to the centroid of the cluster it belongs to.",
          "intuition": "This is why K-means prefers compact, roughly round clusters and can struggle with stretched or curved ones."
        },
        {
          "label": "Covariance viewpoint for PCA",
          "latex": "\\Sigma = \\frac{1}{n} X^\\top X",
          "meaning": "PCA studies the covariance structure of centered data and finds directions of maximum variance.",
          "intuition": "You can think of PCA as rotating the coordinate system so the most informative directions come first."
        }
      ],
      "workedExamples": [
        {
          "title": "Why normalization changes clustering",
          "scenarioHtml": "<p>Suppose feature A ranges from 0 to 1 and feature B ranges from 0 to 1,000,000. If we use Euclidean distance directly, feature B almost completely controls which points look close.</p>",
          "walkthroughHtml": "<p>K-means does not know which feature is semantically more important. It only sees geometry. So if the units are wildly different, the algorithm may cluster mainly by whichever feature has the largest numeric scale. Standardization rescales the problem so both features can influence the geometry more fairly.</p>",
          "searchText": "Why normalization changes clustering Suppose feature A ranges from 0 to 1 and feature B ranges from 0 to 1,000,000. If we use Euclidean distance directly, feature B almost completely controls which points look close. K-means does not know which feature is semantically more important. It only sees geometry. So if the units are wildly different, the algorithm may cluster mainly by whichever feature has the largest numeric scale. Standardization rescales the problem so both features can influence the geometry more fairly."
        },
        {
          "title": "Why PCA is not a clustering algorithm",
          "scenarioHtml": "<p>A PCA plot may show visible groups, and students often conclude that PCA found those clusters.</p>",
          "walkthroughHtml": "<p>What PCA really did was rotate and project the data into variance-maximizing directions. If groups become visible after that projection, PCA helped reveal structure, but it did not assign labels or decide memberships the way K-means or hierarchical clustering does.</p>",
          "searchText": "Why PCA is not a clustering algorithm A PCA plot may show visible groups, and students often conclude that PCA found those clusters. What PCA really did was rotate and project the data into variance-maximizing directions. If groups become visible after that projection, PCA helped reveal structure, but it did not assign labels or decide memberships the way K-means or hierarchical clustering does."
        }
      ],
      "supplementalQuestions": [
        {
          "prompt": "Why can an unsupervised method produce a useful answer even though there is no label to compare against?",
          "answer": "Because usefulness can come from revealing structure, compression, or interpretable organization in the data even without a single ground-truth target label."
        },
        {
          "prompt": "Why does K-means prefer compact clusters instead of arbitrary shapes?",
          "answer": "Because its objective is based on squared distance to a centroid, so clusters are summarized by one mean point and curved or disconnected shapes are represented poorly."
        },
        {
          "prompt": "What does a dendrogram give you that K-means does not?",
          "answer": "A dendrogram gives the full merge history across scales, so you can inspect structure at multiple cut levels rather than committing to one flat partition only."
        },
        {
          "prompt": "Why might PCA help before clustering even though PCA itself does not cluster?",
          "answer": "Because PCA can reduce noise or redundant dimensions and create a cleaner lower-dimensional representation for a later clustering method."
        },
        {
          "prompt": "Why is it dangerous to compare large empty spaces between t-SNE clusters too literally?",
          "answer": "Because t-SNE is optimized to preserve local neighborhoods, not exact global geometry, so large inter-cluster gaps in the plot can exaggerate separation."
        }
      ],
      "sections": [
        {
          "id": "unsupervised-learning-01-what-unsupervised-learning-tries-to-discover",
          "title": "4.1 What Unsupervised Learning Tries to Discover",
          "figureSrc": "figures/sections/ch04_s01_what-unsupervised-learning-tries-to-discover.png",
          "figureAlt": "Visual summary for 4.1 What Unsupervised Learning Tries to Discover",
          "html": "<p>The broad goal of unsupervised learning is to discover useful structure in a dataset. &quot;Useful structure&quot; can mean several different things. Sometimes we want to divide points into groups, as in customer segmentation or image segmentation. Sometimes we want to compress many variables into a few summary variables, as in PCA. Sometimes we want to visualize high-dimensional data in a way that helps a human analyst understand it. Sometimes we want to learn latent representations that later become inputs to a supervised model.</p>\n<p>A practical way to think about unsupervised learning is this: the data has internal organization even before labels are attached, and unsupervised methods try to make that organization visible.</p>",
          "wordCount": 112,
          "readMinutes": 1,
          "searchText": "The broad goal of unsupervised learning is to discover useful structure in a dataset. &quot;Useful structure&quot; can mean several different things. Sometimes we want to divide points into groups, as in customer segmentation or image segmentation. Sometimes we want to compress many variables into a few summary variables, as in PCA. Sometimes we want to visualize high-dimensional data in a way that helps a human analyst understand it. Sometimes we want to learn latent representations that later become inputs to a supervised model. A practical way to think about unsupervised learning is this: the data has internal organization even before labels are attached, and unsupervised methods try to make that organization visible."
        },
        {
          "id": "unsupervised-learning-02-clustering-and-dimensionality-reduction-are-different-tasks",
          "title": "4.2 Clustering and Dimensionality Reduction Are Different Tasks",
          "figureSrc": "figures/sections/ch04_s02_clustering-and-dimensionality-reduction-are-different-tasks.png",
          "figureAlt": "Visual summary for 4.2 Clustering and Dimensionality Reduction Are Different Tasks",
          "html": "<p>Students often confuse clustering and dimensionality reduction because both are studied in the same chapter and both often end with colorful plots. However, they solve different problems.</p>\n<p>Clustering asks, &quot;Which points belong together?&quot; It produces group assignments or a merge structure.</p>\n<p>Dimensionality reduction asks, &quot;How can I describe the same points with fewer coordinates?&quot; It produces a new representation of the same data, usually in fewer dimensions.</p>\n<p>These tasks often work together. For example, one may cluster data first and then use PCA to visualize the clusters. Or one may reduce dimension before clustering to remove noise and improve numerical behavior. But conceptually they are not the same thing. A strong exam answer should be able to explain this distinction clearly.</p>",
          "wordCount": 121,
          "readMinutes": 1,
          "searchText": "Students often confuse clustering and dimensionality reduction because both are studied in the same chapter and both often end with colorful plots. However, they solve different problems. Clustering asks, &quot;Which points belong together?&quot; It produces group assignments or a merge structure. Dimensionality reduction asks, &quot;How can I describe the same points with fewer coordinates?&quot; It produces a new representation of the same data, usually in fewer dimensions. These tasks often work together. For example, one may cluster data first and then use PCA to visualize the clusters. Or one may reduce dimension before clustering to remove noise and improve numerical behavior. But conceptually they are not the same thing. A strong exam answer should be able to explain this distinction clearly."
        },
        {
          "id": "unsupervised-learning-03-similarity-distance-and-the-geometry-of-data",
          "title": "4.3 Similarity, Distance, and the Geometry of Data",
          "figureSrc": "figures/sections/ch04_s03_similarity-distance-and-the-geometry-of-data.png",
          "figureAlt": "Visual summary for 4.3 Similarity, Distance, and the Geometry of Data",
          "html": "<p>Most unsupervised methods rely on some notion of similarity or distance. If two points are close in feature space, many clustering methods will prefer to place them in the same cluster. If a direction in feature space captures strong variation, PCA will consider it important. If local neighborhoods are preserved, t-SNE will consider the visualization successful.</p>\n<p>The most common distance used in this course is Euclidean distance. If \\(x\\) and \\(y\\) are two data vectors, their Euclidean distance is:</p>\n<div class=\"math-display\">\\[d(x, y) = \\sqrt{\\sum_i (x_i - y_i)^2}\\]</div>\n<p>This formula looks simple, but it has important consequences. Distance is not merely a geometric quantity; it depends on the representation of the data. If we change the feature scaling, the geometry changes. If we add noisy or irrelevant dimensions, the geometry changes. If two features carry the same information in different units, the geometry may become misleading unless the data is normalized.</p>",
          "wordCount": 149,
          "readMinutes": 1,
          "searchText": "Most unsupervised methods rely on some notion of similarity or distance. If two points are close in feature space, many clustering methods will prefer to place them in the same cluster. If a direction in feature space captures strong variation, PCA will consider it important. If local neighborhoods are preserved, t-SNE will consider the visualization successful. The most common distance used in this course is Euclidean distance. If \\(x\\) and \\(y\\) are two data vectors, their Euclidean distance is: \\[d(x, y) = \\sqrt{\\sum_i (x_i - y_i)^2}\\] This formula looks simple, but it has important consequences. Distance is not merely a geometric quantity; it depends on the representation of the data. If we change the feature scaling, the geometry changes. If we add noisy or irrelevant dimensions, the geometry changes. If two features carry the same information in different units, the geometry may become misleading unless the data is normalized."
        },
        {
          "id": "unsupervised-learning-04-why-normalization-matters",
          "title": "4.4 Why Normalization Matters",
          "figureSrc": "figures/sections/ch04_s04_why-normalization-matters.png",
          "figureAlt": "Visual summary for 4.4 Why Normalization Matters",
          "html": "<p>Suppose a dataset has two features. The first feature ranges roughly from 0 to 1. The second ranges from 0 to 1,000,000. If we compute Euclidean distance directly, then the second feature almost completely dominates the distance. The first feature may be highly informative, but numerically it becomes almost invisible.</p>\n<p>This is why normalization is central in clustering. The homework on clustering makes this concrete by comparing raw and normalized datasets and showing that cluster quality and even the chosen number of clusters may change. A good mental rule is that whenever a method depends on distance, feature scale must be examined carefully before trusting the output.</p>\n<p>Normalization can be done in different ways. Standardization using z-scores makes each feature have mean 0 and variance 1. Min-max scaling maps features into a fixed range such as <code>[0, 1]</code>. The exact choice depends on context, but the principle is the same: do not let arbitrary units distort the geometry of the space.</p>",
          "wordCount": 162,
          "readMinutes": 1,
          "searchText": "Suppose a dataset has two features. The first feature ranges roughly from 0 to 1. The second ranges from 0 to 1,000,000. If we compute Euclidean distance directly, then the second feature almost completely dominates the distance. The first feature may be highly informative, but numerically it becomes almost invisible. This is why normalization is central in clustering. The homework on clustering makes this concrete by comparing raw and normalized datasets and showing that cluster quality and even the chosen number of clusters may change. A good mental rule is that whenever a method depends on distance, feature scale must be examined carefully before trusting the output. Normalization can be done in different ways. Standardization using z-scores makes each feature have mean 0 and variance 1. Min-max scaling maps features into a fixed range such as [0, 1] . The exact choice depends on context, but the principle is the same: do not let arbitrary units distort the geometry of the space."
        },
        {
          "id": "unsupervised-learning-05-the-curse-of-dimensionality",
          "title": "4.5 The Curse of Dimensionality",
          "figureSrc": "figures/sections/ch04_s05_the-curse-of-dimensionality.png",
          "figureAlt": "Visual summary for 4.5 The Curse of Dimensionality",
          "html": "<p>As the number of dimensions grows, distance behaves less intuitively. High-dimensional spaces have a tendency to make many points look similarly far from one another. This phenomenon is one part of what is often called the curse of dimensionality. In such settings, nearest-neighbor relationships can become noisy, intuition from two-dimensional geometry breaks down, and methods that rely strongly on distance may become unstable.</p>\n<p>This is one reason dimensionality reduction methods are useful even before visualization. By compressing data into a smaller and more meaningful representation, they may improve both interpretation and downstream modeling.</p>",
          "wordCount": 93,
          "readMinutes": 1,
          "searchText": "As the number of dimensions grows, distance behaves less intuitively. High-dimensional spaces have a tendency to make many points look similarly far from one another. This phenomenon is one part of what is often called the curse of dimensionality. In such settings, nearest-neighbor relationships can become noisy, intuition from two-dimensional geometry breaks down, and methods that rely strongly on distance may become unstable. This is one reason dimensionality reduction methods are useful even before visualization. By compressing data into a smaller and more meaningful representation, they may improve both interpretation and downstream modeling."
        },
        {
          "id": "unsupervised-learning-06-clustering",
          "title": "4.6 Clustering",
          "figureSrc": "figures/sections/ch04_s06_clustering.png",
          "figureAlt": "Visual summary for 4.6 Clustering",
          "html": "<p>Clustering is the task of dividing data points into groups called clusters. Informally, points in the same cluster should be more similar to one another than to points in different clusters. The challenge is that the phrase &quot;more similar&quot; depends on a modeling assumption. Some algorithms assume clusters are compact and spherical. Others are more flexible. Some methods emphasize density, others emphasize variance, and still others emphasize connectivity.</p>\n<p>In the final-exam scope, the most important clustering methods are K-means and hierarchical agglomerative clustering.</p>",
          "wordCount": 83,
          "readMinutes": 1,
          "searchText": "Clustering is the task of dividing data points into groups called clusters. Informally, points in the same cluster should be more similar to one another than to points in different clusters. The challenge is that the phrase &quot;more similar&quot; depends on a modeling assumption. Some algorithms assume clusters are compact and spherical. Others are more flexible. Some methods emphasize density, others emphasize variance, and still others emphasize connectivity. In the final-exam scope, the most important clustering methods are K-means and hierarchical agglomerative clustering."
        },
        {
          "id": "unsupervised-learning-07-k-means-clustering",
          "title": "4.7 K-Means Clustering",
          "figureSrc": "figures/sections/ch04_s07_k-means-clustering.png",
          "figureAlt": "Visual summary for 4.7 K-Means Clustering",
          "html": "<p>K-means is one of the simplest and most widely used clustering algorithms. It assumes that the data can be partitioned into \\(k\\) clusters, where \\(k\\) is chosen in advance. Each cluster is represented by a centroid, which is simply the mean of the points assigned to that cluster.</p>\n<p>The algorithm proceeds by alternating between two steps:</p>\n<ol class=\"md-list\"><li>assign each point to the nearest centroid</li><li>recompute each centroid as the mean of the points assigned to it</li></ol>\n<p>This repeated assign-then-average procedure is often called Lloyd&#x27;s algorithm. The scikit-learn documentation explicitly describes KMeans as &quot;K-Means clustering&quot; and notes that it produces cluster centers, labels, and inertia values.</p>\n<h4>4.7.1 The Objective Function</h4>\n<p>K-means is not just a heuristic; it is optimizing a specific objective. The objective is the within-cluster sum of squared distances:</p>\n<div class=\"math-display\">\\[\\sum_i \\lVert x_i - \\mu_{c_i} \\rVert^2\\]</div>\n<p>Here \\(x_i\\) is a data point, \\(c_i\\) is the cluster assigned to that point, and <code>mu_{c_i}</code> is the centroid of that cluster. The algorithm tries to make each point close to its own cluster center.</p>\n<p>This objective explains why K-means tends to prefer compact clusters. If a cluster is stretched out, curved, or has multiple disconnected parts, one centroid may not summarize it well.</p>\n<h4>4.7.2 Why the Mean Appears</h4>\n<p>The centroid is the mean because, under squared Euclidean distance, the mean is the point that minimizes the total squared distance to all assigned samples. This is a deep and elegant fact. It means the averaging step is not arbitrary; it is exactly the correct update for the chosen objective.</p>\n<h4>4.7.3 Initialization</h4>\n<p>K-means can converge to different local minima depending on how the initial centroids are chosen. The scikit-learn documentation notes several initialization strategies, including <code>k-means++</code>, which is designed to pick better initial centers and often speeds up convergence. It also recommends multiple restarts because K-means can fall into local minima.</p>\n<p>This is an important practical point. If two students run K-means and obtain slightly different answers, this does not necessarily mean one of them made a mistake. The initialization itself may have changed the outcome.</p>\n<h4>4.7.4 Convergence</h4>\n<p>Each iteration of K-means does not increase the objective, so the algorithm will eventually stop. However, it does not guarantee the globally best solution. It guarantees only convergence to a local optimum under the chosen initialization.</p>\n<p>The scikit-learn documentation also notes that the average complexity is fast in practice, which helps explain why K-means remains one of the most popular clustering methods despite its limitations.</p>\n<h4>4.7.5 A Worked Example</h4>\n<p>Suppose we have six points in two dimensions:</p>\n<p><code>(1,2), (1,4), (1,0), (10,2), (10,4), (10,0)</code></p>\n<p>If we choose \\(k = 2\\), then one natural clustering is the left group and the right group. The centroid of the left group is <code>(1,2)</code> and the centroid of the right group is <code>(10,2)</code>. This example appears in the KMeans documentation and is useful because the groups are very clean. But exam questions may give messier examples. In those cases, you should still think in the same way: which centroid is closest, and what is the mean of the assigned points?</p>\n<h4>4.7.6 Strengths of K-Means</h4>\n<p>K-means is easy to understand, fast, and often works well on data with compact, roughly spherical clusters. It is a strong baseline and a common first method to try.</p>\n<h4>4.7.7 Weaknesses of K-Means</h4>\n<p>K-means is sensitive to outliers because the centroid is the mean. It is sensitive to feature scale because it relies on Euclidean distance. It requires \\(k\\) in advance. It may converge to a local minimum. It also assumes a cluster shape that is often too simple for real data.</p>\n<p>The scikit-learn documentation explicitly includes examples on K-means assumptions and common problems. That is a useful reminder that the algorithm should never be treated as universally reliable.</p>",
          "wordCount": 622,
          "readMinutes": 3,
          "searchText": "K-means is one of the simplest and most widely used clustering algorithms. It assumes that the data can be partitioned into \\(k\\) clusters, where \\(k\\) is chosen in advance. Each cluster is represented by a centroid, which is simply the mean of the points assigned to that cluster. The algorithm proceeds by alternating between two steps: assign each point to the nearest centroid recompute each centroid as the mean of the points assigned to it This repeated assign-then-average procedure is often called Lloyd&#x27;s algorithm. The scikit-learn documentation explicitly describes KMeans as &quot;K-Means clustering&quot; and notes that it produces cluster centers, labels, and inertia values. 4.7.1 The Objective Function K-means is not just a heuristic; it is optimizing a specific objective. The objective is the within-cluster sum of squared distances: \\[\\sum_i \\lVert x_i - \\mu_{c_i} \\rVert^2\\] Here \\(x_i\\) is a data point, \\(c_i\\) is the cluster assigned to that point, and mu_{c_i} is the centroid of that cluster. The algorithm tries to make each point close to its own cluster center. This objective explains why K-means tends to prefer compact clusters. If a cluster is stretched out, curved, or has multiple disconnected parts, one centroid may not summarize it well. 4.7.2 Why the Mean Appears The centroid is the mean because, under squared Euclidean distance, the mean is the point that minimizes the total squared distance to all assigned samples. This is a deep and elegant fact. It means the averaging step is not arbitrary; it is exactly the correct update for the chosen objective. 4.7.3 Initialization K-means can converge to different local minima depending on how the initial centroids are chosen. The scikit-learn documentation notes several initialization strategies, including k-means++ , which is designed to pick better initial centers and often speeds up convergence. It also recommends multiple restarts because K-means can fall into local minima. This is an important practical point. If two students run K-means and obtain slightly different answers, this does not necessarily mean one of them made a mistake. The initialization itself may have changed the outcome. 4.7.4 Convergence Each iteration of K-means does not increase the objective, so the algorithm will eventually stop. However, it does not guarantee the globally best solution. It guarantees only convergence to a local optimum under the chosen initialization. The scikit-learn documentation also notes that the average complexity is fast in practice, which helps explain why K-means remains one of the most popular clustering methods despite its limitations. 4.7.5 A Worked Example Suppose we have six points in two dimensions: (1,2), (1,4), (1,0), (10,2), (10,4), (10,0) If we choose \\(k = 2\\), then one natural clustering is the left group and the right group. The centroid of the left group is (1,2) and the centroid of the right group is (10,2) . This example appears in the KMeans documentation and is useful because the groups are very clean. But exam questions may give messier examples. In those cases, you should still think in the same way: which centroid is closest, and what is the mean of the assigned points? 4.7.6 Strengths of K-Means K-means is easy to understand, fast, and often works well on data with compact, roughly spherical clusters. It is a strong baseline and a common first method to try. 4.7.7 Weaknesses of K-Means K-means is sensitive to outliers because the centroid is the mean. It is sensitive to feature scale because it relies on Euclidean distance. It requires \\(k\\) in advance. It may converge to a local minimum. It also assumes a cluster shape that is often too simple for real data. The scikit-learn documentation explicitly includes examples on K-means assumptions and common problems. That is a useful reminder that the algorithm should never be treated as universally reliable."
        },
        {
          "id": "unsupervised-learning-08-choosing-the-number-of-clusters",
          "title": "4.8 Choosing the Number of Clusters",
          "figureSrc": "figures/sections/ch04_s08_choosing-the-number-of-clusters.png",
          "figureAlt": "Visual summary for 4.8 Choosing the Number of Clusters",
          "html": "<p>The lecture repeatedly uses the elbow method. To apply it, we run K-means for multiple values of \\(k\\) and plot inertia as a function of \\(k\\). Since inertia always decreases as \\(k\\) grows, we do not simply pick the smallest inertia. Instead, we look for the point where additional clusters stop giving large improvement. This bend in the curve is called the elbow.</p>\n<p>The elbow method is a heuristic. Some datasets show a clear elbow, while others do not. In the latter case, the correct intellectual response is not to pretend certainty. A better answer is to say that the evidence for a particular \\(k\\) is weak and should be supported by additional reasoning.</p>\n<p>Another internal evaluation measure is the silhouette score. Silhouette compares how close a point is to its own cluster relative to neighboring clusters. A higher score suggests better separation. Like inertia, it is informative but not absolute.</p>\n<figure class=\"md-figure\"><img src=\"figures/ch04_hierarchy_tsne.png\" alt=\"Hierarchical clustering preserves merge history in a dendrogram, while t-SNE builds a neighborhood-preserving visualization whose global spacing should be interpreted carefully.\" loading=\"lazy\" /><figcaption>Hierarchical clustering preserves merge history in a dendrogram, while t-SNE builds a neighborhood-preserving visualization whose global spacing should be interpreted carefully.</figcaption></figure>",
          "wordCount": 172,
          "readMinutes": 1,
          "searchText": "The lecture repeatedly uses the elbow method. To apply it, we run K-means for multiple values of \\(k\\) and plot inertia as a function of \\(k\\). Since inertia always decreases as \\(k\\) grows, we do not simply pick the smallest inertia. Instead, we look for the point where additional clusters stop giving large improvement. This bend in the curve is called the elbow. The elbow method is a heuristic. Some datasets show a clear elbow, while others do not. In the latter case, the correct intellectual response is not to pretend certainty. A better answer is to say that the evidence for a particular \\(k\\) is weak and should be supported by additional reasoning. Another internal evaluation measure is the silhouette score. Silhouette compares how close a point is to its own cluster relative to neighboring clusters. A higher score suggests better separation. Like inertia, it is informative but not absolute. Hierarchical clustering preserves merge history in a dendrogram, while t-SNE builds a neighborhood-preserving visualization whose global spacing should be interpreted carefully."
        },
        {
          "id": "unsupervised-learning-09-hierarchical-agglomerative-clustering",
          "title": "4.9 Hierarchical Agglomerative Clustering",
          "figureSrc": "figures/sections/ch04_s09_hierarchical-agglomerative-clustering.png",
          "figureAlt": "Visual summary for 4.9 Hierarchical Agglomerative Clustering",
          "html": "<p>Hierarchical agglomerative clustering takes a different approach. Instead of specifying centroids and moving them, the method begins with each data point as its own cluster. It then repeatedly merges the closest pair of clusters until everything becomes one large cluster.</p>\n<p>The result is not only a final grouping but also a complete history of how the merges happened. This is one of the greatest advantages of hierarchical clustering: it gives a multiscale view of structure rather than a single flat partition.</p>",
          "wordCount": 81,
          "readMinutes": 1,
          "searchText": "Hierarchical agglomerative clustering takes a different approach. Instead of specifying centroids and moving them, the method begins with each data point as its own cluster. It then repeatedly merges the closest pair of clusters until everything becomes one large cluster. The result is not only a final grouping but also a complete history of how the merges happened. This is one of the greatest advantages of hierarchical clustering: it gives a multiscale view of structure rather than a single flat partition."
        },
        {
          "id": "unsupervised-learning-10-the-dendrogram",
          "title": "4.10 The Dendrogram",
          "figureSrc": "figures/sections/ch04_s10_the-dendrogram.png",
          "figureAlt": "Visual summary for 4.10 The Dendrogram",
          "html": "<p>The merge history of hierarchical clustering is shown using a dendrogram. Each merge has a height. Lower merges indicate that the clusters were very similar when they were joined. Higher merges indicate that the algorithm had to join more dissimilar groups.</p>\n<p>When interpreting a dendrogram, we often look for a large vertical jump. Cutting the tree below that jump can produce a plausible number of clusters. But again, this is a heuristic. The dendrogram is a tool for reasoning, not a proof that one number of clusters is uniquely correct.</p>",
          "wordCount": 90,
          "readMinutes": 1,
          "searchText": "The merge history of hierarchical clustering is shown using a dendrogram. Each merge has a height. Lower merges indicate that the clusters were very similar when they were joined. Higher merges indicate that the algorithm had to join more dissimilar groups. When interpreting a dendrogram, we often look for a large vertical jump. Cutting the tree below that jump can produce a plausible number of clusters. But again, this is a heuristic. The dendrogram is a tool for reasoning, not a proof that one number of clusters is uniquely correct."
        },
        {
          "id": "unsupervised-learning-11-linkage-criteria",
          "title": "4.11 Linkage Criteria",
          "figureSrc": "figures/sections/ch04_s11_linkage-criteria.png",
          "figureAlt": "Visual summary for 4.11 Linkage Criteria",
          "html": "<p>To merge clusters, the algorithm needs a definition of distance between clusters. This is called linkage.</p>\n<p>Single linkage uses the smallest pairwise distance between points from the two clusters. It can create chaining effects, where one close bridge causes long thin structures to merge.</p>\n<p>Complete linkage uses the largest pairwise distance. This tends to create tighter clusters.</p>\n<p>Average linkage uses the average distance between all pairs across the two clusters.</p>\n<p>Ward linkage minimizes the increase in within-cluster variance when clusters are merged. The scikit-learn clustering guide explicitly notes that Ward hierarchical clustering is similar in spirit to the K-means objective because it is variance-oriented. This is an important connection: Ward linkage favors compact clusters much as K-means does.</p>\n<p>The scikit-learn clustering guide also warns that certain connectivity constraints and linkage choices can create a &quot;rich getting richer&quot; effect, especially in agglomerative clustering. This is a subtle but useful reminder that even hierarchical methods are not neutral; their design choices influence what structures become visible.</p>",
          "wordCount": 164,
          "readMinutes": 1,
          "searchText": "To merge clusters, the algorithm needs a definition of distance between clusters. This is called linkage. Single linkage uses the smallest pairwise distance between points from the two clusters. It can create chaining effects, where one close bridge causes long thin structures to merge. Complete linkage uses the largest pairwise distance. This tends to create tighter clusters. Average linkage uses the average distance between all pairs across the two clusters. Ward linkage minimizes the increase in within-cluster variance when clusters are merged. The scikit-learn clustering guide explicitly notes that Ward hierarchical clustering is similar in spirit to the K-means objective because it is variance-oriented. This is an important connection: Ward linkage favors compact clusters much as K-means does. The scikit-learn clustering guide also warns that certain connectivity constraints and linkage choices can create a &quot;rich getting richer&quot; effect, especially in agglomerative clustering. This is a subtle but useful reminder that even hierarchical methods are not neutral; their design choices influence what structures become visible."
        },
        {
          "id": "unsupervised-learning-12-k-means-and-hierarchical-clustering-compared",
          "title": "4.12 K-Means and Hierarchical Clustering Compared",
          "figureSrc": "figures/sections/ch04_s12_k-means-and-hierarchical-clustering-compared.png",
          "figureAlt": "Visual summary for 4.12 K-Means and Hierarchical Clustering Compared",
          "html": "<p>K-means is usually faster, simpler, and more directly tied to centroid-based clustering. Hierarchical clustering is often richer for exploratory analysis because it gives a full merge tree and does not require the number of clusters up front. However, hierarchical methods may be computationally heavier, and their result can depend strongly on the chosen linkage.</p>\n<p>If an exam asks which is better, the safest high-quality answer is to compare assumptions, output type, and use case rather than making an absolute judgment.</p>",
          "wordCount": 80,
          "readMinutes": 1,
          "searchText": "K-means is usually faster, simpler, and more directly tied to centroid-based clustering. Hierarchical clustering is often richer for exploratory analysis because it gives a full merge tree and does not require the number of clusters up front. However, hierarchical methods may be computationally heavier, and their result can depend strongly on the chosen linkage. If an exam asks which is better, the safest high-quality answer is to compare assumptions, output type, and use case rather than making an absolute judgment."
        },
        {
          "id": "unsupervised-learning-13-principal-component-analysis",
          "title": "4.13 Principal Component Analysis",
          "figureSrc": "figures/sections/ch04_s13_principal-component-analysis.png",
          "figureAlt": "Visual summary for 4.13 Principal Component Analysis",
          "html": "<p>Principal Component Analysis is a dimensionality reduction method. It does not cluster points. Instead, it creates new axes called principal components so that the data can be represented more compactly.</p>\n<p>The scikit-learn decomposition guide describes PCA as decomposing a multivariate dataset into successive orthogonal components that explain a maximum amount of variance. This is an excellent formal summary and worth remembering.</p>",
          "wordCount": 61,
          "readMinutes": 1,
          "searchText": "Principal Component Analysis is a dimensionality reduction method. It does not cluster points. Instead, it creates new axes called principal components so that the data can be represented more compactly. The scikit-learn decomposition guide describes PCA as decomposing a multivariate dataset into successive orthogonal components that explain a maximum amount of variance. This is an excellent formal summary and worth remembering."
        },
        {
          "id": "unsupervised-learning-14-the-geometry-of-pca",
          "title": "4.14 The Geometry of PCA",
          "figureSrc": "figures/sections/ch04_s14_the-geometry-of-pca.png",
          "figureAlt": "Visual summary for 4.14 The Geometry of PCA",
          "html": "<p>Imagine a cloud of points in two dimensions that forms a long diagonal ellipse. The original axes may be horizontal and vertical, but the data really varies most along the diagonal direction. PCA rotates the coordinate system so that the first axis points along the direction of greatest variance. This first axis is the first principal component, or PC1.</p>\n<p>The second principal component, PC2, is orthogonal to PC1 and captures the largest remaining variance. In higher dimensions, the process continues in the same way.</p>",
          "wordCount": 84,
          "readMinutes": 1,
          "searchText": "Imagine a cloud of points in two dimensions that forms a long diagonal ellipse. The original axes may be horizontal and vertical, but the data really varies most along the diagonal direction. PCA rotates the coordinate system so that the first axis points along the direction of greatest variance. This first axis is the first principal component, or PC1. The second principal component, PC2, is orthogonal to PC1 and captures the largest remaining variance. In higher dimensions, the process continues in the same way."
        },
        {
          "id": "unsupervised-learning-15-pca-through-covariance-and-eigenvectors",
          "title": "4.15 PCA Through Covariance and Eigenvectors",
          "figureSrc": "figures/sections/ch04_s15_pca-through-covariance-and-eigenvectors.png",
          "figureAlt": "Visual summary for 4.15 PCA Through Covariance and Eigenvectors",
          "html": "<p>At a slightly deeper mathematical level, PCA can be understood through the covariance matrix of the centered data. The eigenvectors of that covariance matrix define the principal directions, and the eigenvalues tell us how much variance is explained along each direction.</p>\n<p>This is why PCA is not just a visualization trick. It is a precise geometric procedure for identifying important axes of variation.</p>",
          "wordCount": 63,
          "readMinutes": 1,
          "searchText": "At a slightly deeper mathematical level, PCA can be understood through the covariance matrix of the centered data. The eigenvectors of that covariance matrix define the principal directions, and the eigenvalues tell us how much variance is explained along each direction. This is why PCA is not just a visualization trick. It is a precise geometric procedure for identifying important axes of variation."
        },
        {
          "id": "unsupervised-learning-16-pca-through-singular-value-decomposition",
          "title": "4.16 PCA Through Singular Value Decomposition",
          "figureSrc": "figures/sections/ch04_s16_pca-through-singular-value-decomposition.png",
          "figureAlt": "Visual summary for 4.16 PCA Through Singular Value Decomposition",
          "html": "<p>In practice, PCA is often computed using Singular Value Decomposition, or SVD. The scikit-learn PCA documentation explicitly states that PCA performs linear dimensionality reduction using SVD of the centered data. This is useful because SVD is numerically stable and computationally effective.</p>\n<p>The important conceptual message is that PCA finds a lower-dimensional representation that preserves variance as much as possible in a linear sense.</p>",
          "wordCount": 63,
          "readMinutes": 1,
          "searchText": "In practice, PCA is often computed using Singular Value Decomposition, or SVD. The scikit-learn PCA documentation explicitly states that PCA performs linear dimensionality reduction using SVD of the centered data. This is useful because SVD is numerically stable and computationally effective. The important conceptual message is that PCA finds a lower-dimensional representation that preserves variance as much as possible in a linear sense."
        },
        {
          "id": "unsupervised-learning-17-explained-variance",
          "title": "4.17 Explained Variance",
          "figureSrc": "figures/sections/ch04_s17_explained-variance.png",
          "figureAlt": "Visual summary for 4.17 Explained Variance",
          "html": "<p>Each principal component explains some amount of variance. The explained variance ratio tells us what fraction of the total variance is captured by each component. If the first two components explain most of the variance, then projecting to two dimensions may preserve a large amount of the information in the data.</p>\n<p>This is why PCA is often used before plotting. A 13-dimensional dataset cannot be directly visualized by a human, but a two-dimensional PCA projection may still reveal much of its broad structure.</p>",
          "wordCount": 83,
          "readMinutes": 1,
          "searchText": "Each principal component explains some amount of variance. The explained variance ratio tells us what fraction of the total variance is captured by each component. If the first two components explain most of the variance, then projecting to two dimensions may preserve a large amount of the information in the data. This is why PCA is often used before plotting. A 13-dimensional dataset cannot be directly visualized by a human, but a two-dimensional PCA projection may still reveal much of its broad structure."
        },
        {
          "id": "unsupervised-learning-18-what-pca-does-not-do",
          "title": "4.18 What PCA Does Not Do",
          "figureSrc": "figures/sections/ch04_s18_what-pca-does-not-do.png",
          "figureAlt": "Visual summary for 4.18 What PCA Does Not Do",
          "html": "<p>PCA does not use class labels. PCA does not discover clusters directly. PCA does not preserve arbitrary nonlinear manifolds. PCA finds linear directions of high variance. This is enough to be very useful, but it is essential not to overclaim what PCA is doing.</p>\n<p>A very common mistake is to look at a PCA plot with visually separate groups and then say, &quot;PCA clustered the data.&quot; That is incorrect. PCA may have made separation visible, but the grouping itself is not created by PCA.</p>",
          "wordCount": 84,
          "readMinutes": 1,
          "searchText": "PCA does not use class labels. PCA does not discover clusters directly. PCA does not preserve arbitrary nonlinear manifolds. PCA finds linear directions of high variance. This is enough to be very useful, but it is essential not to overclaim what PCA is doing. A very common mistake is to look at a PCA plot with visually separate groups and then say, &quot;PCA clustered the data.&quot; That is incorrect. PCA may have made separation visible, but the grouping itself is not created by PCA."
        },
        {
          "id": "unsupervised-learning-19-whitening-and-preprocessing",
          "title": "4.19 Whitening and Preprocessing",
          "figureSrc": "figures/sections/ch04_s19_whitening-and-preprocessing.png",
          "figureAlt": "Visual summary for 4.19 Whitening and Preprocessing",
          "html": "<p>The scikit-learn documentation notes that PCA centers the data but does not scale each feature automatically. It also offers a whitening option. Whitening makes the transformed components have unit variance, which can help downstream algorithms that assume isotropic input. This is especially relevant because the documentation explicitly mentions that whitening can be useful before K-means.</p>\n<p>This is a beautiful connection between dimensionality reduction and clustering. PCA is not only for visualization; it can sometimes improve the numerical behavior of later clustering steps.</p>",
          "wordCount": 82,
          "readMinutes": 1,
          "searchText": "The scikit-learn documentation notes that PCA centers the data but does not scale each feature automatically. It also offers a whitening option. Whitening makes the transformed components have unit variance, which can help downstream algorithms that assume isotropic input. This is especially relevant because the documentation explicitly mentions that whitening can be useful before K-means. This is a beautiful connection between dimensionality reduction and clustering. PCA is not only for visualization; it can sometimes improve the numerical behavior of later clustering steps."
        },
        {
          "id": "unsupervised-learning-20-t-distributed-stochastic-neighbor-embedding",
          "title": "4.20 t-Distributed Stochastic Neighbor Embedding",
          "figureSrc": "figures/sections/ch04_s20_t-distributed-stochastic-neighbor-embedding.png",
          "figureAlt": "Visual summary for 4.20 t-Distributed Stochastic Neighbor Embedding",
          "html": "<p>t-SNE is a nonlinear dimensionality reduction method mainly used for visualization. The original JMLR paper &quot;Visualizing Data using t-SNE&quot; presents it as a method for giving each high-dimensional point a location in a low-dimensional map so that local similarities are preserved.</p>\n<p>The important word here is local. t-SNE is built to preserve neighborhood relationships more than global geometry. If two points are near each other in the original high-dimensional space, t-SNE tries hard to place them near each other in the low-dimensional plot.</p>",
          "wordCount": 83,
          "readMinutes": 1,
          "searchText": "t-SNE is a nonlinear dimensionality reduction method mainly used for visualization. The original JMLR paper &quot;Visualizing Data using t-SNE&quot; presents it as a method for giving each high-dimensional point a location in a low-dimensional map so that local similarities are preserved. The important word here is local. t-SNE is built to preserve neighborhood relationships more than global geometry. If two points are near each other in the original high-dimensional space, t-SNE tries hard to place them near each other in the low-dimensional plot."
        },
        {
          "id": "unsupervised-learning-21-why-t-sne-often-looks-impressive",
          "title": "4.21 Why t-SNE Often Looks Impressive",
          "figureSrc": "figures/sections/ch04_s21_why-t-sne-often-looks-impressive.png",
          "figureAlt": "Visual summary for 4.21 Why t-SNE Often Looks Impressive",
          "html": "<p>t-SNE often produces visually striking plots in which apparent clusters seem to separate beautifully. This is one reason the method became so popular in exploratory analysis. It can reveal local structure that PCA does not show clearly.</p>\n<p>However, this same visual success can mislead students. A t-SNE plot is not a literal map of global geometry. The distances between large clusters may not carry direct meaning. The relative size of clusters may be misleading. Empty space between groups does not always imply strong true separation in the original space.</p>",
          "wordCount": 89,
          "readMinutes": 1,
          "searchText": "t-SNE often produces visually striking plots in which apparent clusters seem to separate beautifully. This is one reason the method became so popular in exploratory analysis. It can reveal local structure that PCA does not show clearly. However, this same visual success can mislead students. A t-SNE plot is not a literal map of global geometry. The distances between large clusters may not carry direct meaning. The relative size of clusters may be misleading. Empty space between groups does not always imply strong true separation in the original space."
        },
        {
          "id": "unsupervised-learning-22-perplexity-and-local-scale",
          "title": "4.22 Perplexity and Local Scale",
          "figureSrc": "figures/sections/ch04_s22_perplexity-and-local-scale.png",
          "figureAlt": "Visual summary for 4.22 Perplexity and Local Scale",
          "html": "<p>t-SNE has a parameter called perplexity, which roughly controls the effective neighborhood size used when defining local similarities. Small perplexity emphasizes very local structure. Larger perplexity takes a broader view.</p>\n<p>This helps explain why different t-SNE plots of the same dataset may look different. The algorithm is not just plotting fixed geometry; it is balancing local neighborhood relationships under a nonlinear objective.</p>",
          "wordCount": 62,
          "readMinutes": 1,
          "searchText": "t-SNE has a parameter called perplexity, which roughly controls the effective neighborhood size used when defining local similarities. Small perplexity emphasizes very local structure. Larger perplexity takes a broader view. This helps explain why different t-SNE plots of the same dataset may look different. The algorithm is not just plotting fixed geometry; it is balancing local neighborhood relationships under a nonlinear objective."
        },
        {
          "id": "unsupervised-learning-23-pca-and-t-sne-compared",
          "title": "4.23 PCA and t-SNE Compared",
          "figureSrc": "figures/sections/ch04_s23_pca-and-t-sne-compared.png",
          "figureAlt": "Visual summary for 4.23 PCA and t-SNE Compared",
          "html": "<p>PCA is linear, variance-based, and relatively easy to interpret mathematically. t-SNE is nonlinear, neighborhood-preserving, and mainly intended for visualization. PCA is often useful for preprocessing, compression, or downstream modeling. t-SNE is primarily useful for human inspection.</p>\n<p>A good exam answer should not merely say that t-SNE is &quot;better&quot; because it gives prettier pictures. The correct answer is that it serves a different purpose and is especially good at visualizing local structure.</p>",
          "wordCount": 71,
          "readMinutes": 1,
          "searchText": "PCA is linear, variance-based, and relatively easy to interpret mathematically. t-SNE is nonlinear, neighborhood-preserving, and mainly intended for visualization. PCA is often useful for preprocessing, compression, or downstream modeling. t-SNE is primarily useful for human inspection. A good exam answer should not merely say that t-SNE is &quot;better&quot; because it gives prettier pictures. The correct answer is that it serves a different purpose and is especially good at visualizing local structure."
        },
        {
          "id": "unsupervised-learning-24-a-practical-workflow-for-the-final",
          "title": "4.24 A Practical Workflow for the Final",
          "figureSrc": "figures/sections/ch04_s24_a-practical-workflow-for-the-final.png",
          "figureAlt": "Visual summary for 4.24 A Practical Workflow for the Final",
          "html": "<p>When analyzing an unlabeled dataset in the spirit of this course, a sensible workflow is:</p>\n<ol class=\"md-list\"><li>inspect the features and their scales</li><li>normalize when appropriate</li><li>try a simple clustering method such as K-means</li><li>evaluate cluster quality using inertia, silhouette, or visual reasoning</li><li>use hierarchical clustering if merge structure is important</li><li>use PCA for dimension reduction and broad geometric interpretation</li><li>use t-SNE only as a visualization aid and interpret it carefully</li></ol>\n<p>This workflow is valuable because it reflects how the lecture, the notebook, and practical machine learning interact. The exam is likely to reward this kind of structured reasoning.</p>",
          "wordCount": 97,
          "readMinutes": 1,
          "searchText": "When analyzing an unlabeled dataset in the spirit of this course, a sensible workflow is: inspect the features and their scales normalize when appropriate try a simple clustering method such as K-means evaluate cluster quality using inertia, silhouette, or visual reasoning use hierarchical clustering if merge structure is important use PCA for dimension reduction and broad geometric interpretation use t-SNE only as a visualization aid and interpret it carefully This workflow is valuable because it reflects how the lecture, the notebook, and practical machine learning interact. The exam is likely to reward this kind of structured reasoning."
        },
        {
          "id": "unsupervised-learning-25-common-misunderstandings",
          "title": "4.25 Common Misunderstandings",
          "figureSrc": "figures/sections/ch04_s25_common-misunderstandings.png",
          "figureAlt": "Visual summary for 4.25 Common Misunderstandings",
          "html": "<p>Students often assume that the smallest inertia gives the best K-means solution. That is false because inertia always decreases as \\(k\\) increases. Students may also say that PCA clusters the data. That is false because PCA only transforms the coordinate system. Another common mistake is to trust t-SNE too literally, as though it preserved all distances exactly. It does not. Finally, students sometimes ignore normalization even though the course materials repeatedly show that scale can dominate clustering outcomes.</p>",
          "wordCount": 78,
          "readMinutes": 1,
          "searchText": "Students often assume that the smallest inertia gives the best K-means solution. That is false because inertia always decreases as \\(k\\) increases. Students may also say that PCA clusters the data. That is false because PCA only transforms the coordinate system. Another common mistake is to trust t-SNE too literally, as though it preserved all distances exactly. It does not. Finally, students sometimes ignore normalization even though the course materials repeatedly show that scale can dominate clustering outcomes."
        },
        {
          "id": "unsupervised-learning-26-summary",
          "title": "4.26 Summary",
          "figureSrc": "figures/sections/ch04_s26_summary.png",
          "figureAlt": "Visual summary for 4.26 Summary",
          "html": "<p>Unsupervised learning seeks structure without labels. In the final-exam scope, the key tools are K-means, hierarchical agglomerative clustering, PCA, and t-SNE. K-means partitions data using centroids and minimizes within-cluster squared distance. Hierarchical clustering builds a merge tree summarized by a dendrogram. PCA finds orthogonal directions of maximum variance using linear algebra, while t-SNE produces nonlinear visualizations that preserve local neighborhoods. The central lessons of the chapter are that geometry matters, scale matters, assumptions matter, and interpretation matters.</p>",
          "wordCount": 77,
          "readMinutes": 1,
          "searchText": "Unsupervised learning seeks structure without labels. In the final-exam scope, the key tools are K-means, hierarchical agglomerative clustering, PCA, and t-SNE. K-means partitions data using centroids and minimizes within-cluster squared distance. Hierarchical clustering builds a merge tree summarized by a dendrogram. PCA finds orthogonal directions of maximum variance using linear algebra, while t-SNE produces nonlinear visualizations that preserve local neighborhoods. The central lessons of the chapter are that geometry matters, scale matters, assumptions matter, and interpretation matters."
        },
        {
          "id": "unsupervised-learning-27-primary-references-used-to-expand-this-chapter",
          "title": "4.27 Primary References Used to Expand This Chapter",
          "figureSrc": "figures/sections/ch04_s27_primary-references-used-to-expand-this-chapter.png",
          "figureAlt": "Visual summary for 4.27 Primary References Used to Expand This Chapter",
          "html": "<ul class=\"md-list\"><li>scikit-learn clustering user guide: <a href=\"https://scikit-learn.org/stable/modules/clustering.html\" target=\"_blank\" rel=\"noreferrer\">https://scikit-learn.org/stable/modules/clustering.html</a></li><li>scikit-learn KMeans documentation: <a href=\"https://scikit-learn.org/1.5/modules/generated/sklearn.cluster.KMeans.html\" target=\"_blank\" rel=\"noreferrer\">https://scikit-learn.org/1.5/modules/generated/sklearn.cluster.KMeans.html</a></li><li>scikit-learn PCA documentation and decomposition guide: <a href=\"https://scikit-learn.org/1.5/modules/decomposition.html\" target=\"_blank\" rel=\"noreferrer\">https://scikit-learn.org/1.5/modules/decomposition.html</a></li><li>scikit-learn TSNE documentation: <a href=\"https://scikit-learn.org/stable/modules/generated/sklearn.manifold.TSNE.html\" target=\"_blank\" rel=\"noreferrer\">https://scikit-learn.org/stable/modules/generated/sklearn.manifold.TSNE.html</a></li><li>van der Maaten, L. and Hinton, G. &quot;Visualizing Data using t-SNE&quot;, JMLR 2008: <a href=\"https://www.jmlr.org/papers/v9/vandermaaten08a.html\" target=\"_blank\" rel=\"noreferrer\">https://www.jmlr.org/papers/v9/vandermaaten08a.html</a></li></ul>",
          "wordCount": 34,
          "readMinutes": 1,
          "searchText": "scikit-learn clustering user guide: https://scikit-learn.org/stable/modules/clustering.html scikit-learn KMeans documentation: https://scikit-learn.org/1.5/modules/generated/sklearn.cluster.KMeans.html scikit-learn PCA documentation and decomposition guide: https://scikit-learn.org/1.5/modules/decomposition.html scikit-learn TSNE documentation: https://scikit-learn.org/stable/modules/generated/sklearn.manifold.TSNE.html van der Maaten, L. and Hinton, G. &quot;Visualizing Data using t-SNE&quot;, JMLR 2008: https://www.jmlr.org/papers/v9/vandermaaten08a.html"
        }
      ],
      "wordCount": 3802,
      "sectionCount": 27,
      "readMinutes": 21,
      "searchText": "Unsupervised learning studies data without using explicit target labels. In supervised learning, the training data tells us what the correct answer is for each example. In unsupervised learning, the data gives us only the observations themselves. We are asked to find structure, organization, regularity, or lower-dimensional patterns hidden inside that data. This makes unsupervised learning intellectually attractive because it often feels closer to scientific discovery than to ordinary classification. At the same time, it is more ambiguous, because there is often no single perfect answer to compare against. In this chapter, the main topics are clustering and dimensionality reduction. The specific methods emphasized by the course are K-means clustering, hierarchical agglomerative clustering, Principal Component Analysis (PCA), and t-distributed Stochastic Neighbor Embedding (t-SNE). The lecture slides and homework use these methods for practical data analysis, but to understand them deeply it is useful to step back and study the ideas beneath them: similarity, distance, geometry, variance, and representation. Clustering and dimensionality reduction answer different questions: clusters group nearby points, while PCA rotates the coordinate system to keep the most informative directions. The broad goal of unsupervised learning is to discover useful structure in a dataset. &quot;Useful structure&quot; can mean several different things. Sometimes we want to divide points into groups, as in customer segmentation or image segmentation. Sometimes we want to compress many variables into a few summary variables, as in PCA. Sometimes we want to visualize high-dimensional data in a way that helps a human analyst understand it. Sometimes we want to learn latent representations that later become inputs to a supervised model. A practical way to think about unsupervised learning is this: the data has internal organization even before labels are attached, and unsupervised methods try to make that organization visible. Students often confuse clustering and dimensionality reduction because both are studied in the same chapter and both often end with colorful plots. However, they solve different problems. Clustering asks, &quot;Which points belong together?&quot; It produces group assignments or a merge structure. Dimensionality reduction asks, &quot;How can I describe the same points with fewer coordinates?&quot; It produces a new representation of the same data, usually in fewer dimensions. These tasks often work together. For example, one may cluster data first and then use PCA to visualize the clusters. Or one may reduce dimension before clustering to remove noise and improve numerical behavior. But conceptually they are not the same thing. A strong exam answer should be able to explain this distinction clearly. Most unsupervised methods rely on some notion of similarity or distance. If two points are close in feature space, many clustering methods will prefer to place them in the same cluster. If a direction in feature space captures strong variation, PCA will consider it important. If local neighborhoods are preserved, t-SNE will consider the visualization successful. The most common distance used in this course is Euclidean distance. If \\(x\\) and \\(y\\) are two data vectors, their Euclidean distance is: \\[d(x, y) = \\sqrt{\\sum_i (x_i - y_i)^2}\\] This formula looks simple, but it has important consequences. Distance is not merely a geometric quantity; it depends on the representation of the data. If we change the feature scaling, the geometry changes. If we add noisy or irrelevant dimensions, the geometry changes. If two features carry the same information in different units, the geometry may become misleading unless the data is normalized. Suppose a dataset has two features. The first feature ranges roughly from 0 to 1. The second ranges from 0 to 1,000,000. If we compute Euclidean distance directly, then the second feature almost completely dominates the distance. The first feature may be highly informative, but numerically it becomes almost invisible. This is why normalization is central in clustering. The homework on clustering makes this concrete by comparing raw and normalized datasets and showing that cluster quality and even the chosen number of clusters may change. A good mental rule is that whenever a method depends on distance, feature scale must be examined carefully before trusting the output. Normalization can be done in different ways. Standardization using z-scores makes each feature have mean 0 and variance 1. Min-max scaling maps features into a fixed range such as [0, 1] . The exact choice depends on context, but the principle is the same: do not let arbitrary units distort the geometry of the space. As the number of dimensions grows, distance behaves less intuitively. High-dimensional spaces have a tendency to make many points look similarly far from one another. This phenomenon is one part of what is often called the curse of dimensionality. In such settings, nearest-neighbor relationships can become noisy, intuition from two-dimensional geometry breaks down, and methods that rely strongly on distance may become unstable. This is one reason dimensionality reduction methods are useful even before visualization. By compressing data into a smaller and more meaningful representation, they may improve both interpretation and downstream modeling. Clustering is the task of dividing data points into groups called clusters. Informally, points in the same cluster should be more similar to one another than to points in different clusters. The challenge is that the phrase &quot;more similar&quot; depends on a modeling assumption. Some algorithms assume clusters are compact and spherical. Others are more flexible. Some methods emphasize density, others emphasize variance, and still others emphasize connectivity. In the final-exam scope, the most important clustering methods are K-means and hierarchical agglomerative clustering. K-means is one of the simplest and most widely used clustering algorithms. It assumes that the data can be partitioned into \\(k\\) clusters, where \\(k\\) is chosen in advance. Each cluster is represented by a centroid, which is simply the mean of the points assigned to that cluster. The algorithm proceeds by alternating between two steps: assign each point to the nearest centroid recompute each centroid as the mean of the points assigned to it This repeated assign-then-average procedure is often called Lloyd&#x27;s algorithm. The scikit-learn documentation explicitly describes KMeans as &quot;K-Means clustering&quot; and notes that it produces cluster centers, labels, and inertia values. 4.7.1 The Objective Function K-means is not just a heuristic; it is optimizing a specific objective. The objective is the within-cluster sum of squared distances: \\[\\sum_i \\lVert x_i - \\mu_{c_i} \\rVert^2\\] Here \\(x_i\\) is a data point, \\(c_i\\) is the cluster assigned to that point, and mu_{c_i} is the centroid of that cluster. The algorithm tries to make each point close to its own cluster center. This objective explains why K-means tends to prefer compact clusters. If a cluster is stretched out, curved, or has multiple disconnected parts, one centroid may not summarize it well. 4.7.2 Why the Mean Appears The centroid is the mean because, under squared Euclidean distance, the mean is the point that minimizes the total squared distance to all assigned samples. This is a deep and elegant fact. It means the averaging step is not arbitrary; it is exactly the correct update for the chosen objective. 4.7.3 Initialization K-means can converge to different local minima depending on how the initial centroids are chosen. The scikit-learn documentation notes several initialization strategies, including k-means++ , which is designed to pick better initial centers and often speeds up convergence. It also recommends multiple restarts because K-means can fall into local minima. This is an important practical point. If two students run K-means and obtain slightly different answers, this does not necessarily mean one of them made a mistake. The initialization itself may have changed the outcome. 4.7.4 Convergence Each iteration of K-means does not increase the objective, so the algorithm will eventually stop. However, it does not guarantee the globally best solution. It guarantees only convergence to a local optimum under the chosen initialization. The scikit-learn documentation also notes that the average complexity is fast in practice, which helps explain why K-means remains one of the most popular clustering methods despite its limitations. 4.7.5 A Worked Example Suppose we have six points in two dimensions: (1,2), (1,4), (1,0), (10,2), (10,4), (10,0) If we choose \\(k = 2\\), then one natural clustering is the left group and the right group. The centroid of the left group is (1,2) and the centroid of the right group is (10,2) . This example appears in the KMeans documentation and is useful because the groups are very clean. But exam questions may give messier examples. In those cases, you should still think in the same way: which centroid is closest, and what is the mean of the assigned points? 4.7.6 Strengths of K-Means K-means is easy to understand, fast, and often works well on data with compact, roughly spherical clusters. It is a strong baseline and a common first method to try. 4.7.7 Weaknesses of K-Means K-means is sensitive to outliers because the centroid is the mean. It is sensitive to feature scale because it relies on Euclidean distance. It requires \\(k\\) in advance. It may converge to a local minimum. It also assumes a cluster shape that is often too simple for real data. The scikit-learn documentation explicitly includes examples on K-means assumptions and common problems. That is a useful reminder that the algorithm should never be treated as universally reliable. The lecture repeatedly uses the elbow method. To apply it, we run K-means for multiple values of \\(k\\) and plot inertia as a function of \\(k\\). Since inertia always decreases as \\(k\\) grows, we do not simply pick the smallest inertia. Instead, we look for the point where additional clusters stop giving large improvement. This bend in the curve is called the elbow. The elbow method is a heuristic. Some datasets show a clear elbow, while others do not. In the latter case, the correct intellectual response is not to pretend certainty. A better answer is to say that the evidence for a particular \\(k\\) is weak and should be supported by additional reasoning. Another internal evaluation measure is the silhouette score. Silhouette compares how close a point is to its own cluster relative to neighboring clusters. A higher score suggests better separation. Like inertia, it is informative but not absolute. Hierarchical clustering preserves merge history in a dendrogram, while t-SNE builds a neighborhood-preserving visualization whose global spacing should be interpreted carefully. Hierarchical agglomerative clustering takes a different approach. Instead of specifying centroids and moving them, the method begins with each data point as its own cluster. It then repeatedly merges the closest pair of clusters until everything becomes one large cluster. The result is not only a final grouping but also a complete history of how the merges happened. This is one of the greatest advantages of hierarchical clustering: it gives a multiscale view of structure rather than a single flat partition. The merge history of hierarchical clustering is shown using a dendrogram. Each merge has a height. Lower merges indicate that the clusters were very similar when they were joined. Higher merges indicate that the algorithm had to join more dissimilar groups. When interpreting a dendrogram, we often look for a large vertical jump. Cutting the tree below that jump can produce a plausible number of clusters. But again, this is a heuristic. The dendrogram is a tool for reasoning, not a proof that one number of clusters is uniquely correct. To merge clusters, the algorithm needs a definition of distance between clusters. This is called linkage. Single linkage uses the smallest pairwise distance between points from the two clusters. It can create chaining effects, where one close bridge causes long thin structures to merge. Complete linkage uses the largest pairwise distance. This tends to create tighter clusters. Average linkage uses the average distance between all pairs across the two clusters. Ward linkage minimizes the increase in within-cluster variance when clusters are merged. The scikit-learn clustering guide explicitly notes that Ward hierarchical clustering is similar in spirit to the K-means objective because it is variance-oriented. This is an important connection: Ward linkage favors compact clusters much as K-means does. The scikit-learn clustering guide also warns that certain connectivity constraints and linkage choices can create a &quot;rich getting richer&quot; effect, especially in agglomerative clustering. This is a subtle but useful reminder that even hierarchical methods are not neutral; their design choices influence what structures become visible. K-means is usually faster, simpler, and more directly tied to centroid-based clustering. Hierarchical clustering is often richer for exploratory analysis because it gives a full merge tree and does not require the number of clusters up front. However, hierarchical methods may be computationally heavier, and their result can depend strongly on the chosen linkage. If an exam asks which is better, the safest high-quality answer is to compare assumptions, output type, and use case rather than making an absolute judgment. Principal Component Analysis is a dimensionality reduction method. It does not cluster points. Instead, it creates new axes called principal components so that the data can be represented more compactly. The scikit-learn decomposition guide describes PCA as decomposing a multivariate dataset into successive orthogonal components that explain a maximum amount of variance. This is an excellent formal summary and worth remembering. Imagine a cloud of points in two dimensions that forms a long diagonal ellipse. The original axes may be horizontal and vertical, but the data really varies most along the diagonal direction. PCA rotates the coordinate system so that the first axis points along the direction of greatest variance. This first axis is the first principal component, or PC1. The second principal component, PC2, is orthogonal to PC1 and captures the largest remaining variance. In higher dimensions, the process continues in the same way. At a slightly deeper mathematical level, PCA can be understood through the covariance matrix of the centered data. The eigenvectors of that covariance matrix define the principal directions, and the eigenvalues tell us how much variance is explained along each direction. This is why PCA is not just a visualization trick. It is a precise geometric procedure for identifying important axes of variation. In practice, PCA is often computed using Singular Value Decomposition, or SVD. The scikit-learn PCA documentation explicitly states that PCA performs linear dimensionality reduction using SVD of the centered data. This is useful because SVD is numerically stable and computationally effective. The important conceptual message is that PCA finds a lower-dimensional representation that preserves variance as much as possible in a linear sense. Each principal component explains some amount of variance. The explained variance ratio tells us what fraction of the total variance is captured by each component. If the first two components explain most of the variance, then projecting to two dimensions may preserve a large amount of the information in the data. This is why PCA is often used before plotting. A 13-dimensional dataset cannot be directly visualized by a human, but a two-dimensional PCA projection may still reveal much of its broad structure. PCA does not use class labels. PCA does not discover clusters directly. PCA does not preserve arbitrary nonlinear manifolds. PCA finds linear directions of high variance. This is enough to be very useful, but it is essential not to overclaim what PCA is doing. A very common mistake is to look at a PCA plot with visually separate groups and then say, &quot;PCA clustered the data.&quot; That is incorrect. PCA may have made separation visible, but the grouping itself is not created by PCA. The scikit-learn documentation notes that PCA centers the data but does not scale each feature automatically. It also offers a whitening option. Whitening makes the transformed components have unit variance, which can help downstream algorithms that assume isotropic input. This is especially relevant because the documentation explicitly mentions that whitening can be useful before K-means. This is a beautiful connection between dimensionality reduction and clustering. PCA is not only for visualization; it can sometimes improve the numerical behavior of later clustering steps. t-SNE is a nonlinear dimensionality reduction method mainly used for visualization. The original JMLR paper &quot;Visualizing Data using t-SNE&quot; presents it as a method for giving each high-dimensional point a location in a low-dimensional map so that local similarities are preserved. The important word here is local. t-SNE is built to preserve neighborhood relationships more than global geometry. If two points are near each other in the original high-dimensional space, t-SNE tries hard to place them near each other in the low-dimensional plot. t-SNE often produces visually striking plots in which apparent clusters seem to separate beautifully. This is one reason the method became so popular in exploratory analysis. It can reveal local structure that PCA does not show clearly. However, this same visual success can mislead students. A t-SNE plot is not a literal map of global geometry. The distances between large clusters may not carry direct meaning. The relative size of clusters may be misleading. Empty space between groups does not always imply strong true separation in the original space. t-SNE has a parameter called perplexity, which roughly controls the effective neighborhood size used when defining local similarities. Small perplexity emphasizes very local structure. Larger perplexity takes a broader view. This helps explain why different t-SNE plots of the same dataset may look different. The algorithm is not just plotting fixed geometry; it is balancing local neighborhood relationships under a nonlinear objective. PCA is linear, variance-based, and relatively easy to interpret mathematically. t-SNE is nonlinear, neighborhood-preserving, and mainly intended for visualization. PCA is often useful for preprocessing, compression, or downstream modeling. t-SNE is primarily useful for human inspection. A good exam answer should not merely say that t-SNE is &quot;better&quot; because it gives prettier pictures. The correct answer is that it serves a different purpose and is especially good at visualizing local structure. When analyzing an unlabeled dataset in the spirit of this course, a sensible workflow is: inspect the features and their scales normalize when appropriate try a simple clustering method such as K-means evaluate cluster quality using inertia, silhouette, or visual reasoning use hierarchical clustering if merge structure is important use PCA for dimension reduction and broad geometric interpretation use t-SNE only as a visualization aid and interpret it carefully This workflow is valuable because it reflects how the lecture, the notebook, and practical machine learning interact. The exam is likely to reward this kind of structured reasoning. Students often assume that the smallest inertia gives the best K-means solution. That is false because inertia always decreases as \\(k\\) increases. Students may also say that PCA clusters the data. That is false because PCA only transforms the coordinate system. Another common mistake is to trust t-SNE too literally, as though it preserved all distances exactly. It does not. Finally, students sometimes ignore normalization even though the course materials repeatedly show that scale can dominate clustering outcomes. Unsupervised learning seeks structure without labels. In the final-exam scope, the key tools are K-means, hierarchical agglomerative clustering, PCA, and t-SNE. K-means partitions data using centroids and minimizes within-cluster squared distance. Hierarchical clustering builds a merge tree summarized by a dendrogram. PCA finds orthogonal directions of maximum variance using linear algebra, while t-SNE produces nonlinear visualizations that preserve local neighborhoods. The central lessons of the chapter are that geometry matters, scale matters, assumptions matter, and interpretation matters. scikit-learn clustering user guide: https://scikit-learn.org/stable/modules/clustering.html scikit-learn KMeans documentation: https://scikit-learn.org/1.5/modules/generated/sklearn.cluster.KMeans.html scikit-learn PCA documentation and decomposition guide: https://scikit-learn.org/1.5/modules/decomposition.html scikit-learn TSNE documentation: https://scikit-learn.org/stable/modules/generated/sklearn.manifold.TSNE.html van der Maaten, L. and Hinton, G. &quot;Visualizing Data using t-SNE&quot;, JMLR 2008: https://www.jmlr.org/papers/v9/vandermaaten08a.html Unsupervised learning is what we do when the data exists but no one hands us the answers. We are trying to notice shape, neighborhoods, compression, and hidden structure before labels tell us what to care about. Imagine a cloud of points floating in space. Clustering asks whether the cloud naturally breaks into neighborhoods. PCA asks whether the cloud is really stretched mostly along a few directions. t-SNE asks how to draw the cloud so nearby points still look nearby to a human. Later deep-learning methods also learn hidden structure, but they often do it implicitly through representation learning instead of explicit clustering or PCA alone. I can explain why clustering and dimensionality reduction are different tasks. I can say exactly why normalization can change K-means results. I can explain the elbow method without pretending it gives exact truth. I can explain why PCA is linear and why t-SNE is mainly for visualization. Euclidean distance This measures straight-line separation between two points in feature space. If one feature has a much larger scale than the others, it dominates this distance and can distort the geometry the algorithm sees. K-means objective K-means tries to keep every point close to the centroid of the cluster it belongs to. This is why K-means prefers compact, roughly round clusters and can struggle with stretched or curved ones. Covariance viewpoint for PCA PCA studies the covariance structure of centered data and finds directions of maximum variance. You can think of PCA as rotating the coordinate system so the most informative directions come first. Why normalization changes clustering Suppose feature A ranges from 0 to 1 and feature B ranges from 0 to 1,000,000. If we use Euclidean distance directly, feature B almost completely controls which points look close. K-means does not know which feature is semantically more important. It only sees geometry. So if the units are wildly different, the algorithm may cluster mainly by whichever feature has the largest numeric scale. Standardization rescales the problem so both features can influence the geometry more fairly. Why PCA is not a clustering algorithm A PCA plot may show visible groups, and students often conclude that PCA found those clusters. What PCA really did was rotate and project the data into variance-maximizing directions. If groups become visible after that projection, PCA helped reveal structure, but it did not assign labels or decide memberships the way K-means or hierarchical clustering does. Why can an unsupervised method produce a useful answer even though there is no label to compare against? Because usefulness can come from revealing structure, compression, or interpretable organization in the data even without a single ground-truth target label. Why does K-means prefer compact clusters instead of arbitrary shapes? Because its objective is based on squared distance to a centroid, so clusters are summarized by one mean point and curved or disconnected shapes are represented poorly. What does a dendrogram give you that K-means does not? A dendrogram gives the full merge history across scales, so you can inspect structure at multiple cut levels rather than committing to one flat partition only. Why might PCA help before clustering even though PCA itself does not cluster? Because PCA can reduce noise or redundant dimensions and create a cleaner lower-dimensional representation for a later clustering method. Why is it dangerous to compare large empty spaces between t-SNE clusters too literally? Because t-SNE is optimized to preserve local neighborhoods, not exact global geometry, so large inter-cluster gaps in the plot can exaggerate separation."
    },
    {
      "chapter": 5,
      "slug": "neural-networks-foundations",
      "title": "5 Neural Networks 1",
      "shortTitle": "NN Foundations",
      "badge": "Chapter 5",
      "summary": "Layers, activations, losses, optimization, backpropagation, and regularization.",
      "goals": [
        "Understand why nonlinearity is essential.",
        "Match output layers and loss functions to task type.",
        "Explain how training works from forward pass to backpropagation."
      ],
      "traps": [
        "Forgetting that stacked linear layers still collapse to a linear model.",
        "Mixing up cross-entropy and MSE.",
        "Talking about overfitting without mentioning validation behavior."
      ],
      "formulas": [
        "Layer: z = Wx + b",
        "Activation: a = f(z)",
        "Gradient descent: theta <- theta - eta * grad(L)"
      ],
      "starterQuestions": [
        "Why does depth without nonlinearity not really help?",
        "Why is rainfall prediction a regression problem rather than classification?",
        "What exactly is backpropagation doing?"
      ],
      "introHtml": "<p>Neural networks became important because many real-world tasks cannot be solved well by simple linear models. A linear classifier can separate classes only with a linear boundary. But many useful problems require complicated nonlinear boundaries or complicated functional relationships between inputs and outputs. The first neural-network chapter in this course establishes the foundation needed to understand deep learning: layers, activations, output design, loss functions, optimization, backpropagation, overfitting, and regularization.</p>\n<p>This chapter is essential because all later topics, including convolutional networks, sequence models, and generative AI, inherit these basic ideas.</p>\n<figure class=\"md-figure\"><img src=\"figures/ch05_training_loop.png\" alt=\"Neural-network training is a repeated loop: take a mini-batch, run a forward pass, compute a loss, backpropagate gradients, and update the weights.\" loading=\"lazy\" /><figcaption>Neural-network training is a repeated loop: take a mini-batch, run a forward pass, compute a loss, backpropagate gradients, and update the weights.</figcaption></figure>",
      "plainEnglishHtml": "<p>A neural network is a stack of learnable transformations. Each layer reshapes the representation a little, and nonlinear activations prevent the whole system from collapsing back into one simple linear rule.</p>",
      "mentalModelHtml": "<p>Think of each hidden layer as a translator that rewrites the input into a more useful internal language. Training is the repeated process of adjusting those translators so the final output makes fewer mistakes.</p>",
      "bridgeForwardHtml": "<p>CNNs, sequence models, and generative AI all inherit this foundation. Once you understand activations, losses, optimization, and generalization, later architectures become variations on these themes.</p>",
      "masteryChecklist": [
        "I can explain why stacked linear layers still behave linearly.",
        "I can match classification to softmax and cross-entropy, and regression to linear output and MSE.",
        "I can describe the forward pass and backward pass in plain language.",
        "I can distinguish underfitting, overfitting, validation, and test sets clearly."
      ],
      "equationNotebook": [
        {
          "label": "Affine layer",
          "latex": "z = Wx + b",
          "meaning": "A dense layer first computes a weighted sum plus a bias.",
          "intuition": "By itself this is only an affine transformation. The extra expressive power comes from what happens after it."
        },
        {
          "label": "Activation step",
          "latex": "a = f(z)",
          "meaning": "The activation applies a nonlinearity to the pre-activation vector.",
          "intuition": "Without this step, several layers in a row would still collapse into one linear transformation."
        },
        {
          "label": "Gradient descent update",
          "latex": "\\theta \\leftarrow \\theta - \\eta \\nabla L(\\theta)",
          "meaning": "Parameters move in the direction that locally reduces the loss.",
          "intuition": "The learning rate \\(\\eta\\) controls how aggressive the step is. Too small is slow; too large can bounce or diverge."
        },
        {
          "label": "Mean squared error",
          "latex": "\\mathrm{MSE} = \\frac{1}{n}\\sum_i (\\hat{y}_i - y_i)^2",
          "meaning": "MSE averages squared prediction error for regression targets.",
          "intuition": "Large mistakes are punished more heavily than small mistakes, which is useful when numeric error size matters."
        }
      ],
      "workedExamples": [
        {
          "title": "Why nonlinearity is the turning point",
          "scenarioHtml": "<p>Suppose you stack two layers but remove the activation function between them.</p>",
          "walkthroughHtml": "<p>Then the first layer computes \\(W_1x + b_1\\) and the second computes \\(W_2(W_1x + b_1) + b_2\\). Algebraically this is still just one affine transformation. So depth only starts to matter when nonlinear activations break that collapse.</p>",
          "searchText": "Why nonlinearity is the turning point Suppose you stack two layers but remove the activation function between them. Then the first layer computes \\(W_1x + b_1\\) and the second computes \\(W_2(W_1x + b_1) + b_2\\). Algebraically this is still just one affine transformation. So depth only starts to matter when nonlinear activations break that collapse."
        },
        {
          "title": "Why rainfall prediction should keep a linear output",
          "scenarioHtml": "<p>Rainfall amount is continuous, and you may want the model to output values larger than 1 or even near zero without clipping.</p>",
          "walkthroughHtml": "<p>A sigmoid would squash outputs into \\([0, 1]\\), and a ReLU could create unintended behavior at the final layer. A linear output plus MSE matches the structure of a continuous regression target much better.</p>",
          "searchText": "Why rainfall prediction should keep a linear output Rainfall amount is continuous, and you may want the model to output values larger than 1 or even near zero without clipping. A sigmoid would squash outputs into \\([0, 1]\\), and a ReLU could create unintended behavior at the final layer. A linear output plus MSE matches the structure of a continuous regression target much better."
        }
      ],
      "supplementalQuestions": [
        {
          "prompt": "Why is a hidden layer called hidden rather than magical?",
          "answer": "Because it is simply an internal representation layer whose activations are not the final outputs. It is learned, but it still follows explicit algebraic operations."
        },
        {
          "prompt": "What does backpropagation actually compute?",
          "answer": "It efficiently computes how changing each parameter would change the loss, using the chain rule through the network's layered structure."
        },
        {
          "prompt": "Why is low training loss not enough to claim success?",
          "answer": "Because the real goal is generalization. A model can memorize training data and still perform poorly on validation or test data."
        },
        {
          "prompt": "Why can learning-rate scheduling help even if the architecture stays the same?",
          "answer": "Because optimization behavior changes during training. Larger steps help early movement, while smaller steps often help late refinement."
        },
        {
          "prompt": "Why is dropout considered regularization instead of ordinary architecture?",
          "answer": "Because its main role is to reduce over-reliance on specific units and improve generalization rather than to change the function class in a deterministic way."
        }
      ],
      "sections": [
        {
          "id": "neural-networks-foundations-01-from-the-perceptron-to-the-deep-network",
          "title": "5.1 From the Perceptron to the Deep Network",
          "figureSrc": "figures/sections/ch05_s01_from-the-perceptron-to-the-deep-network.png",
          "figureAlt": "Visual summary for 5.1 From the Perceptron to the Deep Network",
          "html": "<p>A neuron in a feedforward network computes a weighted sum of its inputs and then applies an activation function. In a simple linear model, the output may be written as:</p>\n<div class=\"math-display\">\\[y = w^T x + b\\]</div>\n<p>where \\(x\\) is the input vector, \\(w\\) is the weight vector, and \\(b\\) is a bias term. This is already useful, but it is only linear.</p>\n<p>A neural network stacks many such transformations. If the network has hidden layers, then the output of one layer becomes the input to the next. The network therefore composes simple functions into a more complicated function. This compositional structure is one of the main reasons deep learning is powerful.</p>",
          "wordCount": 111,
          "readMinutes": 1,
          "searchText": "A neuron in a feedforward network computes a weighted sum of its inputs and then applies an activation function. In a simple linear model, the output may be written as: \\[y = w^T x + b\\] where \\(x\\) is the input vector, \\(w\\) is the weight vector, and \\(b\\) is a bias term. This is already useful, but it is only linear. A neural network stacks many such transformations. If the network has hidden layers, then the output of one layer becomes the input to the next. The network therefore composes simple functions into a more complicated function. This compositional structure is one of the main reasons deep learning is powerful."
        },
        {
          "id": "neural-networks-foundations-02-matrix-notation-and-layer-computation",
          "title": "5.2 Matrix Notation and Layer Computation",
          "figureSrc": "figures/sections/ch05_s02_matrix-notation-and-layer-computation.png",
          "figureAlt": "Visual summary for 5.2 Matrix Notation and Layer Computation",
          "html": "<p>If a layer receives an input vector \\(x\\), then a standard dense layer computes:</p>\n<div class=\"math-display\">\\[z = Wx + b\\]</div>\n<p>where \\(W\\) is a matrix and \\(b\\) is a bias vector. Then the layer applies an activation function:</p>\n<div class=\"math-display\">\\[a = f(z)\\]</div>\n<p>The vector \\(z\\) is sometimes called the pre-activation, and \\(a\\) is the post-activation. This pattern repeats from layer to layer until the final output is produced.</p>\n<p>The use of matrix notation is not cosmetic. It makes clear that a whole layer is just a learnable affine transformation followed by a nonlinearity.</p>",
          "wordCount": 91,
          "readMinutes": 1,
          "searchText": "If a layer receives an input vector \\(x\\), then a standard dense layer computes: \\[z = Wx + b\\] where \\(W\\) is a matrix and \\(b\\) is a bias vector. Then the layer applies an activation function: \\[a = f(z)\\] The vector \\(z\\) is sometimes called the pre-activation, and \\(a\\) is the post-activation. This pattern repeats from layer to layer until the final output is produced. The use of matrix notation is not cosmetic. It makes clear that a whole layer is just a learnable affine transformation followed by a nonlinearity."
        },
        {
          "id": "neural-networks-foundations-03-why-nonlinearity-is-necessary",
          "title": "5.3 Why Nonlinearity Is Necessary",
          "figureSrc": "figures/sections/ch05_s03_why-nonlinearity-is-necessary.png",
          "figureAlt": "Visual summary for 5.3 Why Nonlinearity Is Necessary",
          "html": "<p>If we stack several layers but use no nonlinear activation functions, then the network collapses mathematically into a single linear transformation. That means depth alone would provide no extra expressive power. This is one of the most important conceptual points in neural networks.</p>\n<p>Nonlinear activations are what allow deep networks to represent curved boundaries, interaction effects, and hierarchical feature composition. Without nonlinearity, a deep network is only a complicated way to write a linear model.</p>",
          "wordCount": 75,
          "readMinutes": 1,
          "searchText": "If we stack several layers but use no nonlinear activation functions, then the network collapses mathematically into a single linear transformation. That means depth alone would provide no extra expressive power. This is one of the most important conceptual points in neural networks. Nonlinear activations are what allow deep networks to represent curved boundaries, interaction effects, and hierarchical feature composition. Without nonlinearity, a deep network is only a complicated way to write a linear model."
        },
        {
          "id": "neural-networks-foundations-04-activation-functions",
          "title": "5.4 Activation Functions",
          "figureSrc": "figures/sections/ch05_s04_activation-functions.png",
          "figureAlt": "Visual summary for 5.4 Activation Functions",
          "html": "<p>The lecture introduces several activation functions. The sigmoid function maps values into the interval from 0 to 1. It was historically popular but can saturate, producing very small gradients when inputs become large in magnitude. The tanh function maps values into the interval from -1 to 1 and is centered around zero, which can help optimization somewhat, but it still suffers from saturation.</p>\n<p>The Rectified Linear Unit, or ReLU, computes \\(\\max(0, x)\\). ReLU has become a practical default in many hidden layers because it is simple, efficient, and avoids some of the saturation behavior of sigmoid and tanh. ReLU is not perfect, but its simplicity and effectiveness made it one of the defining nonlinearities of modern deep learning.</p>",
          "wordCount": 118,
          "readMinutes": 1,
          "searchText": "The lecture introduces several activation functions. The sigmoid function maps values into the interval from 0 to 1. It was historically popular but can saturate, producing very small gradients when inputs become large in magnitude. The tanh function maps values into the interval from -1 to 1 and is centered around zero, which can help optimization somewhat, but it still suffers from saturation. The Rectified Linear Unit, or ReLU, computes \\(\\max(0, x)\\). ReLU has become a practical default in many hidden layers because it is simple, efficient, and avoids some of the saturation behavior of sigmoid and tanh. ReLU is not perfect, but its simplicity and effectiveness made it one of the defining nonlinearities of modern deep learning."
        },
        {
          "id": "neural-networks-foundations-05-linear-decision-boundaries-and-feature-space",
          "title": "5.5 Linear Decision Boundaries and Feature Space",
          "figureSrc": "figures/sections/ch05_s05_linear-decision-boundaries-and-feature-space.png",
          "figureAlt": "Visual summary for 5.5 Linear Decision Boundaries and Feature Space",
          "html": "<p>A single neuron with a threshold-like decision effectively creates a hyperplane that splits feature space into two sides. A network with hidden layers can combine many such splits to create more complex decision regions. This is why the lecture emphasizes that stacked neurons create more complicated decision boundaries than a single linear separator.</p>\n<p>Conceptually, one may think of each hidden layer as transforming the representation into a new space where the final separation becomes easier.</p>",
          "wordCount": 75,
          "readMinutes": 1,
          "searchText": "A single neuron with a threshold-like decision effectively creates a hyperplane that splits feature space into two sides. A network with hidden layers can combine many such splits to create more complex decision regions. This is why the lecture emphasizes that stacked neurons create more complicated decision boundaries than a single linear separator. Conceptually, one may think of each hidden layer as transforming the representation into a new space where the final separation becomes easier."
        },
        {
          "id": "neural-networks-foundations-06-output-layers-depend-on-the-task",
          "title": "5.6 Output Layers Depend on the Task",
          "figureSrc": "figures/sections/ch05_s06_output-layers-depend-on-the-task.png",
          "figureAlt": "Visual summary for 5.6 Output Layers Depend on the Task",
          "html": "<p>The output layer must match the type of prediction problem. This is not a minor design detail; it is a core modeling decision.</p>\n<p>For multi-class classification, we usually want the outputs to behave like probabilities over classes. Softmax is therefore natural.</p>\n<p>For regression, we want real-valued outputs. A linear output layer is appropriate because it does not artificially restrict the range.</p>\n<p>The precipitation nowcasting homework makes this point explicit. Rainfall amount is a continuous real-valued target, so it should not be forced through a sigmoid or clipped by a ReLU at the final layer. A linear output is the correct choice.</p>",
          "wordCount": 101,
          "readMinutes": 1,
          "searchText": "The output layer must match the type of prediction problem. This is not a minor design detail; it is a core modeling decision. For multi-class classification, we usually want the outputs to behave like probabilities over classes. Softmax is therefore natural. For regression, we want real-valued outputs. A linear output layer is appropriate because it does not artificially restrict the range. The precipitation nowcasting homework makes this point explicit. Rainfall amount is a continuous real-valued target, so it should not be forced through a sigmoid or clipped by a ReLU at the final layer. A linear output is the correct choice."
        },
        {
          "id": "neural-networks-foundations-07-softmax-and-probabilistic-outputs",
          "title": "5.7 Softmax and Probabilistic Outputs",
          "figureSrc": "figures/sections/ch05_s07_softmax-and-probabilistic-outputs.png",
          "figureAlt": "Visual summary for 5.7 Softmax and Probabilistic Outputs",
          "html": "<p>Softmax converts raw scores, sometimes called logits, into a probability-like distribution:</p>\n<div class=\"math-display\">\\[p_i = \\frac{\\exp(z_i)}{\\sum_j \\exp(z_j)}\\]</div>\n<p>Each output is between 0 and 1, and the outputs sum to 1. This makes softmax suitable when the model must distribute belief across multiple exclusive classes.</p>\n<p>The PyTorch CrossEntropyLoss documentation states that this criterion computes the cross-entropy loss between input logits and target and is useful for training classification problems with \\(C\\) classes. It also notes that the input should contain unnormalized logits, which is an important practical detail.</p>",
          "wordCount": 85,
          "readMinutes": 1,
          "searchText": "Softmax converts raw scores, sometimes called logits, into a probability-like distribution: \\[p_i = \\frac{\\exp(z_i)}{\\sum_j \\exp(z_j)}\\] Each output is between 0 and 1, and the outputs sum to 1. This makes softmax suitable when the model must distribute belief across multiple exclusive classes. The PyTorch CrossEntropyLoss documentation states that this criterion computes the cross-entropy loss between input logits and target and is useful for training classification problems with \\(C\\) classes. It also notes that the input should contain unnormalized logits, which is an important practical detail."
        },
        {
          "id": "neural-networks-foundations-08-loss-functions",
          "title": "5.8 Loss Functions",
          "figureSrc": "figures/sections/ch05_s08_loss-functions.png",
          "figureAlt": "Visual summary for 5.8 Loss Functions",
          "html": "<p>The loss function tells the learning algorithm what it means to make a mistake.</p>\n<p>For classification, the course emphasizes cross-entropy. Cross-entropy heavily penalizes the model when it assigns low probability to the correct class. It is closely tied to probabilistic modeling and works naturally with softmax-style outputs.</p>\n<p>For regression, the course emphasizes Mean Squared Error, or MSE. The PyTorch documentation describes MSELoss as measuring the mean squared error, or squared L2 norm, between each element of the input and target. Because the error is squared, large mistakes are penalized more strongly than small ones.</p>\n<p>The most important exam rule is therefore straightforward: use cross-entropy for classification and MSE for regression unless a special context suggests otherwise.</p>",
          "wordCount": 116,
          "readMinutes": 1,
          "searchText": "The loss function tells the learning algorithm what it means to make a mistake. For classification, the course emphasizes cross-entropy. Cross-entropy heavily penalizes the model when it assigns low probability to the correct class. It is closely tied to probabilistic modeling and works naturally with softmax-style outputs. For regression, the course emphasizes Mean Squared Error, or MSE. The PyTorch documentation describes MSELoss as measuring the mean squared error, or squared L2 norm, between each element of the input and target. Because the error is squared, large mistakes are penalized more strongly than small ones. The most important exam rule is therefore straightforward: use cross-entropy for classification and MSE for regression unless a special context suggests otherwise."
        },
        {
          "id": "neural-networks-foundations-09-why-mse-is-reasonable-for-continuous-targets",
          "title": "5.9 Why MSE Is Reasonable for Continuous Targets",
          "figureSrc": "figures/sections/ch05_s09_why-mse-is-reasonable-for-continuous-targets.png",
          "figureAlt": "Visual summary for 5.9 Why MSE Is Reasonable for Continuous Targets",
          "html": "<p>The nowcasting homework contains a useful reasoning example. Rainfall prediction is a regression problem. MSE is appropriate because rainfall is a continuous target, and the loss gives smooth gradients for optimization. It also naturally penalizes large numerical errors more strongly than small ones.</p>\n<p>This is not just a homework-specific fact. It is an example of model-likelihood matching: the type of target should guide the type of output and the type of loss.</p>",
          "wordCount": 72,
          "readMinutes": 1,
          "searchText": "The nowcasting homework contains a useful reasoning example. Rainfall prediction is a regression problem. MSE is appropriate because rainfall is a continuous target, and the loss gives smooth gradients for optimization. It also naturally penalizes large numerical errors more strongly than small ones. This is not just a homework-specific fact. It is an example of model-likelihood matching: the type of target should guide the type of output and the type of loss."
        },
        {
          "id": "neural-networks-foundations-10-optimization-as-loss-minimization",
          "title": "5.10 Optimization as Loss Minimization",
          "figureSrc": "figures/sections/ch05_s10_optimization-as-loss-minimization.png",
          "figureAlt": "Visual summary for 5.10 Optimization as Loss Minimization",
          "html": "<p>Training a neural network means choosing weights and biases so that the loss becomes small on the training data. This is an optimization problem over a high-dimensional parameter space. The loss landscape is usually nonconvex, so the optimization does not have the tidy geometry of an ordinary convex least-squares problem.</p>\n<p>Nevertheless, gradient-based methods work well in practice. The reason is not that the problem becomes mathematically simple, but that modern architectures, data regimes, and optimization heuristics make gradient descent workable at scale.</p>",
          "wordCount": 82,
          "readMinutes": 1,
          "searchText": "Training a neural network means choosing weights and biases so that the loss becomes small on the training data. This is an optimization problem over a high-dimensional parameter space. The loss landscape is usually nonconvex, so the optimization does not have the tidy geometry of an ordinary convex least-squares problem. Nevertheless, gradient-based methods work well in practice. The reason is not that the problem becomes mathematically simple, but that modern architectures, data regimes, and optimization heuristics make gradient descent workable at scale."
        },
        {
          "id": "neural-networks-foundations-11-gradient-descent",
          "title": "5.11 Gradient Descent",
          "figureSrc": "figures/sections/ch05_s11_gradient-descent.png",
          "figureAlt": "Visual summary for 5.11 Gradient Descent",
          "html": "<p>Gradient descent updates parameters in the negative direction of the loss gradient:</p>\n<div class=\"math-display\">\\[\\theta \\leftarrow \\theta - \\eta \\nabla L\\]</div>\n<p>The parameter <code>eta</code> is the learning rate. If the learning rate is too small, the optimization moves slowly. If it is too large, the optimization may overshoot good regions or diverge. Much of practical deep learning consists of learning how to control this tradeoff.</p>\n<p>The lecture spends time on intuition for the gradient because students must understand that the gradient points in the direction of steepest increase, so moving in the negative gradient direction reduces the loss locally.</p>",
          "wordCount": 97,
          "readMinutes": 1,
          "searchText": "Gradient descent updates parameters in the negative direction of the loss gradient: \\[\\theta \\leftarrow \\theta - \\eta \\nabla L\\] The parameter eta is the learning rate. If the learning rate is too small, the optimization moves slowly. If it is too large, the optimization may overshoot good regions or diverge. Much of practical deep learning consists of learning how to control this tradeoff. The lecture spends time on intuition for the gradient because students must understand that the gradient points in the direction of steepest increase, so moving in the negative gradient direction reduces the loss locally."
        },
        {
          "id": "neural-networks-foundations-12-backpropagation",
          "title": "5.12 Backpropagation",
          "figureSrc": "figures/sections/ch05_s12_backpropagation.png",
          "figureAlt": "Visual summary for 5.12 Backpropagation",
          "html": "<p>Backpropagation is the algorithm that computes gradients efficiently in a layered network. It is an application of the chain rule from calculus. The network first performs a forward pass to compute intermediate values, the output, and the loss. It then performs a backward pass to compute how changing each parameter would change the loss.</p>\n<p>This means backpropagation is not a different training objective. It is the computational machinery that makes gradient-based learning possible in deep networks.</p>",
          "wordCount": 76,
          "readMinutes": 1,
          "searchText": "Backpropagation is the algorithm that computes gradients efficiently in a layered network. It is an application of the chain rule from calculus. The network first performs a forward pass to compute intermediate values, the output, and the loss. It then performs a backward pass to compute how changing each parameter would change the loss. This means backpropagation is not a different training objective. It is the computational machinery that makes gradient-based learning possible in deep networks."
        },
        {
          "id": "neural-networks-foundations-13-mini-batches-and-stochastic-gradient-descent",
          "title": "5.13 Mini-Batches and Stochastic Gradient Descent",
          "figureSrc": "figures/sections/ch05_s13_mini-batches-and-stochastic-gradient-descent.png",
          "figureAlt": "Visual summary for 5.13 Mini-Batches and Stochastic Gradient Descent",
          "html": "<p>Using the entire training set for every update can be expensive. Instead, it is common to use small subsets of the training data called mini-batches. This leads to stochastic or mini-batch gradient descent. Each update becomes noisier, but also much cheaper. In practice this is often beneficial because it works efficiently on hardware accelerators and can help optimization move through complex landscapes.</p>\n<p>The phrase &quot;SGD&quot; is therefore often used broadly to refer to gradient-based optimization using mini-batches rather than full-dataset updates.</p>",
          "wordCount": 81,
          "readMinutes": 1,
          "searchText": "Using the entire training set for every update can be expensive. Instead, it is common to use small subsets of the training data called mini-batches. This leads to stochastic or mini-batch gradient descent. Each update becomes noisier, but also much cheaper. In practice this is often beneficial because it works efficiently on hardware accelerators and can help optimization move through complex landscapes. The phrase &quot;SGD&quot; is therefore often used broadly to refer to gradient-based optimization using mini-batches rather than full-dataset updates."
        },
        {
          "id": "neural-networks-foundations-14-learning-rate-scheduling",
          "title": "5.14 Learning Rate Scheduling",
          "figureSrc": "figures/sections/ch05_s14_learning-rate-scheduling.png",
          "figureAlt": "Visual summary for 5.14 Learning Rate Scheduling",
          "html": "<p>A single fixed learning rate is often not ideal throughout training. Early in learning, larger steps can help the model move quickly toward a good region. Later in training, smaller steps can help refine the solution. This is why learning-rate scheduling or annealing is common.</p>\n<p>The nowcasting notebook includes <code>ReduceLROnPlateau</code>, which lowers the learning rate when validation progress stalls. This is a practical example of how optimization is not just about choosing an architecture but also about controlling the training dynamics.</p>",
          "wordCount": 82,
          "readMinutes": 1,
          "searchText": "A single fixed learning rate is often not ideal throughout training. Early in learning, larger steps can help the model move quickly toward a good region. Later in training, smaller steps can help refine the solution. This is why learning-rate scheduling or annealing is common. The nowcasting notebook includes ReduceLROnPlateau , which lowers the learning rate when validation progress stalls. This is a practical example of how optimization is not just about choosing an architecture but also about controlling the training dynamics."
        },
        {
          "id": "neural-networks-foundations-15-initialization",
          "title": "5.15 Initialization",
          "figureSrc": "figures/sections/ch05_s15_initialization.png",
          "figureAlt": "Visual summary for 5.15 Initialization",
          "html": "<p>The starting values of the parameters matter. Poor initialization can lead to gradients that vanish, explode, or move very slowly. Good initialization helps maintain healthy signal propagation through the network. The lecture notes mention practical initialization advice, such as He initialization for ReLU-style networks.</p>\n<p>This is another example of a theme that appears throughout deep learning: even if the mathematical model is correct, the training behavior can still fail if the numerical setup is poor.</p>\n<figure class=\"md-figure\"><img src=\"figures/ch05_generalization_regularization.png\" alt=\"Generalization depends on validation behavior, not training loss alone: train and validation curves reveal overfitting, while regularization methods try to reduce brittle memorization.\" loading=\"lazy\" /><figcaption>Generalization depends on validation behavior, not training loss alone: train and validation curves reveal overfitting, while regularization methods try to reduce brittle memorization.</figcaption></figure>",
          "wordCount": 98,
          "readMinutes": 1,
          "searchText": "The starting values of the parameters matter. Poor initialization can lead to gradients that vanish, explode, or move very slowly. Good initialization helps maintain healthy signal propagation through the network. The lecture notes mention practical initialization advice, such as He initialization for ReLU-style networks. This is another example of a theme that appears throughout deep learning: even if the mathematical model is correct, the training behavior can still fail if the numerical setup is poor. Generalization depends on validation behavior, not training loss alone: train and validation curves reveal overfitting, while regularization methods try to reduce brittle memorization."
        },
        {
          "id": "neural-networks-foundations-16-underfitting-and-overfitting",
          "title": "5.16 Underfitting and Overfitting",
          "figureSrc": "figures/sections/ch05_s16_underfitting-and-overfitting.png",
          "figureAlt": "Visual summary for 5.16 Underfitting and Overfitting",
          "html": "<p>Underfitting occurs when the model is not expressive enough, not trained long enough, or not optimized well enough to capture the relevant structure. In underfitting, both training and validation performance remain poor.</p>\n<p>Overfitting occurs when the model fits the training data too specifically and fails to generalize. In overfitting, training loss becomes low while validation performance stops improving or gets worse.</p>\n<p>Students often say that overfitting means &quot;low training loss.&quot; That is not precise enough. Overfitting means low training loss together with poor generalization.</p>",
          "wordCount": 84,
          "readMinutes": 1,
          "searchText": "Underfitting occurs when the model is not expressive enough, not trained long enough, or not optimized well enough to capture the relevant structure. In underfitting, both training and validation performance remain poor. Overfitting occurs when the model fits the training data too specifically and fails to generalize. In overfitting, training loss becomes low while validation performance stops improving or gets worse. Students often say that overfitting means &quot;low training loss.&quot; That is not precise enough. Overfitting means low training loss together with poor generalization."
        },
        {
          "id": "neural-networks-foundations-17-the-validation-set-and-the-test-set",
          "title": "5.17 The Validation Set and the Test Set",
          "figureSrc": "figures/sections/ch05_s17_the-validation-set-and-the-test-set.png",
          "figureAlt": "Visual summary for 5.17 The Validation Set and the Test Set",
          "html": "<p>The training set is used to fit the model parameters. The validation set is used to monitor progress and choose settings such as architecture, regularization, and learning rate. The test set is reserved for final evaluation.</p>\n<p>This separation matters because if the test set is used repeatedly during development, it stops being an honest estimate of generalization. The course repeatedly emphasizes this distinction, and it is a common source of lost points when students answer carelessly.</p>",
          "wordCount": 76,
          "readMinutes": 1,
          "searchText": "The training set is used to fit the model parameters. The validation set is used to monitor progress and choose settings such as architecture, regularization, and learning rate. The test set is reserved for final evaluation. This separation matters because if the test set is used repeatedly during development, it stops being an honest estimate of generalization. The course repeatedly emphasizes this distinction, and it is a common source of lost points when students answer carelessly."
        },
        {
          "id": "neural-networks-foundations-18-regularization",
          "title": "5.18 Regularization",
          "figureSrc": "figures/sections/ch05_s18_regularization.png",
          "figureAlt": "Visual summary for 5.18 Regularization",
          "html": "<p>Regularization refers to techniques that improve generalization by discouraging overly brittle or overly complex solutions.</p>\n<p>L1 regularization adds a penalty based on the sum of absolute weight values. It encourages sparsity.</p>\n<p>L2 regularization adds a penalty based on the sum of squared weight values. It discourages extremely large weights and is one of the most common forms of weight penalty in practical training.</p>\n<p>Dropout is a particularly important technique. The original dropout paper in JMLR describes it as a method for addressing overfitting by randomly dropping units and their connections during training. The PyTorch Dropout documentation similarly explains that during training it randomly zeroes some input elements with probability \\(p\\), making it an effective technique for regularization and preventing co-adaptation of neurons.</p>\n<p>The intuition is that if units cannot rely on always being present, the network must learn more distributed and robust representations.</p>",
          "wordCount": 143,
          "readMinutes": 1,
          "searchText": "Regularization refers to techniques that improve generalization by discouraging overly brittle or overly complex solutions. L1 regularization adds a penalty based on the sum of absolute weight values. It encourages sparsity. L2 regularization adds a penalty based on the sum of squared weight values. It discourages extremely large weights and is one of the most common forms of weight penalty in practical training. Dropout is a particularly important technique. The original dropout paper in JMLR describes it as a method for addressing overfitting by randomly dropping units and their connections during training. The PyTorch Dropout documentation similarly explains that during training it randomly zeroes some input elements with probability \\(p\\), making it an effective technique for regularization and preventing co-adaptation of neurons. The intuition is that if units cannot rely on always being present, the network must learn more distributed and robust representations."
        },
        {
          "id": "neural-networks-foundations-19-early-stopping-and-monitoring",
          "title": "5.19 Early Stopping and Monitoring",
          "figureSrc": "figures/sections/ch05_s19_early-stopping-and-monitoring.png",
          "figureAlt": "Visual summary for 5.19 Early Stopping and Monitoring",
          "html": "<p>Although not always separated as a formal theorem in introductory lectures, one of the most effective practical regularizers is simply stopping training when validation performance ceases to improve. This idea appears naturally when one monitors training and validation curves across epochs.</p>\n<p>If training loss keeps falling but validation loss starts rising, the model is probably learning training-specific quirks rather than general structure. That is the moment to reduce capacity, regularize more, or stop training.</p>",
          "wordCount": 74,
          "readMinutes": 1,
          "searchText": "Although not always separated as a formal theorem in introductory lectures, one of the most effective practical regularizers is simply stopping training when validation performance ceases to improve. This idea appears naturally when one monitors training and validation curves across epochs. If training loss keeps falling but validation loss starts rising, the model is probably learning training-specific quirks rather than general structure. That is the moment to reduce capacity, regularize more, or stop training."
        },
        {
          "id": "neural-networks-foundations-20-common-optimizers",
          "title": "5.20 Common Optimizers",
          "figureSrc": "figures/sections/ch05_s20_common-optimizers.png",
          "figureAlt": "Visual summary for 5.20 Common Optimizers",
          "html": "<p>The lecture surveys several optimizers beyond plain gradient descent. Momentum adds a velocity term so that optimization can move more effectively through shallow or noisy directions. Nesterov momentum modifies this idea with a look-ahead perspective. RMSprop adjusts steps based on gradient magnitude. Adam combines adaptive step sizing with momentum-like estimates and became a widely used practical default. AdamW modifies Adam so that weight decay is handled more cleanly.</p>\n<p>A useful exam-level conclusion is that optimization behavior depends not only on the learning rate but also on the optimizer design. In practice, Adam and AdamW are often strong first choices, but understanding SGD and momentum remains fundamental.</p>",
          "wordCount": 106,
          "readMinutes": 1,
          "searchText": "The lecture surveys several optimizers beyond plain gradient descent. Momentum adds a velocity term so that optimization can move more effectively through shallow or noisy directions. Nesterov momentum modifies this idea with a look-ahead perspective. RMSprop adjusts steps based on gradient magnitude. Adam combines adaptive step sizing with momentum-like estimates and became a widely used practical default. AdamW modifies Adam so that weight decay is handled more cleanly. A useful exam-level conclusion is that optimization behavior depends not only on the learning rate but also on the optimizer design. In practice, Adam and AdamW are often strong first choices, but understanding SGD and momentum remains fundamental."
        },
        {
          "id": "neural-networks-foundations-21-counting-parameters",
          "title": "5.21 Counting Parameters",
          "figureSrc": "figures/sections/ch05_s21_counting-parameters.png",
          "figureAlt": "Visual summary for 5.21 Counting Parameters",
          "html": "<p>The homework includes a useful parameter-counting exercise. If a fully connected layer maps 75 inputs to 200 outputs, then the number of weights is \\(75 \\cdot 200 = 15000\\). The number of biases is 200. Therefore the total number of parameters is 15200.</p>\n<p>This matters because a neural network is not magic; it is a concrete parameterized function. Counting parameters helps the student appreciate model capacity and the cost of adding layers or neurons.</p>",
          "wordCount": 74,
          "readMinutes": 1,
          "searchText": "The homework includes a useful parameter-counting exercise. If a fully connected layer maps 75 inputs to 200 outputs, then the number of weights is \\(75 \\cdot 200 = 15000\\). The number of biases is 200. Therefore the total number of parameters is 15200. This matters because a neural network is not magic; it is a concrete parameterized function. Counting parameters helps the student appreciate model capacity and the cost of adding layers or neurons."
        },
        {
          "id": "neural-networks-foundations-22-what-the-homework-teaches-about-modeling",
          "title": "5.22 What the Homework Teaches About Modeling",
          "figureSrc": "figures/sections/ch05_s22_what-the-homework-teaches-about-modeling.png",
          "figureAlt": "Visual summary for 5.22 What the Homework Teaches About Modeling",
          "html": "<p>The precipitation nowcasting notebook shows how the abstract ideas become concrete engineering decisions. The task is regression, so the output layer is linear and the loss is MSE. Data must be loaded carefully using dataset and dataloader abstractions. Training history must be monitored. Learning rates must be scheduled. Overfitting must be addressed with dropout, normalization, or better optimization.</p>\n<p>The most important practical lesson is that model quality emerges from many aligned choices. A model may fail because the loss is wrong, the output layer is wrong, the learning rate is unstable, the data is not normalized, or the training is overfitting. Deep learning requires reasoning across all of these layers at once.</p>",
          "wordCount": 112,
          "readMinutes": 1,
          "searchText": "The precipitation nowcasting notebook shows how the abstract ideas become concrete engineering decisions. The task is regression, so the output layer is linear and the loss is MSE. Data must be loaded carefully using dataset and dataloader abstractions. Training history must be monitored. Learning rates must be scheduled. Overfitting must be addressed with dropout, normalization, or better optimization. The most important practical lesson is that model quality emerges from many aligned choices. A model may fail because the loss is wrong, the output layer is wrong, the learning rate is unstable, the data is not normalized, or the training is overfitting. Deep learning requires reasoning across all of these layers at once."
        },
        {
          "id": "neural-networks-foundations-23-common-misunderstandings",
          "title": "5.23 Common Misunderstandings",
          "figureSrc": "figures/sections/ch05_s23_common-misunderstandings.png",
          "figureAlt": "Visual summary for 5.23 Common Misunderstandings",
          "html": "<p>Students often confuse sigmoid and softmax, or treat them as interchangeable. They are not. Another frequent mistake is to use bounded activations at the final layer of a regression model without justification. Others may forget bias terms when counting parameters, or talk about overfitting without mentioning validation performance. A more subtle mistake is to imagine that backpropagation is a mysterious separate phenomenon rather than simply the chain rule applied efficiently.</p>",
          "wordCount": 70,
          "readMinutes": 1,
          "searchText": "Students often confuse sigmoid and softmax, or treat them as interchangeable. They are not. Another frequent mistake is to use bounded activations at the final layer of a regression model without justification. Others may forget bias terms when counting parameters, or talk about overfitting without mentioning validation performance. A more subtle mistake is to imagine that backpropagation is a mysterious separate phenomenon rather than simply the chain rule applied efficiently."
        },
        {
          "id": "neural-networks-foundations-24-summary",
          "title": "5.24 Summary",
          "figureSrc": "figures/sections/ch05_s24_summary.png",
          "figureAlt": "Visual summary for 5.24 Summary",
          "html": "<p>The first neural-network chapter provides the conceptual foundation for deep learning. A neural network is a composition of affine transformations and nonlinear activations. Nonlinearity is essential. Output design must match task type. Cross-entropy is natural for classification; MSE is natural for regression. Training is an optimization process driven by gradients and backpropagation. Validation reveals generalization quality. Regularization, initialization, and optimizer choice all strongly affect outcomes. These ideas are the core language of modern machine learning.</p>",
          "wordCount": 75,
          "readMinutes": 1,
          "searchText": "The first neural-network chapter provides the conceptual foundation for deep learning. A neural network is a composition of affine transformations and nonlinear activations. Nonlinearity is essential. Output design must match task type. Cross-entropy is natural for classification; MSE is natural for regression. Training is an optimization process driven by gradients and backpropagation. Validation reveals generalization quality. Regularization, initialization, and optimizer choice all strongly affect outcomes. These ideas are the core language of modern machine learning."
        },
        {
          "id": "neural-networks-foundations-25-primary-references-used-to-expand-this-chapter",
          "title": "5.25 Primary References Used to Expand This Chapter",
          "figureSrc": "figures/sections/ch05_s25_primary-references-used-to-expand-this-chapter.png",
          "figureAlt": "Visual summary for 5.25 Primary References Used to Expand This Chapter",
          "html": "<ul class=\"md-list\"><li>PyTorch CrossEntropyLoss documentation: <a href=\"https://docs.pytorch.org/docs/stable/generated/torch.nn.CrossEntropyLoss.html\" target=\"_blank\" rel=\"noreferrer\">https://docs.pytorch.org/docs/stable/generated/torch.nn.CrossEntropyLoss.html</a></li><li>PyTorch <code>MSELoss</code> documentation: <a href=\"https://docs.pytorch.org/docs/stable/generated/torch.nn.MSELoss.html\" target=\"_blank\" rel=\"noreferrer\">https://docs.pytorch.org/docs/stable/generated/torch.nn.MSELoss.html</a></li><li>PyTorch Dropout documentation: <a href=\"https://docs.pytorch.org/docs/stable/generated/torch.nn.Dropout.html\" target=\"_blank\" rel=\"noreferrer\">https://docs.pytorch.org/docs/stable/generated/torch.nn.Dropout.html</a></li><li>Srivastava et al. &quot;Dropout: A Simple Way to Prevent Neural Networks from Overfitting&quot;, JMLR 2014: <a href=\"https://jmlr.csail.mit.edu/beta/papers/v15/srivastava14a.html\" target=\"_blank\" rel=\"noreferrer\">https://jmlr.csail.mit.edu/beta/papers/v15/srivastava14a.html</a></li></ul>",
          "wordCount": 28,
          "readMinutes": 1,
          "searchText": "PyTorch CrossEntropyLoss documentation: https://docs.pytorch.org/docs/stable/generated/torch.nn.CrossEntropyLoss.html PyTorch MSELoss documentation: https://docs.pytorch.org/docs/stable/generated/torch.nn.MSELoss.html PyTorch Dropout documentation: https://docs.pytorch.org/docs/stable/generated/torch.nn.Dropout.html Srivastava et al. &quot;Dropout: A Simple Way to Prevent Neural Networks from Overfitting&quot;, JMLR 2014: https://jmlr.csail.mit.edu/beta/papers/v15/srivastava14a.html"
        }
      ],
      "wordCount": 2842,
      "sectionCount": 25,
      "readMinutes": 16,
      "searchText": "Neural networks became important because many real-world tasks cannot be solved well by simple linear models. A linear classifier can separate classes only with a linear boundary. But many useful problems require complicated nonlinear boundaries or complicated functional relationships between inputs and outputs. The first neural-network chapter in this course establishes the foundation needed to understand deep learning: layers, activations, output design, loss functions, optimization, backpropagation, overfitting, and regularization. This chapter is essential because all later topics, including convolutional networks, sequence models, and generative AI, inherit these basic ideas. Neural-network training is a repeated loop: take a mini-batch, run a forward pass, compute a loss, backpropagate gradients, and update the weights. A neuron in a feedforward network computes a weighted sum of its inputs and then applies an activation function. In a simple linear model, the output may be written as: \\[y = w^T x + b\\] where \\(x\\) is the input vector, \\(w\\) is the weight vector, and \\(b\\) is a bias term. This is already useful, but it is only linear. A neural network stacks many such transformations. If the network has hidden layers, then the output of one layer becomes the input to the next. The network therefore composes simple functions into a more complicated function. This compositional structure is one of the main reasons deep learning is powerful. If a layer receives an input vector \\(x\\), then a standard dense layer computes: \\[z = Wx + b\\] where \\(W\\) is a matrix and \\(b\\) is a bias vector. Then the layer applies an activation function: \\[a = f(z)\\] The vector \\(z\\) is sometimes called the pre-activation, and \\(a\\) is the post-activation. This pattern repeats from layer to layer until the final output is produced. The use of matrix notation is not cosmetic. It makes clear that a whole layer is just a learnable affine transformation followed by a nonlinearity. If we stack several layers but use no nonlinear activation functions, then the network collapses mathematically into a single linear transformation. That means depth alone would provide no extra expressive power. This is one of the most important conceptual points in neural networks. Nonlinear activations are what allow deep networks to represent curved boundaries, interaction effects, and hierarchical feature composition. Without nonlinearity, a deep network is only a complicated way to write a linear model. The lecture introduces several activation functions. The sigmoid function maps values into the interval from 0 to 1. It was historically popular but can saturate, producing very small gradients when inputs become large in magnitude. The tanh function maps values into the interval from -1 to 1 and is centered around zero, which can help optimization somewhat, but it still suffers from saturation. The Rectified Linear Unit, or ReLU, computes \\(\\max(0, x)\\). ReLU has become a practical default in many hidden layers because it is simple, efficient, and avoids some of the saturation behavior of sigmoid and tanh. ReLU is not perfect, but its simplicity and effectiveness made it one of the defining nonlinearities of modern deep learning. A single neuron with a threshold-like decision effectively creates a hyperplane that splits feature space into two sides. A network with hidden layers can combine many such splits to create more complex decision regions. This is why the lecture emphasizes that stacked neurons create more complicated decision boundaries than a single linear separator. Conceptually, one may think of each hidden layer as transforming the representation into a new space where the final separation becomes easier. The output layer must match the type of prediction problem. This is not a minor design detail; it is a core modeling decision. For multi-class classification, we usually want the outputs to behave like probabilities over classes. Softmax is therefore natural. For regression, we want real-valued outputs. A linear output layer is appropriate because it does not artificially restrict the range. The precipitation nowcasting homework makes this point explicit. Rainfall amount is a continuous real-valued target, so it should not be forced through a sigmoid or clipped by a ReLU at the final layer. A linear output is the correct choice. Softmax converts raw scores, sometimes called logits, into a probability-like distribution: \\[p_i = \\frac{\\exp(z_i)}{\\sum_j \\exp(z_j)}\\] Each output is between 0 and 1, and the outputs sum to 1. This makes softmax suitable when the model must distribute belief across multiple exclusive classes. The PyTorch CrossEntropyLoss documentation states that this criterion computes the cross-entropy loss between input logits and target and is useful for training classification problems with \\(C\\) classes. It also notes that the input should contain unnormalized logits, which is an important practical detail. The loss function tells the learning algorithm what it means to make a mistake. For classification, the course emphasizes cross-entropy. Cross-entropy heavily penalizes the model when it assigns low probability to the correct class. It is closely tied to probabilistic modeling and works naturally with softmax-style outputs. For regression, the course emphasizes Mean Squared Error, or MSE. The PyTorch documentation describes MSELoss as measuring the mean squared error, or squared L2 norm, between each element of the input and target. Because the error is squared, large mistakes are penalized more strongly than small ones. The most important exam rule is therefore straightforward: use cross-entropy for classification and MSE for regression unless a special context suggests otherwise. The nowcasting homework contains a useful reasoning example. Rainfall prediction is a regression problem. MSE is appropriate because rainfall is a continuous target, and the loss gives smooth gradients for optimization. It also naturally penalizes large numerical errors more strongly than small ones. This is not just a homework-specific fact. It is an example of model-likelihood matching: the type of target should guide the type of output and the type of loss. Training a neural network means choosing weights and biases so that the loss becomes small on the training data. This is an optimization problem over a high-dimensional parameter space. The loss landscape is usually nonconvex, so the optimization does not have the tidy geometry of an ordinary convex least-squares problem. Nevertheless, gradient-based methods work well in practice. The reason is not that the problem becomes mathematically simple, but that modern architectures, data regimes, and optimization heuristics make gradient descent workable at scale. Gradient descent updates parameters in the negative direction of the loss gradient: \\[\\theta \\leftarrow \\theta - \\eta \\nabla L\\] The parameter eta is the learning rate. If the learning rate is too small, the optimization moves slowly. If it is too large, the optimization may overshoot good regions or diverge. Much of practical deep learning consists of learning how to control this tradeoff. The lecture spends time on intuition for the gradient because students must understand that the gradient points in the direction of steepest increase, so moving in the negative gradient direction reduces the loss locally. Backpropagation is the algorithm that computes gradients efficiently in a layered network. It is an application of the chain rule from calculus. The network first performs a forward pass to compute intermediate values, the output, and the loss. It then performs a backward pass to compute how changing each parameter would change the loss. This means backpropagation is not a different training objective. It is the computational machinery that makes gradient-based learning possible in deep networks. Using the entire training set for every update can be expensive. Instead, it is common to use small subsets of the training data called mini-batches. This leads to stochastic or mini-batch gradient descent. Each update becomes noisier, but also much cheaper. In practice this is often beneficial because it works efficiently on hardware accelerators and can help optimization move through complex landscapes. The phrase &quot;SGD&quot; is therefore often used broadly to refer to gradient-based optimization using mini-batches rather than full-dataset updates. A single fixed learning rate is often not ideal throughout training. Early in learning, larger steps can help the model move quickly toward a good region. Later in training, smaller steps can help refine the solution. This is why learning-rate scheduling or annealing is common. The nowcasting notebook includes ReduceLROnPlateau , which lowers the learning rate when validation progress stalls. This is a practical example of how optimization is not just about choosing an architecture but also about controlling the training dynamics. The starting values of the parameters matter. Poor initialization can lead to gradients that vanish, explode, or move very slowly. Good initialization helps maintain healthy signal propagation through the network. The lecture notes mention practical initialization advice, such as He initialization for ReLU-style networks. This is another example of a theme that appears throughout deep learning: even if the mathematical model is correct, the training behavior can still fail if the numerical setup is poor. Generalization depends on validation behavior, not training loss alone: train and validation curves reveal overfitting, while regularization methods try to reduce brittle memorization. Underfitting occurs when the model is not expressive enough, not trained long enough, or not optimized well enough to capture the relevant structure. In underfitting, both training and validation performance remain poor. Overfitting occurs when the model fits the training data too specifically and fails to generalize. In overfitting, training loss becomes low while validation performance stops improving or gets worse. Students often say that overfitting means &quot;low training loss.&quot; That is not precise enough. Overfitting means low training loss together with poor generalization. The training set is used to fit the model parameters. The validation set is used to monitor progress and choose settings such as architecture, regularization, and learning rate. The test set is reserved for final evaluation. This separation matters because if the test set is used repeatedly during development, it stops being an honest estimate of generalization. The course repeatedly emphasizes this distinction, and it is a common source of lost points when students answer carelessly. Regularization refers to techniques that improve generalization by discouraging overly brittle or overly complex solutions. L1 regularization adds a penalty based on the sum of absolute weight values. It encourages sparsity. L2 regularization adds a penalty based on the sum of squared weight values. It discourages extremely large weights and is one of the most common forms of weight penalty in practical training. Dropout is a particularly important technique. The original dropout paper in JMLR describes it as a method for addressing overfitting by randomly dropping units and their connections during training. The PyTorch Dropout documentation similarly explains that during training it randomly zeroes some input elements with probability \\(p\\), making it an effective technique for regularization and preventing co-adaptation of neurons. The intuition is that if units cannot rely on always being present, the network must learn more distributed and robust representations. Although not always separated as a formal theorem in introductory lectures, one of the most effective practical regularizers is simply stopping training when validation performance ceases to improve. This idea appears naturally when one monitors training and validation curves across epochs. If training loss keeps falling but validation loss starts rising, the model is probably learning training-specific quirks rather than general structure. That is the moment to reduce capacity, regularize more, or stop training. The lecture surveys several optimizers beyond plain gradient descent. Momentum adds a velocity term so that optimization can move more effectively through shallow or noisy directions. Nesterov momentum modifies this idea with a look-ahead perspective. RMSprop adjusts steps based on gradient magnitude. Adam combines adaptive step sizing with momentum-like estimates and became a widely used practical default. AdamW modifies Adam so that weight decay is handled more cleanly. A useful exam-level conclusion is that optimization behavior depends not only on the learning rate but also on the optimizer design. In practice, Adam and AdamW are often strong first choices, but understanding SGD and momentum remains fundamental. The homework includes a useful parameter-counting exercise. If a fully connected layer maps 75 inputs to 200 outputs, then the number of weights is \\(75 \\cdot 200 = 15000\\). The number of biases is 200. Therefore the total number of parameters is 15200. This matters because a neural network is not magic; it is a concrete parameterized function. Counting parameters helps the student appreciate model capacity and the cost of adding layers or neurons. The precipitation nowcasting notebook shows how the abstract ideas become concrete engineering decisions. The task is regression, so the output layer is linear and the loss is MSE. Data must be loaded carefully using dataset and dataloader abstractions. Training history must be monitored. Learning rates must be scheduled. Overfitting must be addressed with dropout, normalization, or better optimization. The most important practical lesson is that model quality emerges from many aligned choices. A model may fail because the loss is wrong, the output layer is wrong, the learning rate is unstable, the data is not normalized, or the training is overfitting. Deep learning requires reasoning across all of these layers at once. Students often confuse sigmoid and softmax, or treat them as interchangeable. They are not. Another frequent mistake is to use bounded activations at the final layer of a regression model without justification. Others may forget bias terms when counting parameters, or talk about overfitting without mentioning validation performance. A more subtle mistake is to imagine that backpropagation is a mysterious separate phenomenon rather than simply the chain rule applied efficiently. The first neural-network chapter provides the conceptual foundation for deep learning. A neural network is a composition of affine transformations and nonlinear activations. Nonlinearity is essential. Output design must match task type. Cross-entropy is natural for classification; MSE is natural for regression. Training is an optimization process driven by gradients and backpropagation. Validation reveals generalization quality. Regularization, initialization, and optimizer choice all strongly affect outcomes. These ideas are the core language of modern machine learning. PyTorch CrossEntropyLoss documentation: https://docs.pytorch.org/docs/stable/generated/torch.nn.CrossEntropyLoss.html PyTorch MSELoss documentation: https://docs.pytorch.org/docs/stable/generated/torch.nn.MSELoss.html PyTorch Dropout documentation: https://docs.pytorch.org/docs/stable/generated/torch.nn.Dropout.html Srivastava et al. &quot;Dropout: A Simple Way to Prevent Neural Networks from Overfitting&quot;, JMLR 2014: https://jmlr.csail.mit.edu/beta/papers/v15/srivastava14a.html A neural network is a stack of learnable transformations. Each layer reshapes the representation a little, and nonlinear activations prevent the whole system from collapsing back into one simple linear rule. Think of each hidden layer as a translator that rewrites the input into a more useful internal language. Training is the repeated process of adjusting those translators so the final output makes fewer mistakes. CNNs, sequence models, and generative AI all inherit this foundation. Once you understand activations, losses, optimization, and generalization, later architectures become variations on these themes. I can explain why stacked linear layers still behave linearly. I can match classification to softmax and cross-entropy, and regression to linear output and MSE. I can describe the forward pass and backward pass in plain language. I can distinguish underfitting, overfitting, validation, and test sets clearly. Affine layer A dense layer first computes a weighted sum plus a bias. By itself this is only an affine transformation. The extra expressive power comes from what happens after it. Activation step The activation applies a nonlinearity to the pre-activation vector. Without this step, several layers in a row would still collapse into one linear transformation. Gradient descent update Parameters move in the direction that locally reduces the loss. The learning rate \\(\\eta\\) controls how aggressive the step is. Too small is slow; too large can bounce or diverge. Mean squared error MSE averages squared prediction error for regression targets. Large mistakes are punished more heavily than small mistakes, which is useful when numeric error size matters. Why nonlinearity is the turning point Suppose you stack two layers but remove the activation function between them. Then the first layer computes \\(W_1x + b_1\\) and the second computes \\(W_2(W_1x + b_1) + b_2\\). Algebraically this is still just one affine transformation. So depth only starts to matter when nonlinear activations break that collapse. Why rainfall prediction should keep a linear output Rainfall amount is continuous, and you may want the model to output values larger than 1 or even near zero without clipping. A sigmoid would squash outputs into \\([0, 1]\\), and a ReLU could create unintended behavior at the final layer. A linear output plus MSE matches the structure of a continuous regression target much better. Why is a hidden layer called hidden rather than magical? Because it is simply an internal representation layer whose activations are not the final outputs. It is learned, but it still follows explicit algebraic operations. What does backpropagation actually compute? It efficiently computes how changing each parameter would change the loss, using the chain rule through the network's layered structure. Why is low training loss not enough to claim success? Because the real goal is generalization. A model can memorize training data and still perform poorly on validation or test data. Why can learning-rate scheduling help even if the architecture stays the same? Because optimization behavior changes during training. Larger steps help early movement, while smaller steps often help late refinement. Why is dropout considered regularization instead of ordinary architecture? Because its main role is to reduce over-reliance on specific units and improve generalization rather than to change the function class in a deterministic way."
    },
    {
      "chapter": 6,
      "slug": "convolutional-networks",
      "title": "6 Neural Networks 2",
      "shortTitle": "CNNs",
      "badge": "Chapter 6",
      "summary": "Convolution, receptive fields, residual connections, transfer learning, and modern CNN design.",
      "goals": [
        "See why images need stronger inductive bias than plain dense networks.",
        "Compute convolution output size and parameter counts.",
        "Understand why residual learning and transfer learning matter in practice."
      ],
      "traps": [
        "Thinking CNNs are just bigger MLPs.",
        "Memorizing AlexNet, ResNet, and EfficientNet names without knowing their purpose.",
        "Forgetting that 1 x 1 convolution is about channel mixing, not spatial span."
      ],
      "formulas": [
        "Conv output: floor((n + 2p - d * (f - 1) - 1) / s) + 1",
        "Conv params: C_out * C_in * f * f + C_out",
        "Residual block idea: output = F(x) + x"
      ],
      "starterQuestions": [
        "Why does flattening an image throw away useful structure?",
        "Why do deeper layers see larger effective context even with small filters?",
        "When should you freeze pretrained layers instead of fine-tuning all of them?"
      ],
      "introHtml": "<p>The first neural-network chapter explained the general language of deep learning: layers, activations, losses, gradients, optimization, and regularization. This second chapter asks a more focused question: how should we design networks when the input has spatial structure, especially image-like structure?</p>\n<p>That question matters because many real datasets are not just unordered vectors. Images, maps, weather grids, spectrograms, and many biomedical signals have nearby values that are strongly related. A model that ignores that structure will often need more parameters, more data, and more training time than a model that respects it.</p>\n<p>Convolutional neural networks, or CNNs, became successful because they encode the right inductive bias for this kind of data. They assume that local patterns matter, that the same kind of pattern may appear in multiple locations, and that useful representations should become increasingly abstract as we move deeper into the network.</p>\n<p>This chapter develops that idea carefully. We will begin with the motivation for convolutions, then study how convolutional layers actually work, how dimensions change through the network, why receptive fields matter, and how deeper architectures such as AlexNet, ResNet, MobileNet, and EfficientNet fit into the bigger story. We will also study transfer learning, which is one of the most practical and exam-relevant uses of modern deep learning.</p>\n<figure class=\"md-figure\"><img src=\"figures/ch06_cnn_pipeline.png\" alt=\"A convolutional network keeps image structure intact by sliding filters across local patches, building feature maps, pooling stronger signals, and finally producing class scores.\" loading=\"lazy\" /><figcaption>A convolutional network keeps image structure intact by sliding filters across local patches, building feature maps, pooling stronger signals, and finally producing class scores.</figcaption></figure>",
      "plainEnglishHtml": "<p>CNNs succeed because they stop pretending an image is just a long flat list of numbers. They respect locality, reuse filters across positions, and build higher-level features from lower-level ones.</p>",
      "mentalModelHtml": "<p>Think of a CNN as a hierarchy of feature detectors. Early filters notice edges and textures. Middle layers combine them into parts. Deeper layers combine parts into larger structures or categories.</p>",
      "bridgeForwardHtml": "<p>The same idea of architectural bias shows up again in sequence models and generative AI: the model works better when its structure matches the structure of the data.</p>",
      "masteryChecklist": [
        "I can explain local connectivity and weight sharing.",
        "I can compute convolution output size from the formula.",
        "I can count convolutional parameters without mixing them up with dense-layer counts.",
        "I can explain why residual connections and transfer learning matter practically."
      ],
      "equationNotebook": [
        {
          "label": "Convolution output size",
          "latex": "\\left\\lfloor \\frac{n + 2p - d(f - 1) - 1}{s} \\right\\rfloor + 1",
          "meaning": "This gives the output length of one spatial dimension after convolution.",
          "intuition": "Padding grows the effective input, larger filters consume more space, and stride samples fewer positions."
        },
        {
          "label": "Convolution parameter count",
          "latex": "C_{\\mathrm{out}} \\cdot C_{\\mathrm{in}} \\cdot f \\cdot f + C_{\\mathrm{out}}",
          "meaning": "This counts weights and biases in a standard 2D convolution layer.",
          "intuition": "The key difference from a dense layer is that the same filter weights are reused across spatial locations."
        },
        {
          "label": "Residual block idea",
          "latex": "\\mathrm{output} = F(x) + x",
          "meaning": "A residual block learns a correction on top of an identity path.",
          "intuition": "This helps very deep networks refine representations instead of rebuilding them from scratch every layer."
        }
      ],
      "workedExamples": [
        {
          "title": "Why a 3 x 3 filter can still build global understanding",
          "scenarioHtml": "<p>A single \\(3 \\times 3\\) filter only sees a tiny patch, so it may seem too local to recognize anything meaningful.</p>",
          "walkthroughHtml": "<p>That is true for one layer only. After several layers, each unit depends on outputs from earlier units, so its effective receptive field grows. Small local filters can therefore accumulate into larger-scale understanding through depth.</p>",
          "searchText": "Why a 3 x 3 filter can still build global understanding A single \\(3 \\times 3\\) filter only sees a tiny patch, so it may seem too local to recognize anything meaningful. That is true for one layer only. After several layers, each unit depends on outputs from earlier units, so its effective receptive field grows. Small local filters can therefore accumulate into larger-scale understanding through depth."
        },
        {
          "title": "Why transfer learning is so strong on small datasets",
          "scenarioHtml": "<p>You have a small medical-image dataset and cannot train a giant image model from scratch well.</p>",
          "walkthroughHtml": "<p>A pretrained model already knows many low-level visual patterns such as edges and textures. Reusing those features gives a much better starting point than random initialization, especially when your new dataset is small.</p>",
          "searchText": "Why transfer learning is so strong on small datasets You have a small medical-image dataset and cannot train a giant image model from scratch well. A pretrained model already knows many low-level visual patterns such as edges and textures. Reusing those features gives a much better starting point than random initialization, especially when your new dataset is small."
        }
      ],
      "supplementalQuestions": [
        {
          "prompt": "Why does parameter sharing help both learning and efficiency?",
          "answer": "Because the same filter can detect the same kind of pattern anywhere in the image, which reduces parameters and encourages reuse of meaningful local features."
        },
        {
          "prompt": "Why is a 1 x 1 convolution useful even though it has almost no spatial extent?",
          "answer": "Because it mixes information across channels and can change channel dimension, acting like a learned projection at each spatial location."
        },
        {
          "prompt": "What problem did ResNet mainly solve?",
          "answer": "It mainly improved optimization of very deep networks by allowing identity shortcuts and better gradient flow through residual connections."
        },
        {
          "prompt": "Why is a CNN more natural than a dense network for a 5 x 5 x 3 weather grid?",
          "answer": "Because nearby cells have spatial relationships, and a CNN can exploit local structure and shared filters instead of flattening away that geometry."
        },
        {
          "prompt": "Why is pooling not the only way to shrink spatial size?",
          "answer": "Because strided convolutions can also reduce spatial dimensions while still learning the downsampling transformation."
        }
      ],
      "sections": [
        {
          "id": "convolutional-networks-01-why-fully-connected-networks-struggle-on-images",
          "title": "6.1 Why Fully Connected Networks Struggle on Images",
          "figureSrc": "figures/sections/ch06_s01_why-fully-connected-networks-struggle-on-images.png",
          "figureAlt": "Visual summary for 6.1 Why Fully Connected Networks Struggle on Images",
          "html": "<p>Suppose we flatten a color image into one giant vector and feed it into a fully connected network. In principle, this can work. A fully connected network is expressive enough to approximate very complex functions. But the representation is wasteful.</p>\n<p>The problem is not that the network is incapable. The problem is that it has no built-in understanding of spatial structure.</p>\n<p>In an image:</p>\n<ul class=\"md-list\"><li>nearby pixels tend to be related</li><li>edges, corners, and textures often matter more than isolated pixel values</li><li>the same visual pattern can appear in different locations</li><li>higher-level concepts such as eyes, wheels, or rooftops are built from smaller local patterns</li></ul>\n<p>A fully connected layer treats pixel 1 and pixel 10000 as just two coordinates in a vector. It does not know that some pixels are neighbors or that a vertical edge on the left side and the same vertical edge on the right side should be detected by similar computations.</p>\n<p>This leads to three major inefficiencies:</p>\n<ul class=\"md-list\"><li>too many parameters</li><li>weak inductive bias for spatial data</li><li>poor reuse of learned local patterns</li></ul>\n<p>Convolutional networks solve these problems by forcing the model to look locally, reuse filters across positions, and build deeper representations from simpler ones.</p>",
          "wordCount": 198,
          "readMinutes": 1,
          "searchText": "Suppose we flatten a color image into one giant vector and feed it into a fully connected network. In principle, this can work. A fully connected network is expressive enough to approximate very complex functions. But the representation is wasteful. The problem is not that the network is incapable. The problem is that it has no built-in understanding of spatial structure. In an image: nearby pixels tend to be related edges, corners, and textures often matter more than isolated pixel values the same visual pattern can appear in different locations higher-level concepts such as eyes, wheels, or rooftops are built from smaller local patterns A fully connected layer treats pixel 1 and pixel 10000 as just two coordinates in a vector. It does not know that some pixels are neighbors or that a vertical edge on the left side and the same vertical edge on the right side should be detected by similar computations. This leads to three major inefficiencies: too many parameters weak inductive bias for spatial data poor reuse of learned local patterns Convolutional networks solve these problems by forcing the model to look locally, reuse filters across positions, and build deeper representations from simpler ones."
        },
        {
          "id": "convolutional-networks-02-the-core-cnn-bias-locality-and-weight-sharing",
          "title": "6.2 The Core CNN Bias: Locality and Weight Sharing",
          "figureSrc": "figures/sections/ch06_s02_the-core-cnn-bias-locality-and-weight-sharing.png",
          "figureAlt": "Visual summary for 6.2 The Core CNN Bias: Locality and Weight Sharing",
          "html": "<p>Two ideas define CNNs.</p>\n<p>The first is local connectivity. Instead of connecting every neuron to every pixel, a neuron in a convolutional layer only sees a small patch of the input, such as a \\(3 \\times 3\\) or \\(5 \\times 5\\) region. This matches the idea that many useful visual features are local.</p>\n<p>The second is parameter sharing. The same learned filter is applied across many positions in the image. If a filter learns to detect a horizontal edge, it can detect that edge anywhere, not just in one fixed location.</p>\n<p>These two ideas drastically reduce parameter count. They also encourage a model to learn features that generalize across space.</p>\n<p>This is one of the most important conceptual differences between dense networks and CNNs. A dense network learns many position-specific interactions. A CNN learns reusable local feature detectors.</p>",
          "wordCount": 138,
          "readMinutes": 1,
          "searchText": "Two ideas define CNNs. The first is local connectivity. Instead of connecting every neuron to every pixel, a neuron in a convolutional layer only sees a small patch of the input, such as a \\(3 \\times 3\\) or \\(5 \\times 5\\) region. This matches the idea that many useful visual features are local. The second is parameter sharing. The same learned filter is applied across many positions in the image. If a filter learns to detect a horizontal edge, it can detect that edge anywhere, not just in one fixed location. These two ideas drastically reduce parameter count. They also encourage a model to learn features that generalize across space. This is one of the most important conceptual differences between dense networks and CNNs. A dense network learns many position-specific interactions. A CNN learns reusable local feature detectors."
        },
        {
          "id": "convolutional-networks-03-what-a-convolutional-layer-actually-computes",
          "title": "6.3 What a Convolutional Layer Actually Computes",
          "figureSrc": "figures/sections/ch06_s03_what-a-convolutional-layer-actually-computes.png",
          "figureAlt": "Visual summary for 6.3 What a Convolutional Layer Actually Computes",
          "html": "<p>In deep learning libraries, what is usually called convolution is technically cross-correlation, but the standard name remains convolutional layer. The PyTorch <code>Conv2d</code> documentation describes it as applying a 2D convolution over an input with shape <code>(N, C_in, H, W)</code> to produce an output with shape <code>(N, C_out, H_out, W_out)</code>.</p>\n<p>Here is the practical picture.</p>\n<p>We choose a small filter, also called a kernel, such as \\(3 \\times 3\\). That filter contains learned weights. We place it over a local patch of the input, multiply corresponding entries, sum them, optionally add a bias, and produce one output number. Then we slide the filter to another position and repeat the process.</p>\n<p>The output of one filter over all positions is called a feature map.</p>\n<p>If we use many filters, we get many feature maps. Each one can learn to respond to a different pattern:</p>\n<ul class=\"md-list\"><li>horizontal edges</li><li>vertical edges</li><li>color contrasts</li><li>corner-like structures</li><li>textures</li></ul>\n<p>Later layers operate on these feature maps rather than raw pixels, allowing the network to build more abstract concepts from simpler ones.</p>",
          "wordCount": 174,
          "readMinutes": 1,
          "searchText": "In deep learning libraries, what is usually called convolution is technically cross-correlation, but the standard name remains convolutional layer. The PyTorch Conv2d documentation describes it as applying a 2D convolution over an input with shape (N, C_in, H, W) to produce an output with shape (N, C_out, H_out, W_out) . Here is the practical picture. We choose a small filter, also called a kernel, such as \\(3 \\times 3\\). That filter contains learned weights. We place it over a local patch of the input, multiply corresponding entries, sum them, optionally add a bias, and produce one output number. Then we slide the filter to another position and repeat the process. The output of one filter over all positions is called a feature map. If we use many filters, we get many feature maps. Each one can learn to respond to a different pattern: horizontal edges vertical edges color contrasts corner-like structures textures Later layers operate on these feature maps rather than raw pixels, allowing the network to build more abstract concepts from simpler ones."
        },
        {
          "id": "convolutional-networks-04-multiple-channels-and-learned-features",
          "title": "6.4 Multiple Channels and Learned Features",
          "figureSrc": "figures/sections/ch06_s04_multiple-channels-and-learned-features.png",
          "figureAlt": "Visual summary for 6.4 Multiple Channels and Learned Features",
          "html": "<p>Real images usually have multiple channels, such as red, green, and blue. Therefore a convolutional filter is not just a small \\(f x f\\) patch. It spans all input channels. For an RGB image, a \\(3 \\times 3\\) filter really has shape \\(3 \\times 3 \\times 3\\).</p>\n<p>This means a filter is free to learn patterns that combine color and shape. One filter may respond strongly to bright horizontal transitions. Another may react to a particular color contrast. Another may capture texture.</p>\n<p>The number of output channels equals the number of filters we choose. If a layer has 64 filters, it produces 64 feature maps. Those maps become the input channels for the next layer.</p>\n<p>This explains why deeper CNNs often have increasing channel counts. As spatial resolution shrinks, the model can afford to represent more feature types.</p>",
          "wordCount": 138,
          "readMinutes": 1,
          "searchText": "Real images usually have multiple channels, such as red, green, and blue. Therefore a convolutional filter is not just a small \\(f x f\\) patch. It spans all input channels. For an RGB image, a \\(3 \\times 3\\) filter really has shape \\(3 \\times 3 \\times 3\\). This means a filter is free to learn patterns that combine color and shape. One filter may respond strongly to bright horizontal transitions. Another may react to a particular color contrast. Another may capture texture. The number of output channels equals the number of filters we choose. If a layer has 64 filters, it produces 64 feature maps. Those maps become the input channels for the next layer. This explains why deeper CNNs often have increasing channel counts. As spatial resolution shrinks, the model can afford to represent more feature types."
        },
        {
          "id": "convolutional-networks-05-stride-padding-and-dilation",
          "title": "6.5 Stride, Padding, and Dilation",
          "figureSrc": "figures/sections/ch06_s05_stride-padding-and-dilation.png",
          "figureAlt": "Visual summary for 6.5 Stride, Padding, and Dilation",
          "html": "<p>Three settings strongly affect how a convolution behaves.</p>\n<p>Stride controls how far the filter moves between positions. A stride of 1 means the filter moves one pixel at a time. A larger stride reduces spatial resolution more aggressively.</p>\n<p>Padding adds extra border values, often zeros, around the input. Padding helps preserve spatial size and allows edge pixels to participate more fully in computations.</p>\n<p>Dilation spaces out the filter elements. Instead of sampling adjacent positions only, the filter can view a wider area while keeping the same number of weights.</p>\n<p>These are not minor implementation details. They change what information each unit sees and how quickly the spatial size changes across layers.</p>",
          "wordCount": 111,
          "readMinutes": 1,
          "searchText": "Three settings strongly affect how a convolution behaves. Stride controls how far the filter moves between positions. A stride of 1 means the filter moves one pixel at a time. A larger stride reduces spatial resolution more aggressively. Padding adds extra border values, often zeros, around the input. Padding helps preserve spatial size and allows edge pixels to participate more fully in computations. Dilation spaces out the filter elements. Instead of sampling adjacent positions only, the filter can view a wider area while keeping the same number of weights. These are not minor implementation details. They change what information each unit sees and how quickly the spatial size changes across layers."
        },
        {
          "id": "convolutional-networks-06-output-size-formula",
          "title": "6.6 Output Size Formula",
          "figureSrc": "figures/sections/ch06_s06_output-size-formula.png",
          "figureAlt": "Visual summary for 6.6 Output Size Formula",
          "html": "<p>The PyTorch <code>Conv2d</code> documentation gives the general output-size formula. For one spatial dimension, the output length is</p>\n<div class=\"math-display\">\\[\\left\\lfloor \\frac{n + 2p - d(f - 1) - 1}{s} \\right\\rfloor + 1\\]</div>\n<p>where:</p>\n<ul class=\"md-list\"><li>\\(n\\) is input size</li><li>\\(p\\) is padding</li><li>\\(d\\) is dilation</li><li>\\(f\\) is filter size</li><li>\\(s\\) is stride</li></ul>\n<p>If dilation is 1, this simplifies to the more familiar expression often used in lectures:</p>\n<div class=\"math-display\">\\[\\left\\lfloor \\frac{n + 2p - f}{s} \\right\\rfloor + 1\\]</div>\n<p>Students often lose easy points on exam questions here, so it is worth building intuition.</p>\n<p>If you increase padding, output size tends to grow.</p>\n<p>If you increase filter size while keeping everything else fixed, output size tends to shrink.</p>\n<p>If you increase stride, output size shrinks more quickly because you sample fewer positions.</p>",
          "wordCount": 125,
          "readMinutes": 1,
          "searchText": "The PyTorch Conv2d documentation gives the general output-size formula. For one spatial dimension, the output length is \\[\\left\\lfloor \\frac{n + 2p - d(f - 1) - 1}{s} \\right\\rfloor + 1\\] where: \\(n\\) is input size \\(p\\) is padding \\(d\\) is dilation \\(f\\) is filter size \\(s\\) is stride If dilation is 1, this simplifies to the more familiar expression often used in lectures: \\[\\left\\lfloor \\frac{n + 2p - f}{s} \\right\\rfloor + 1\\] Students often lose easy points on exam questions here, so it is worth building intuition. If you increase padding, output size tends to grow. If you increase filter size while keeping everything else fixed, output size tends to shrink. If you increase stride, output size shrinks more quickly because you sample fewer positions."
        },
        {
          "id": "convolutional-networks-07-worked-example-of-convolution-dimensions",
          "title": "6.7 Worked Example of Convolution Dimensions",
          "figureSrc": "figures/sections/ch06_s07_worked-example-of-convolution-dimensions.png",
          "figureAlt": "Visual summary for 6.7 Worked Example of Convolution Dimensions",
          "html": "<p>Suppose the input image is \\(32 \\times 32\\), the filter size is <code>5</code>, padding is <code>0</code>, and stride is <code>1</code>.</p>\n<p>Then the output size is</p>\n<div class=\"math-display\">\\[\\left\\lfloor \\frac{32 - 5}{1} \\right\\rfloor + 1 = 28\\]</div>\n<p>So each filter produces a \\(28 \\times 28\\) feature map.</p>\n<p>Now suppose we use padding <code>2</code> with the same setup:</p>\n<div class=\"math-display\">\\[\\left\\lfloor \\frac{32 + 4 - 5}{1} \\right\\rfloor + 1 = 32\\]</div>\n<p>Now the spatial size is preserved.</p>\n<p>This is why \\(3 \\times 3\\) filters with padding <code>1</code> are so common. They preserve spatial dimensions while still learning local structure.</p>",
          "wordCount": 96,
          "readMinutes": 1,
          "searchText": "Suppose the input image is \\(32 \\times 32\\), the filter size is 5 , padding is 0 , and stride is 1 . Then the output size is \\[\\left\\lfloor \\frac{32 - 5}{1} \\right\\rfloor + 1 = 28\\] So each filter produces a \\(28 \\times 28\\) feature map. Now suppose we use padding 2 with the same setup: \\[\\left\\lfloor \\frac{32 + 4 - 5}{1} \\right\\rfloor + 1 = 32\\] Now the spatial size is preserved. This is why \\(3 \\times 3\\) filters with padding 1 are so common. They preserve spatial dimensions while still learning local structure."
        },
        {
          "id": "convolutional-networks-08-parameter-counting-in-cnns",
          "title": "6.8 Parameter Counting in CNNs",
          "figureSrc": "figures/sections/ch06_s08_parameter-counting-in-cnns.png",
          "figureAlt": "Visual summary for 6.8 Parameter Counting in CNNs",
          "html": "<p>Counting parameters in CNNs is much easier than in dense layers once the pattern is clear.</p>\n<p>If a convolutional layer has:</p>\n<ul class=\"md-list\"><li>\\(C_in\\) input channels</li><li>\\(C_out\\) output channels</li><li>kernel size \\(f x f\\)</li></ul>\n<p>then the number of weights is</p>\n<div class=\"math-display\">\\[C_{\\mathrm{out}} \\cdot C_{\\mathrm{in}} \\cdot f \\cdot f\\]</div>\n<p>and if each output channel has a bias term, add \\(C_out\\) more parameters.</p>\n<p>Example:</p>\n<ul class=\"md-list\"><li>input channels = 3</li><li>output channels = 16</li><li>kernel size = \\(3 \\times 3\\)</li></ul>\n<p>Weights:</p>\n<div class=\"math-display\">\\[16 \\cdot 3 \\cdot 3 \\cdot 3 = 432\\]</div>\n<p>Biases:</p>\n<p><code>16</code></p>\n<p>Total:</p>\n<p><code>448</code></p>\n<p>Compare that with a fully connected layer from \\(32 \\times 32 \\times 3 = 3072\\) inputs to just 100 outputs:</p>\n<div class=\"math-display\">\\[3072 \\cdot 100 + 100 = 307300\\]</div>\n<p>This huge gap helps explain why CNNs are so much more suitable for image data.</p>",
          "wordCount": 129,
          "readMinutes": 1,
          "searchText": "Counting parameters in CNNs is much easier than in dense layers once the pattern is clear. If a convolutional layer has: \\(C_in\\) input channels \\(C_out\\) output channels kernel size \\(f x f\\) then the number of weights is \\[C_{\\mathrm{out}} \\cdot C_{\\mathrm{in}} \\cdot f \\cdot f\\] and if each output channel has a bias term, add \\(C_out\\) more parameters. Example: input channels = 3 output channels = 16 kernel size = \\(3 \\times 3\\) Weights: \\[16 \\cdot 3 \\cdot 3 \\cdot 3 = 432\\] Biases: 16 Total: 448 Compare that with a fully connected layer from \\(32 \\times 32 \\times 3 = 3072\\) inputs to just 100 outputs: \\[3072 \\cdot 100 + 100 = 307300\\] This huge gap helps explain why CNNs are so much more suitable for image data."
        },
        {
          "id": "convolutional-networks-09-pooling-and-subsampling",
          "title": "6.9 Pooling and Subsampling",
          "figureSrc": "figures/sections/ch06_s09_pooling-and-subsampling.png",
          "figureAlt": "Visual summary for 6.9 Pooling and Subsampling",
          "html": "<p>CNNs often reduce spatial resolution as depth increases. One classical way to do this is pooling.</p>\n<p>Max pooling replaces a local patch, such as \\(2 \\times 2\\), with its maximum value. Average pooling uses the average instead.</p>\n<p>Pooling helps in several ways:</p>\n<ul class=\"md-list\"><li>it reduces computation</li><li>it increases the effective receptive field of later units</li><li>it encourages some robustness to small translations</li><li>it pushes the network toward more abstract representations</li></ul>\n<p>Historically, pooling was a standard component of CNNs. In more modern architectures, strided convolutions are often used instead of or alongside pooling. The conceptual purpose is similar: reduce spatial resolution while preserving important information.</p>",
          "wordCount": 103,
          "readMinutes": 1,
          "searchText": "CNNs often reduce spatial resolution as depth increases. One classical way to do this is pooling. Max pooling replaces a local patch, such as \\(2 \\times 2\\), with its maximum value. Average pooling uses the average instead. Pooling helps in several ways: it reduces computation it increases the effective receptive field of later units it encourages some robustness to small translations it pushes the network toward more abstract representations Historically, pooling was a standard component of CNNs. In more modern architectures, strided convolutions are often used instead of or alongside pooling. The conceptual purpose is similar: reduce spatial resolution while preserving important information."
        },
        {
          "id": "convolutional-networks-10-receptive-field",
          "title": "6.10 Receptive Field",
          "figureSrc": "figures/sections/ch06_s10_receptive-field.png",
          "figureAlt": "Visual summary for 6.10 Receptive Field",
          "html": "<p>The receptive field of a unit is the region of the original input that can influence that unit.</p>\n<p>In a shallow layer with a \\(3 \\times 3\\) filter, the receptive field may be only a tiny local patch. After several layers, however, a deeper unit depends indirectly on a much larger part of the image.</p>\n<p>This matters because recognition requires different scales of understanding.</p>\n<p>An early layer may detect:</p>\n<ul class=\"md-list\"><li>edges</li><li>corners</li><li>tiny textures</li></ul>\n<p>A middle layer may detect:</p>\n<ul class=\"md-list\"><li>repeated motifs</li><li>contours</li><li>object parts</li></ul>\n<p>A deeper layer may respond to:</p>\n<ul class=\"md-list\"><li>faces</li><li>wheel-like structures</li><li>whole object arrangements</li></ul>\n<p>Receptive field is therefore one of the best concepts for understanding why depth helps. Depth allows small local operations to accumulate into broader contextual understanding.</p>",
          "wordCount": 120,
          "readMinutes": 1,
          "searchText": "The receptive field of a unit is the region of the original input that can influence that unit. In a shallow layer with a \\(3 \\times 3\\) filter, the receptive field may be only a tiny local patch. After several layers, however, a deeper unit depends indirectly on a much larger part of the image. This matters because recognition requires different scales of understanding. An early layer may detect: edges corners tiny textures A middle layer may detect: repeated motifs contours object parts A deeper layer may respond to: faces wheel-like structures whole object arrangements Receptive field is therefore one of the best concepts for understanding why depth helps. Depth allows small local operations to accumulate into broader contextual understanding."
        },
        {
          "id": "convolutional-networks-11-why-cnns-learn-hierarchies",
          "title": "6.11 Why CNNs Learn Hierarchies",
          "figureSrc": "figures/sections/ch06_s11_why-cnns-learn-hierarchies.png",
          "figureAlt": "Visual summary for 6.11 Why CNNs Learn Hierarchies",
          "html": "<p>One of the central claims of deep learning is that representations become more abstract as depth increases. CNNs make this especially visible.</p>\n<p>At the pixel level, the data is low-level and hard to interpret semantically. After the first convolutional layers, the model may detect lines and textures. Later, it can represent larger combinations of those patterns. Eventually it may produce features aligned with object identity or scene structure.</p>\n<p>This is not magic. It is the result of repeated composition:</p>\n<ul class=\"md-list\"><li>convolution extracts local patterns</li><li>nonlinearity reshapes the response</li><li>normalization stabilizes training</li><li>downsampling broadens the scale of representation</li></ul>\n<p>By stacking these operations many times, the network constructs hierarchical features.</p>",
          "wordCount": 107,
          "readMinutes": 1,
          "searchText": "One of the central claims of deep learning is that representations become more abstract as depth increases. CNNs make this especially visible. At the pixel level, the data is low-level and hard to interpret semantically. After the first convolutional layers, the model may detect lines and textures. Later, it can represent larger combinations of those patterns. Eventually it may produce features aligned with object identity or scene structure. This is not magic. It is the result of repeated composition: convolution extracts local patterns nonlinearity reshapes the response normalization stabilizes training downsampling broadens the scale of representation By stacking these operations many times, the network constructs hierarchical features."
        },
        {
          "id": "convolutional-networks-12-the-standard-cnn-block",
          "title": "6.12 The Standard CNN Block",
          "figureSrc": "figures/sections/ch06_s12_the-standard-cnn-block.png",
          "figureAlt": "Visual summary for 6.12 The Standard CNN Block",
          "html": "<p>A common CNN block contains:</p>\n<ul class=\"md-list\"><li>convolution</li><li>optional normalization</li><li>activation such as ReLU</li><li>sometimes pooling</li></ul>\n<p>The order may vary by architecture, but the guiding idea is stable: linear feature extraction, nonlinear transformation, and controlled propagation of information.</p>\n<p>ReLU became especially important because it helps gradients pass more effectively than older saturating nonlinearities such as sigmoid and tanh in many deep settings. This was one reason AlexNet was historically influential.</p>",
          "wordCount": 68,
          "readMinutes": 1,
          "searchText": "A common CNN block contains: convolution optional normalization activation such as ReLU sometimes pooling The order may vary by architecture, but the guiding idea is stable: linear feature extraction, nonlinear transformation, and controlled propagation of information. ReLU became especially important because it helps gradients pass more effectively than older saturating nonlinearities such as sigmoid and tanh in many deep settings. This was one reason AlexNet was historically influential."
        },
        {
          "id": "convolutional-networks-13-batch-normalization",
          "title": "6.13 Batch Normalization",
          "figureSrc": "figures/sections/ch06_s13_batch-normalization.png",
          "figureAlt": "Visual summary for 6.13 Batch Normalization",
          "html": "<p>Batch normalization was introduced by Ioffe and Szegedy in 2015. The original paper argued that deep networks are hard to train partly because the distribution of internal activations changes during training. Batch normalization normalizes activations using mini-batch statistics and then learns scale and shift parameters afterward.</p>\n<p>In practical terms, batch normalization often:</p>\n<ul class=\"md-list\"><li>stabilizes optimization</li><li>allows larger learning rates</li><li>reduces sensitivity to initialization</li><li>provides some regularization effect</li></ul>\n<p>The PyTorch <code>BatchNorm2d</code> module is the standard image-oriented version. In CNNs it is often applied per channel across a batch.</p>\n<p>Students should not memorize batch normalization as a slogan. The deeper point is that training very deep networks is not only about expressive power. It is also about maintaining numerically healthy signal flow.</p>",
          "wordCount": 119,
          "readMinutes": 1,
          "searchText": "Batch normalization was introduced by Ioffe and Szegedy in 2015. The original paper argued that deep networks are hard to train partly because the distribution of internal activations changes during training. Batch normalization normalizes activations using mini-batch statistics and then learns scale and shift parameters afterward. In practical terms, batch normalization often: stabilizes optimization allows larger learning rates reduces sensitivity to initialization provides some regularization effect The PyTorch BatchNorm2d module is the standard image-oriented version. In CNNs it is often applied per channel across a batch. Students should not memorize batch normalization as a slogan. The deeper point is that training very deep networks is not only about expressive power. It is also about maintaining numerically healthy signal flow."
        },
        {
          "id": "convolutional-networks-14-data-augmentation",
          "title": "6.14 Data Augmentation",
          "figureSrc": "figures/sections/ch06_s14_data-augmentation.png",
          "figureAlt": "Visual summary for 6.14 Data Augmentation",
          "html": "<p>Another major practical idea in image learning is data augmentation. Instead of training only on the original examples, we create modified versions that preserve the label, such as:</p>\n<ul class=\"md-list\"><li>random crops</li><li>horizontal flips</li><li>small rotations</li><li>color jitter</li><li>random erasing</li></ul>\n<p>This effectively enlarges the training distribution and teaches the model to ignore irrelevant variation.</p>\n<p>AlexNet famously combined architecture improvements with aggressive data augmentation and dropout. This is a useful reminder that breakthroughs often come from a system of ideas rather than one isolated trick.</p>",
          "wordCount": 82,
          "readMinutes": 1,
          "searchText": "Another major practical idea in image learning is data augmentation. Instead of training only on the original examples, we create modified versions that preserve the label, such as: random crops horizontal flips small rotations color jitter random erasing This effectively enlarges the training distribution and teaches the model to ignore irrelevant variation. AlexNet famously combined architecture improvements with aggressive data augmentation and dropout. This is a useful reminder that breakthroughs often come from a system of ideas rather than one isolated trick."
        },
        {
          "id": "convolutional-networks-15-historical-milestones-in-cnn-design",
          "title": "6.15 Historical Milestones in CNN Design",
          "figureSrc": "figures/sections/ch06_s15_historical-milestones-in-cnn-design.png",
          "figureAlt": "Visual summary for 6.15 Historical Milestones in CNN Design",
          "html": "<p>The architecture names in a deep-learning lecture are not trivia. They represent specific solutions to recurring design problems.</p>\n<h4>6.15.1 LeNet</h4>\n<p>LeNet is an early classic CNN designed for handwritten digit recognition. Its importance is mostly conceptual. It showed that local filters and subsampling were natural tools for image recognition long before modern large-scale deep learning.</p>\n<h4>6.15.2 AlexNet</h4>\n<p>AlexNet was the major 2012 breakthrough on ImageNet. The original paper by Krizhevsky, Sutskever, and Hinton combined several powerful ideas:</p>\n<ul class=\"md-list\"><li>deep convolutional structure</li><li>ReLU activations</li><li>dropout</li><li>data augmentation</li><li>large-scale GPU training</li></ul>\n<p>AlexNet was not merely a bigger CNN. It demonstrated that deep learned features could dominate hand-engineered vision pipelines when scale and training technique aligned.</p>\n<h4>6.15.3 VGG</h4>\n<p>VGG pushed the idea of using many small \\(3 \\times 3\\) convolutions stacked deeply. This showed that depth and repeated simple blocks could be very effective.</p>\n<p>The deeper lesson is that two \\(3 \\times 3\\) convolutions can achieve a larger effective receptive field than one shallow layer while adding more nonlinearities. That increases expressive power.</p>\n<h4>6.15.4 Inception and GoogLeNet</h4>\n<p>Inception architectures explored multi-branch processing within the same block. Instead of forcing one filter size everywhere, the block uses multiple paths and combines them. This increased representational richness while managing computational cost.</p>\n<h4>6.15.5 ResNet</h4>\n<p>ResNet addressed a central difficulty of deep networks: once depth becomes very large, optimization can deteriorate even when overfitting is not the main issue. Residual connections made it easier to train very deep models by letting layers learn refinements relative to an identity shortcut.</p>\n<h4>6.15.6 Xception and MobileNet</h4>\n<p>These architectures pushed efficiency further by using depthwise separable convolutions. The motivation was to reduce computation without giving up too much representational power.</p>\n<h4>6.15.7 EfficientNet</h4>\n<p>EfficientNet emphasized a different point: scaling a network well is not just making it deeper. Width, depth, and image resolution should be scaled in a balanced way.</p>\n<p>Taken together, these models show a progression:</p>\n<ul class=\"md-list\"><li>learn local visual features</li><li>make training deeper networks possible</li><li>improve efficiency</li><li>scale architecture more systematically</li></ul>\n<figure class=\"md-figure\"><img src=\"figures/ch06_residual_receptive.png\" alt=\"Depth increases the effective receptive field, and residual shortcuts help deep CNN blocks learn corrections instead of rebuilding the full representation from scratch.\" loading=\"lazy\" /><figcaption>Depth increases the effective receptive field, and residual shortcuts help deep CNN blocks learn corrections instead of rebuilding the full representation from scratch.</figcaption></figure>",
          "wordCount": 352,
          "readMinutes": 2,
          "searchText": "The architecture names in a deep-learning lecture are not trivia. They represent specific solutions to recurring design problems. 6.15.1 LeNet LeNet is an early classic CNN designed for handwritten digit recognition. Its importance is mostly conceptual. It showed that local filters and subsampling were natural tools for image recognition long before modern large-scale deep learning. 6.15.2 AlexNet AlexNet was the major 2012 breakthrough on ImageNet. The original paper by Krizhevsky, Sutskever, and Hinton combined several powerful ideas: deep convolutional structure ReLU activations dropout data augmentation large-scale GPU training AlexNet was not merely a bigger CNN. It demonstrated that deep learned features could dominate hand-engineered vision pipelines when scale and training technique aligned. 6.15.3 VGG VGG pushed the idea of using many small \\(3 \\times 3\\) convolutions stacked deeply. This showed that depth and repeated simple blocks could be very effective. The deeper lesson is that two \\(3 \\times 3\\) convolutions can achieve a larger effective receptive field than one shallow layer while adding more nonlinearities. That increases expressive power. 6.15.4 Inception and GoogLeNet Inception architectures explored multi-branch processing within the same block. Instead of forcing one filter size everywhere, the block uses multiple paths and combines them. This increased representational richness while managing computational cost. 6.15.5 ResNet ResNet addressed a central difficulty of deep networks: once depth becomes very large, optimization can deteriorate even when overfitting is not the main issue. Residual connections made it easier to train very deep models by letting layers learn refinements relative to an identity shortcut. 6.15.6 Xception and MobileNet These architectures pushed efficiency further by using depthwise separable convolutions. The motivation was to reduce computation without giving up too much representational power. 6.15.7 EfficientNet EfficientNet emphasized a different point: scaling a network well is not just making it deeper. Width, depth, and image resolution should be scaled in a balanced way. Taken together, these models show a progression: learn local visual features make training deeper networks possible improve efficiency scale architecture more systematically Depth increases the effective receptive field, and residual shortcuts help deep CNN blocks learn corrections instead of rebuilding the full representation from scratch."
        },
        {
          "id": "convolutional-networks-16-residual-learning-in-depth",
          "title": "6.16 Residual Learning in Depth",
          "figureSrc": "figures/sections/ch06_s16_residual-learning-in-depth.png",
          "figureAlt": "Visual summary for 6.16 Residual Learning in Depth",
          "html": "<p>Residual connections are one of the most important concepts in modern deep learning.</p>\n<p>In an ordinary stack of layers, each block must learn a full transformation from input to output. In a residual block, the block learns a correction to an identity path:</p>\n<div class=\"math-display\">\\[\\mathrm{output} = F(x) + x\\]</div>\n<p>where <code>F(x)</code> is the learned residual mapping.</p>\n<p>Why does this help?</p>\n<p>If the best behavior for some layers is close to identity, forcing them to learn that from scratch can be difficult. The residual structure gives the identity path for free and asks the block to learn only what should change.</p>\n<p>This helps:</p>\n<ul class=\"md-list\"><li>gradient flow</li><li>optimization of very deep networks</li><li>reuse of earlier information</li></ul>\n<p>A useful intuition is that residual blocks do not need to reinvent the representation at every layer. They can refine it gradually.</p>",
          "wordCount": 134,
          "readMinutes": 1,
          "searchText": "Residual connections are one of the most important concepts in modern deep learning. In an ordinary stack of layers, each block must learn a full transformation from input to output. In a residual block, the block learns a correction to an identity path: \\[\\mathrm{output} = F(x) + x\\] where F(x) is the learned residual mapping. Why does this help? If the best behavior for some layers is close to identity, forcing them to learn that from scratch can be difficult. The residual structure gives the identity path for free and asks the block to learn only what should change. This helps: gradient flow optimization of very deep networks reuse of earlier information A useful intuition is that residual blocks do not need to reinvent the representation at every layer. They can refine it gradually."
        },
        {
          "id": "convolutional-networks-17-depthwise-separable-convolution",
          "title": "6.17 Depthwise Separable Convolution",
          "figureSrc": "figures/sections/ch06_s17_depthwise-separable-convolution.png",
          "figureAlt": "Visual summary for 6.17 Depthwise Separable Convolution",
          "html": "<p>Standard convolution mixes two kinds of structure at once:</p>\n<ul class=\"md-list\"><li>spatial structure within each channel</li><li>interactions across channels</li></ul>\n<p>Depthwise separable convolution splits this into two stages.</p>\n<p>First, a depthwise convolution applies a spatial filter independently to each channel. Then a pointwise \\(1 \\times 1\\) convolution mixes information across channels.</p>\n<p>This can greatly reduce computation and parameter count. MobileNet and Xception made this design especially influential.</p>\n<p>The main lesson is not that standard convolution is obsolete. It is that architectural efficiency often comes from factorizing a large operation into smaller structured ones.</p>",
          "wordCount": 90,
          "readMinutes": 1,
          "searchText": "Standard convolution mixes two kinds of structure at once: spatial structure within each channel interactions across channels Depthwise separable convolution splits this into two stages. First, a depthwise convolution applies a spatial filter independently to each channel. Then a pointwise \\(1 \\times 1\\) convolution mixes information across channels. This can greatly reduce computation and parameter count. MobileNet and Xception made this design especially influential. The main lesson is not that standard convolution is obsolete. It is that architectural efficiency often comes from factorizing a large operation into smaller structured ones."
        },
        {
          "id": "convolutional-networks-18-1-x-1-convolutions",
          "title": "6.18 `1 x 1` Convolutions",
          "figureSrc": "figures/sections/ch06_s18_1-x-1-convolutions.png",
          "figureAlt": "Visual summary for 6.18 `1 x 1` Convolutions",
          "html": "<p>Students sometimes wonder what a \\(1 \\times 1\\) convolution could possibly do, since it does not look at a spatial neighborhood.</p>\n<p>Its job is not spatial aggregation. Its job is channel mixing.</p>\n<p>A \\(1 \\times 1\\) convolution can:</p>\n<ul class=\"md-list\"><li>increase or decrease channel dimension</li><li>combine information across feature maps</li><li>act as a learned linear projection at each spatial location</li></ul>\n<p>This makes it extremely useful in Inception blocks, bottleneck residual blocks, and efficient architectures.</p>",
          "wordCount": 72,
          "readMinutes": 1,
          "searchText": "Students sometimes wonder what a \\(1 \\times 1\\) convolution could possibly do, since it does not look at a spatial neighborhood. Its job is not spatial aggregation. Its job is channel mixing. A \\(1 \\times 1\\) convolution can: increase or decrease channel dimension combine information across feature maps act as a learned linear projection at each spatial location This makes it extremely useful in Inception blocks, bottleneck residual blocks, and efficient architectures."
        },
        {
          "id": "convolutional-networks-19-transfer-learning",
          "title": "6.19 Transfer Learning",
          "figureSrc": "figures/sections/ch06_s19_transfer-learning.png",
          "figureAlt": "Visual summary for 6.19 Transfer Learning",
          "html": "<p>Transfer learning is one of the most practical ideas in the entire course. Instead of training a deep network from random initialization for every new task, we start from a model pretrained on a large dataset such as ImageNet.</p>\n<p>Why is this powerful?</p>\n<p>Because many visual tasks share basic structure. The earliest layers of a pretrained model often learn edges, textures, and shape detectors that are useful across many domains.</p>\n<p>Transfer learning is especially helpful when:</p>\n<ul class=\"md-list\"><li>the target dataset is small</li><li>the target task is related to the source task</li><li>training compute is limited</li><li>fast experimentation matters</li></ul>\n<p>The PyTorch transfer-learning tutorial shows two common strategies that are also useful for exams.</p>\n<h4>6.19.1 Feature Extraction</h4>\n<p>Freeze most or all pretrained layers and train only a new classifier head. This is fast and works well when the target dataset is small or the task is fairly close to the source domain.</p>\n<h4>6.19.2 Fine-Tuning</h4>\n<p>Initialize from pretrained weights but allow some or all layers to keep learning on the new dataset. This usually gives stronger task adaptation but requires more care, more compute, and more data.</p>",
          "wordCount": 183,
          "readMinutes": 1,
          "searchText": "Transfer learning is one of the most practical ideas in the entire course. Instead of training a deep network from random initialization for every new task, we start from a model pretrained on a large dataset such as ImageNet. Why is this powerful? Because many visual tasks share basic structure. The earliest layers of a pretrained model often learn edges, textures, and shape detectors that are useful across many domains. Transfer learning is especially helpful when: the target dataset is small the target task is related to the source task training compute is limited fast experimentation matters The PyTorch transfer-learning tutorial shows two common strategies that are also useful for exams. 6.19.1 Feature Extraction Freeze most or all pretrained layers and train only a new classifier head. This is fast and works well when the target dataset is small or the task is fairly close to the source domain. 6.19.2 Fine-Tuning Initialize from pretrained weights but allow some or all layers to keep learning on the new dataset. This usually gives stronger task adaptation but requires more care, more compute, and more data."
        },
        {
          "id": "convolutional-networks-20-when-to-freeze-and-when-to-fine-tune",
          "title": "6.20 When to Freeze and When to Fine-Tune",
          "figureSrc": "figures/sections/ch06_s20_when-to-freeze-and-when-to-fine-tune.png",
          "figureAlt": "Visual summary for 6.20 When to Freeze and When to Fine-Tune",
          "html": "<p>There is no universal rule, but there are good heuristics.</p>\n<p>Freeze more layers when:</p>\n<ul class=\"md-list\"><li>the new dataset is small</li><li>the new domain is similar to the source</li><li>overfitting is a serious concern</li></ul>\n<p>Fine-tune more layers when:</p>\n<ul class=\"md-list\"><li>the new dataset is large enough</li><li>the target domain differs substantially</li><li>the final performance matters more than speed</li></ul>\n<p>A good answer on an exam should mention the tradeoff between reuse and adaptation. Freezing preserves generic knowledge and reduces training burden. Fine-tuning allows specialization but increases the risk of overfitting and instability.</p>",
          "wordCount": 87,
          "readMinutes": 1,
          "searchText": "There is no universal rule, but there are good heuristics. Freeze more layers when: the new dataset is small the new domain is similar to the source overfitting is a serious concern Fine-tune more layers when: the new dataset is large enough the target domain differs substantially the final performance matters more than speed A good answer on an exam should mention the tradeoff between reuse and adaptation. Freezing preserves generic knowledge and reduces training burden. Fine-tuning allows specialization but increases the risk of overfitting and instability."
        },
        {
          "id": "convolutional-networks-21-cnns-in-the-course-homework",
          "title": "6.21 CNNs in the Course Homework",
          "figureSrc": "figures/sections/ch06_s21_cnns-in-the-course-homework.png",
          "figureAlt": "Visual summary for 6.21 CNNs in the Course Homework",
          "html": "<p>The weather or precipitation nowcasting assignment is a beautiful example of why architectural bias matters.</p>\n<p>The input is a \\(5 \\times 5 \\times 3\\) spatial grid. A dense network can flatten this into a vector, but doing so throws away the very spatial arrangement that likely matters most. A CNN instead treats the input as a tiny image-like object and learns local filters over it.</p>\n<p>This is exactly the kind of modeling judgment a good machine-learning practitioner must develop. The model should reflect the structure of the data.</p>\n<p>When the data has:</p>\n<ul class=\"md-list\"><li>spatial locality</li><li>nearby interactions</li><li>translation-like patterns</li></ul>\n<p>a CNN is usually more natural than a plain multilayer perceptron.</p>",
          "wordCount": 109,
          "readMinutes": 1,
          "searchText": "The weather or precipitation nowcasting assignment is a beautiful example of why architectural bias matters. The input is a \\(5 \\times 5 \\times 3\\) spatial grid. A dense network can flatten this into a vector, but doing so throws away the very spatial arrangement that likely matters most. A CNN instead treats the input as a tiny image-like object and learns local filters over it. This is exactly the kind of modeling judgment a good machine-learning practitioner must develop. The model should reflect the structure of the data. When the data has: spatial locality nearby interactions translation-like patterns a CNN is usually more natural than a plain multilayer perceptron."
        },
        {
          "id": "convolutional-networks-22-common-exam-calculations",
          "title": "6.22 Common Exam Calculations",
          "figureSrc": "figures/sections/ch06_s22_common-exam-calculations.png",
          "figureAlt": "Visual summary for 6.22 Common Exam Calculations",
          "html": "<p>There are a few standard calculation types students should be ready for.</p>\n<h4>6.22.1 Output Shape</h4>\n<p>Given image size, filter size, padding, stride, and dilation, compute the output dimensions.</p>\n<h4>6.22.2 Parameter Count</h4>\n<p>Given input channels, output channels, and kernel size, compute the number of weights and biases.</p>\n<h4>6.22.3 Receptive Field Intuition</h4>\n<p>Explain why deeper layers can capture more global structure even if every filter is small.</p>\n<h4>6.22.4 Architecture Choice</h4>\n<p>Explain why CNNs are preferred over dense networks for images or grids.</p>\n<h4>6.22.5 Transfer Learning Strategy</h4>\n<p>Explain when you would use frozen pretrained features versus full fine-tuning.</p>\n<p>These are excellent exam topics because they reveal whether the student understands the mechanics and the reasoning behind them.</p>",
          "wordCount": 114,
          "readMinutes": 1,
          "searchText": "There are a few standard calculation types students should be ready for. 6.22.1 Output Shape Given image size, filter size, padding, stride, and dilation, compute the output dimensions. 6.22.2 Parameter Count Given input channels, output channels, and kernel size, compute the number of weights and biases. 6.22.3 Receptive Field Intuition Explain why deeper layers can capture more global structure even if every filter is small. 6.22.4 Architecture Choice Explain why CNNs are preferred over dense networks for images or grids. 6.22.5 Transfer Learning Strategy Explain when you would use frozen pretrained features versus full fine-tuning. These are excellent exam topics because they reveal whether the student understands the mechanics and the reasoning behind them."
        },
        {
          "id": "convolutional-networks-23-common-misunderstandings",
          "title": "6.23 Common Misunderstandings",
          "figureSrc": "figures/sections/ch06_s23_common-misunderstandings.png",
          "figureAlt": "Visual summary for 6.23 Common Misunderstandings",
          "html": "<p>Students often make the following mistakes.</p>\n<ul class=\"md-list\"><li>thinking CNNs are just large fully connected networks</li><li>assuming pooling is the only way to reduce spatial size</li><li>memorizing architecture names without understanding their contribution</li><li>claiming ResNet works because it is deeper, without mentioning residual connections and optimization</li><li>saying transfer learning is useful only when the new task is identical to the old one</li><li>treating \\(1 \\times 1\\) convolution as pointless because it does not span space</li></ul>\n<p>Each of these misses the underlying design logic.</p>",
          "wordCount": 81,
          "readMinutes": 1,
          "searchText": "Students often make the following mistakes. thinking CNNs are just large fully connected networks assuming pooling is the only way to reduce spatial size memorizing architecture names without understanding their contribution claiming ResNet works because it is deeper, without mentioning residual connections and optimization saying transfer learning is useful only when the new task is identical to the old one treating \\(1 \\times 1\\) convolution as pointless because it does not span space Each of these misses the underlying design logic."
        },
        {
          "id": "convolutional-networks-24-big-picture-summary",
          "title": "6.24 Big Picture Summary",
          "figureSrc": "figures/sections/ch06_s24_big-picture-summary.png",
          "figureAlt": "Visual summary for 6.24 Big Picture Summary",
          "html": "<p>CNNs are powerful because they encode the right assumptions for spatial data. They use local connectivity, shared filters, and hierarchical feature learning to turn pixels or grids into increasingly meaningful representations. Pooling and strided convolutions reduce spatial size. Receptive fields grow with depth. Batch normalization and residual connections make training deeper networks practical. Efficient architectures such as MobileNet and EfficientNet show that performance depends not only on accuracy but also on computation and scaling strategy. Transfer learning makes these models useful far beyond their original training task.</p>\n<p>If you remember one sentence from this chapter, remember this: convolutional architectures succeed not because they are mysterious, but because they express the geometry of the data much better than a generic fully connected network does.</p>",
          "wordCount": 123,
          "readMinutes": 1,
          "searchText": "CNNs are powerful because they encode the right assumptions for spatial data. They use local connectivity, shared filters, and hierarchical feature learning to turn pixels or grids into increasingly meaningful representations. Pooling and strided convolutions reduce spatial size. Receptive fields grow with depth. Batch normalization and residual connections make training deeper networks practical. Efficient architectures such as MobileNet and EfficientNet show that performance depends not only on accuracy but also on computation and scaling strategy. Transfer learning makes these models useful far beyond their original training task. If you remember one sentence from this chapter, remember this: convolutional architectures succeed not because they are mysterious, but because they express the geometry of the data much better than a generic fully connected network does."
        },
        {
          "id": "convolutional-networks-25-primary-references-used-to-expand-this-chapter",
          "title": "6.25 Primary References Used to Expand This Chapter",
          "figureSrc": "figures/sections/ch06_s25_primary-references-used-to-expand-this-chapter.png",
          "figureAlt": "Visual summary for 6.25 Primary References Used to Expand This Chapter",
          "html": "<ul class=\"md-list\"><li>PyTorch <code>Conv2d</code> documentation: <a href=\"https://docs.pytorch.org/docs/stable/generated/torch.nn.modules.conv.Conv2d.html\" target=\"_blank\" rel=\"noreferrer\">https://docs.pytorch.org/docs/stable/generated/torch.nn.modules.conv.Conv2d.html</a></li><li>PyTorch <code>BatchNorm2d</code> documentation: <a href=\"https://docs.pytorch.org/docs/stable/generated/torch.nn.BatchNorm2d\" target=\"_blank\" rel=\"noreferrer\">https://docs.pytorch.org/docs/stable/generated/torch.nn.BatchNorm2d</a></li><li>Ioffe, S. and Szegedy, C. &quot;Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift&quot; (ICML 2015): <a href=\"https://proceedings.mlr.press/v37/ioffe15.html\" target=\"_blank\" rel=\"noreferrer\">https://proceedings.mlr.press/v37/ioffe15.html</a></li><li>Krizhevsky, A., Sutskever, I., and Hinton, G. &quot;ImageNet Classification with Deep Convolutional Neural Networks&quot; (NeurIPS 2012): <a href=\"https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks\" target=\"_blank\" rel=\"noreferrer\">https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks</a></li><li>He, K., Zhang, X., Ren, S., and Sun, J. &quot;Deep Residual Learning for Image Recognition&quot; (CVPR 2016): <a href=\"https://openaccess.thecvf.com/content_cvpr_2016/html/He_Deep_Residual_Learning_CVPR_2016_paper.html\" target=\"_blank\" rel=\"noreferrer\">https://openaccess.thecvf.com/content_cvpr_2016/html/He_Deep_Residual_Learning_CVPR_2016_paper.html</a></li><li>Chollet, F. &quot;Xception: Deep Learning with Depthwise Separable Convolutions&quot; (CVPR 2017): <a href=\"https://openaccess.thecvf.com/content_cvpr_2017/html/Chollet_Xception_Deep_Learning_CVPR_2017_paper.html\" target=\"_blank\" rel=\"noreferrer\">https://openaccess.thecvf.com/content_cvpr_2017/html/Chollet_Xception_Deep_Learning_CVPR_2017_paper.html</a></li><li>Howard, A. et al. &quot;MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications&quot; (2017): <a href=\"https://arxiv.org/abs/1704.04861\" target=\"_blank\" rel=\"noreferrer\">https://arxiv.org/abs/1704.04861</a></li><li>Tan, M. and Le, Q. &quot;EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks&quot; (ICML 2019): <a href=\"https://proceedings.mlr.press/v97/tan19a.html\" target=\"_blank\" rel=\"noreferrer\">https://proceedings.mlr.press/v97/tan19a.html</a></li><li>PyTorch transfer learning tutorial: <a href=\"https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html\" target=\"_blank\" rel=\"noreferrer\">https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html</a></li></ul>",
          "wordCount": 110,
          "readMinutes": 1,
          "searchText": "PyTorch Conv2d documentation: https://docs.pytorch.org/docs/stable/generated/torch.nn.modules.conv.Conv2d.html PyTorch BatchNorm2d documentation: https://docs.pytorch.org/docs/stable/generated/torch.nn.BatchNorm2d Ioffe, S. and Szegedy, C. &quot;Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift&quot; (ICML 2015): https://proceedings.mlr.press/v37/ioffe15.html Krizhevsky, A., Sutskever, I., and Hinton, G. &quot;ImageNet Classification with Deep Convolutional Neural Networks&quot; (NeurIPS 2012): https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks He, K., Zhang, X., Ren, S., and Sun, J. &quot;Deep Residual Learning for Image Recognition&quot; (CVPR 2016): https://openaccess.thecvf.com/content_cvpr_2016/html/He_Deep_Residual_Learning_CVPR_2016_paper.html Chollet, F. &quot;Xception: Deep Learning with Depthwise Separable Convolutions&quot; (CVPR 2017): https://openaccess.thecvf.com/content_cvpr_2017/html/Chollet_Xception_Deep_Learning_CVPR_2017_paper.html Howard, A. et al. &quot;MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications&quot; (2017): https://arxiv.org/abs/1704.04861 Tan, M. and Le, Q. &quot;EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks&quot; (ICML 2019): https://proceedings.mlr.press/v97/tan19a.html PyTorch transfer learning tutorial: https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html"
        }
      ],
      "wordCount": 3902,
      "sectionCount": 25,
      "readMinutes": 22,
      "searchText": "The first neural-network chapter explained the general language of deep learning: layers, activations, losses, gradients, optimization, and regularization. This second chapter asks a more focused question: how should we design networks when the input has spatial structure, especially image-like structure? That question matters because many real datasets are not just unordered vectors. Images, maps, weather grids, spectrograms, and many biomedical signals have nearby values that are strongly related. A model that ignores that structure will often need more parameters, more data, and more training time than a model that respects it. Convolutional neural networks, or CNNs, became successful because they encode the right inductive bias for this kind of data. They assume that local patterns matter, that the same kind of pattern may appear in multiple locations, and that useful representations should become increasingly abstract as we move deeper into the network. This chapter develops that idea carefully. We will begin with the motivation for convolutions, then study how convolutional layers actually work, how dimensions change through the network, why receptive fields matter, and how deeper architectures such as AlexNet, ResNet, MobileNet, and EfficientNet fit into the bigger story. We will also study transfer learning, which is one of the most practical and exam-relevant uses of modern deep learning. A convolutional network keeps image structure intact by sliding filters across local patches, building feature maps, pooling stronger signals, and finally producing class scores. Suppose we flatten a color image into one giant vector and feed it into a fully connected network. In principle, this can work. A fully connected network is expressive enough to approximate very complex functions. But the representation is wasteful. The problem is not that the network is incapable. The problem is that it has no built-in understanding of spatial structure. In an image: nearby pixels tend to be related edges, corners, and textures often matter more than isolated pixel values the same visual pattern can appear in different locations higher-level concepts such as eyes, wheels, or rooftops are built from smaller local patterns A fully connected layer treats pixel 1 and pixel 10000 as just two coordinates in a vector. It does not know that some pixels are neighbors or that a vertical edge on the left side and the same vertical edge on the right side should be detected by similar computations. This leads to three major inefficiencies: too many parameters weak inductive bias for spatial data poor reuse of learned local patterns Convolutional networks solve these problems by forcing the model to look locally, reuse filters across positions, and build deeper representations from simpler ones. Two ideas define CNNs. The first is local connectivity. Instead of connecting every neuron to every pixel, a neuron in a convolutional layer only sees a small patch of the input, such as a \\(3 \\times 3\\) or \\(5 \\times 5\\) region. This matches the idea that many useful visual features are local. The second is parameter sharing. The same learned filter is applied across many positions in the image. If a filter learns to detect a horizontal edge, it can detect that edge anywhere, not just in one fixed location. These two ideas drastically reduce parameter count. They also encourage a model to learn features that generalize across space. This is one of the most important conceptual differences between dense networks and CNNs. A dense network learns many position-specific interactions. A CNN learns reusable local feature detectors. In deep learning libraries, what is usually called convolution is technically cross-correlation, but the standard name remains convolutional layer. The PyTorch Conv2d documentation describes it as applying a 2D convolution over an input with shape (N, C_in, H, W) to produce an output with shape (N, C_out, H_out, W_out) . Here is the practical picture. We choose a small filter, also called a kernel, such as \\(3 \\times 3\\). That filter contains learned weights. We place it over a local patch of the input, multiply corresponding entries, sum them, optionally add a bias, and produce one output number. Then we slide the filter to another position and repeat the process. The output of one filter over all positions is called a feature map. If we use many filters, we get many feature maps. Each one can learn to respond to a different pattern: horizontal edges vertical edges color contrasts corner-like structures textures Later layers operate on these feature maps rather than raw pixels, allowing the network to build more abstract concepts from simpler ones. Real images usually have multiple channels, such as red, green, and blue. Therefore a convolutional filter is not just a small \\(f x f\\) patch. It spans all input channels. For an RGB image, a \\(3 \\times 3\\) filter really has shape \\(3 \\times 3 \\times 3\\). This means a filter is free to learn patterns that combine color and shape. One filter may respond strongly to bright horizontal transitions. Another may react to a particular color contrast. Another may capture texture. The number of output channels equals the number of filters we choose. If a layer has 64 filters, it produces 64 feature maps. Those maps become the input channels for the next layer. This explains why deeper CNNs often have increasing channel counts. As spatial resolution shrinks, the model can afford to represent more feature types. Three settings strongly affect how a convolution behaves. Stride controls how far the filter moves between positions. A stride of 1 means the filter moves one pixel at a time. A larger stride reduces spatial resolution more aggressively. Padding adds extra border values, often zeros, around the input. Padding helps preserve spatial size and allows edge pixels to participate more fully in computations. Dilation spaces out the filter elements. Instead of sampling adjacent positions only, the filter can view a wider area while keeping the same number of weights. These are not minor implementation details. They change what information each unit sees and how quickly the spatial size changes across layers. The PyTorch Conv2d documentation gives the general output-size formula. For one spatial dimension, the output length is \\[\\left\\lfloor \\frac{n + 2p - d(f - 1) - 1}{s} \\right\\rfloor + 1\\] where: \\(n\\) is input size \\(p\\) is padding \\(d\\) is dilation \\(f\\) is filter size \\(s\\) is stride If dilation is 1, this simplifies to the more familiar expression often used in lectures: \\[\\left\\lfloor \\frac{n + 2p - f}{s} \\right\\rfloor + 1\\] Students often lose easy points on exam questions here, so it is worth building intuition. If you increase padding, output size tends to grow. If you increase filter size while keeping everything else fixed, output size tends to shrink. If you increase stride, output size shrinks more quickly because you sample fewer positions. Suppose the input image is \\(32 \\times 32\\), the filter size is 5 , padding is 0 , and stride is 1 . Then the output size is \\[\\left\\lfloor \\frac{32 - 5}{1} \\right\\rfloor + 1 = 28\\] So each filter produces a \\(28 \\times 28\\) feature map. Now suppose we use padding 2 with the same setup: \\[\\left\\lfloor \\frac{32 + 4 - 5}{1} \\right\\rfloor + 1 = 32\\] Now the spatial size is preserved. This is why \\(3 \\times 3\\) filters with padding 1 are so common. They preserve spatial dimensions while still learning local structure. Counting parameters in CNNs is much easier than in dense layers once the pattern is clear. If a convolutional layer has: \\(C_in\\) input channels \\(C_out\\) output channels kernel size \\(f x f\\) then the number of weights is \\[C_{\\mathrm{out}} \\cdot C_{\\mathrm{in}} \\cdot f \\cdot f\\] and if each output channel has a bias term, add \\(C_out\\) more parameters. Example: input channels = 3 output channels = 16 kernel size = \\(3 \\times 3\\) Weights: \\[16 \\cdot 3 \\cdot 3 \\cdot 3 = 432\\] Biases: 16 Total: 448 Compare that with a fully connected layer from \\(32 \\times 32 \\times 3 = 3072\\) inputs to just 100 outputs: \\[3072 \\cdot 100 + 100 = 307300\\] This huge gap helps explain why CNNs are so much more suitable for image data. CNNs often reduce spatial resolution as depth increases. One classical way to do this is pooling. Max pooling replaces a local patch, such as \\(2 \\times 2\\), with its maximum value. Average pooling uses the average instead. Pooling helps in several ways: it reduces computation it increases the effective receptive field of later units it encourages some robustness to small translations it pushes the network toward more abstract representations Historically, pooling was a standard component of CNNs. In more modern architectures, strided convolutions are often used instead of or alongside pooling. The conceptual purpose is similar: reduce spatial resolution while preserving important information. The receptive field of a unit is the region of the original input that can influence that unit. In a shallow layer with a \\(3 \\times 3\\) filter, the receptive field may be only a tiny local patch. After several layers, however, a deeper unit depends indirectly on a much larger part of the image. This matters because recognition requires different scales of understanding. An early layer may detect: edges corners tiny textures A middle layer may detect: repeated motifs contours object parts A deeper layer may respond to: faces wheel-like structures whole object arrangements Receptive field is therefore one of the best concepts for understanding why depth helps. Depth allows small local operations to accumulate into broader contextual understanding. One of the central claims of deep learning is that representations become more abstract as depth increases. CNNs make this especially visible. At the pixel level, the data is low-level and hard to interpret semantically. After the first convolutional layers, the model may detect lines and textures. Later, it can represent larger combinations of those patterns. Eventually it may produce features aligned with object identity or scene structure. This is not magic. It is the result of repeated composition: convolution extracts local patterns nonlinearity reshapes the response normalization stabilizes training downsampling broadens the scale of representation By stacking these operations many times, the network constructs hierarchical features. A common CNN block contains: convolution optional normalization activation such as ReLU sometimes pooling The order may vary by architecture, but the guiding idea is stable: linear feature extraction, nonlinear transformation, and controlled propagation of information. ReLU became especially important because it helps gradients pass more effectively than older saturating nonlinearities such as sigmoid and tanh in many deep settings. This was one reason AlexNet was historically influential. Batch normalization was introduced by Ioffe and Szegedy in 2015. The original paper argued that deep networks are hard to train partly because the distribution of internal activations changes during training. Batch normalization normalizes activations using mini-batch statistics and then learns scale and shift parameters afterward. In practical terms, batch normalization often: stabilizes optimization allows larger learning rates reduces sensitivity to initialization provides some regularization effect The PyTorch BatchNorm2d module is the standard image-oriented version. In CNNs it is often applied per channel across a batch. Students should not memorize batch normalization as a slogan. The deeper point is that training very deep networks is not only about expressive power. It is also about maintaining numerically healthy signal flow. Another major practical idea in image learning is data augmentation. Instead of training only on the original examples, we create modified versions that preserve the label, such as: random crops horizontal flips small rotations color jitter random erasing This effectively enlarges the training distribution and teaches the model to ignore irrelevant variation. AlexNet famously combined architecture improvements with aggressive data augmentation and dropout. This is a useful reminder that breakthroughs often come from a system of ideas rather than one isolated trick. The architecture names in a deep-learning lecture are not trivia. They represent specific solutions to recurring design problems. 6.15.1 LeNet LeNet is an early classic CNN designed for handwritten digit recognition. Its importance is mostly conceptual. It showed that local filters and subsampling were natural tools for image recognition long before modern large-scale deep learning. 6.15.2 AlexNet AlexNet was the major 2012 breakthrough on ImageNet. The original paper by Krizhevsky, Sutskever, and Hinton combined several powerful ideas: deep convolutional structure ReLU activations dropout data augmentation large-scale GPU training AlexNet was not merely a bigger CNN. It demonstrated that deep learned features could dominate hand-engineered vision pipelines when scale and training technique aligned. 6.15.3 VGG VGG pushed the idea of using many small \\(3 \\times 3\\) convolutions stacked deeply. This showed that depth and repeated simple blocks could be very effective. The deeper lesson is that two \\(3 \\times 3\\) convolutions can achieve a larger effective receptive field than one shallow layer while adding more nonlinearities. That increases expressive power. 6.15.4 Inception and GoogLeNet Inception architectures explored multi-branch processing within the same block. Instead of forcing one filter size everywhere, the block uses multiple paths and combines them. This increased representational richness while managing computational cost. 6.15.5 ResNet ResNet addressed a central difficulty of deep networks: once depth becomes very large, optimization can deteriorate even when overfitting is not the main issue. Residual connections made it easier to train very deep models by letting layers learn refinements relative to an identity shortcut. 6.15.6 Xception and MobileNet These architectures pushed efficiency further by using depthwise separable convolutions. The motivation was to reduce computation without giving up too much representational power. 6.15.7 EfficientNet EfficientNet emphasized a different point: scaling a network well is not just making it deeper. Width, depth, and image resolution should be scaled in a balanced way. Taken together, these models show a progression: learn local visual features make training deeper networks possible improve efficiency scale architecture more systematically Depth increases the effective receptive field, and residual shortcuts help deep CNN blocks learn corrections instead of rebuilding the full representation from scratch. Residual connections are one of the most important concepts in modern deep learning. In an ordinary stack of layers, each block must learn a full transformation from input to output. In a residual block, the block learns a correction to an identity path: \\[\\mathrm{output} = F(x) + x\\] where F(x) is the learned residual mapping. Why does this help? If the best behavior for some layers is close to identity, forcing them to learn that from scratch can be difficult. The residual structure gives the identity path for free and asks the block to learn only what should change. This helps: gradient flow optimization of very deep networks reuse of earlier information A useful intuition is that residual blocks do not need to reinvent the representation at every layer. They can refine it gradually. Standard convolution mixes two kinds of structure at once: spatial structure within each channel interactions across channels Depthwise separable convolution splits this into two stages. First, a depthwise convolution applies a spatial filter independently to each channel. Then a pointwise \\(1 \\times 1\\) convolution mixes information across channels. This can greatly reduce computation and parameter count. MobileNet and Xception made this design especially influential. The main lesson is not that standard convolution is obsolete. It is that architectural efficiency often comes from factorizing a large operation into smaller structured ones. Students sometimes wonder what a \\(1 \\times 1\\) convolution could possibly do, since it does not look at a spatial neighborhood. Its job is not spatial aggregation. Its job is channel mixing. A \\(1 \\times 1\\) convolution can: increase or decrease channel dimension combine information across feature maps act as a learned linear projection at each spatial location This makes it extremely useful in Inception blocks, bottleneck residual blocks, and efficient architectures. Transfer learning is one of the most practical ideas in the entire course. Instead of training a deep network from random initialization for every new task, we start from a model pretrained on a large dataset such as ImageNet. Why is this powerful? Because many visual tasks share basic structure. The earliest layers of a pretrained model often learn edges, textures, and shape detectors that are useful across many domains. Transfer learning is especially helpful when: the target dataset is small the target task is related to the source task training compute is limited fast experimentation matters The PyTorch transfer-learning tutorial shows two common strategies that are also useful for exams. 6.19.1 Feature Extraction Freeze most or all pretrained layers and train only a new classifier head. This is fast and works well when the target dataset is small or the task is fairly close to the source domain. 6.19.2 Fine-Tuning Initialize from pretrained weights but allow some or all layers to keep learning on the new dataset. This usually gives stronger task adaptation but requires more care, more compute, and more data. There is no universal rule, but there are good heuristics. Freeze more layers when: the new dataset is small the new domain is similar to the source overfitting is a serious concern Fine-tune more layers when: the new dataset is large enough the target domain differs substantially the final performance matters more than speed A good answer on an exam should mention the tradeoff between reuse and adaptation. Freezing preserves generic knowledge and reduces training burden. Fine-tuning allows specialization but increases the risk of overfitting and instability. The weather or precipitation nowcasting assignment is a beautiful example of why architectural bias matters. The input is a \\(5 \\times 5 \\times 3\\) spatial grid. A dense network can flatten this into a vector, but doing so throws away the very spatial arrangement that likely matters most. A CNN instead treats the input as a tiny image-like object and learns local filters over it. This is exactly the kind of modeling judgment a good machine-learning practitioner must develop. The model should reflect the structure of the data. When the data has: spatial locality nearby interactions translation-like patterns a CNN is usually more natural than a plain multilayer perceptron. There are a few standard calculation types students should be ready for. 6.22.1 Output Shape Given image size, filter size, padding, stride, and dilation, compute the output dimensions. 6.22.2 Parameter Count Given input channels, output channels, and kernel size, compute the number of weights and biases. 6.22.3 Receptive Field Intuition Explain why deeper layers can capture more global structure even if every filter is small. 6.22.4 Architecture Choice Explain why CNNs are preferred over dense networks for images or grids. 6.22.5 Transfer Learning Strategy Explain when you would use frozen pretrained features versus full fine-tuning. These are excellent exam topics because they reveal whether the student understands the mechanics and the reasoning behind them. Students often make the following mistakes. thinking CNNs are just large fully connected networks assuming pooling is the only way to reduce spatial size memorizing architecture names without understanding their contribution claiming ResNet works because it is deeper, without mentioning residual connections and optimization saying transfer learning is useful only when the new task is identical to the old one treating \\(1 \\times 1\\) convolution as pointless because it does not span space Each of these misses the underlying design logic. CNNs are powerful because they encode the right assumptions for spatial data. They use local connectivity, shared filters, and hierarchical feature learning to turn pixels or grids into increasingly meaningful representations. Pooling and strided convolutions reduce spatial size. Receptive fields grow with depth. Batch normalization and residual connections make training deeper networks practical. Efficient architectures such as MobileNet and EfficientNet show that performance depends not only on accuracy but also on computation and scaling strategy. Transfer learning makes these models useful far beyond their original training task. If you remember one sentence from this chapter, remember this: convolutional architectures succeed not because they are mysterious, but because they express the geometry of the data much better than a generic fully connected network does. PyTorch Conv2d documentation: https://docs.pytorch.org/docs/stable/generated/torch.nn.modules.conv.Conv2d.html PyTorch BatchNorm2d documentation: https://docs.pytorch.org/docs/stable/generated/torch.nn.BatchNorm2d Ioffe, S. and Szegedy, C. &quot;Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift&quot; (ICML 2015): https://proceedings.mlr.press/v37/ioffe15.html Krizhevsky, A., Sutskever, I., and Hinton, G. &quot;ImageNet Classification with Deep Convolutional Neural Networks&quot; (NeurIPS 2012): https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks He, K., Zhang, X., Ren, S., and Sun, J. &quot;Deep Residual Learning for Image Recognition&quot; (CVPR 2016): https://openaccess.thecvf.com/content_cvpr_2016/html/He_Deep_Residual_Learning_CVPR_2016_paper.html Chollet, F. &quot;Xception: Deep Learning with Depthwise Separable Convolutions&quot; (CVPR 2017): https://openaccess.thecvf.com/content_cvpr_2017/html/Chollet_Xception_Deep_Learning_CVPR_2017_paper.html Howard, A. et al. &quot;MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications&quot; (2017): https://arxiv.org/abs/1704.04861 Tan, M. and Le, Q. &quot;EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks&quot; (ICML 2019): https://proceedings.mlr.press/v97/tan19a.html PyTorch transfer learning tutorial: https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html CNNs succeed because they stop pretending an image is just a long flat list of numbers. They respect locality, reuse filters across positions, and build higher-level features from lower-level ones. Think of a CNN as a hierarchy of feature detectors. Early filters notice edges and textures. Middle layers combine them into parts. Deeper layers combine parts into larger structures or categories. The same idea of architectural bias shows up again in sequence models and generative AI: the model works better when its structure matches the structure of the data. I can explain local connectivity and weight sharing. I can compute convolution output size from the formula. I can count convolutional parameters without mixing them up with dense-layer counts. I can explain why residual connections and transfer learning matter practically. Convolution output size This gives the output length of one spatial dimension after convolution. Padding grows the effective input, larger filters consume more space, and stride samples fewer positions. Convolution parameter count This counts weights and biases in a standard 2D convolution layer. The key difference from a dense layer is that the same filter weights are reused across spatial locations. Residual block idea A residual block learns a correction on top of an identity path. This helps very deep networks refine representations instead of rebuilding them from scratch every layer. Why a 3 x 3 filter can still build global understanding A single \\(3 \\times 3\\) filter only sees a tiny patch, so it may seem too local to recognize anything meaningful. That is true for one layer only. After several layers, each unit depends on outputs from earlier units, so its effective receptive field grows. Small local filters can therefore accumulate into larger-scale understanding through depth. Why transfer learning is so strong on small datasets You have a small medical-image dataset and cannot train a giant image model from scratch well. A pretrained model already knows many low-level visual patterns such as edges and textures. Reusing those features gives a much better starting point than random initialization, especially when your new dataset is small. Why does parameter sharing help both learning and efficiency? Because the same filter can detect the same kind of pattern anywhere in the image, which reduces parameters and encourages reuse of meaningful local features. Why is a 1 x 1 convolution useful even though it has almost no spatial extent? Because it mixes information across channels and can change channel dimension, acting like a learned projection at each spatial location. What problem did ResNet mainly solve? It mainly improved optimization of very deep networks by allowing identity shortcuts and better gradient flow through residual connections. Why is a CNN more natural than a dense network for a 5 x 5 x 3 weather grid? Because nearby cells have spatial relationships, and a CNN can exploit local structure and shared filters instead of flattening away that geometry. Why is pooling not the only way to shrink spatial size? Because strided convolutions can also reduce spatial dimensions while still learning the downsampling transformation."
    },
    {
      "chapter": 7,
      "slug": "recommendation-systems",
      "title": "7 Recommendation Systems",
      "shortTitle": "Recommendation",
      "badge": "Chapter 7",
      "summary": "Content-based recommendation, collaborative filtering, matrix factorization, ranking metrics, and industrial pipelines.",
      "goals": [
        "Explain recommendation as ranking rather than plain classification.",
        "Compare content-based, collaborative, and latent-factor approaches.",
        "Understand cold start, implicit feedback, and two-stage systems."
      ],
      "traps": [
        "Assuming non-click means dislike.",
        "Evaluating recommenders only with ordinary accuracy.",
        "Treating matrix factorization as just compression instead of latent taste modeling."
      ],
      "formulas": [
        "Baseline rating: r_hat_ui = mu + b_u + b_i",
        "Latent factor model: r_hat_ui = mu + b_u + b_i + p_u^T q_i",
        "Recommendation is judged by ranked quality near the top of the list."
      ],
      "starterQuestions": [
        "Why can a system recommend without understanding item content?",
        "Why is sparse data the defining challenge of recommendation?",
        "Why does ranking position matter more than average classification accuracy?"
      ],
      "introHtml": "<p>Recommendation systems are among the most important real-world applications of machine learning. Search engines rank documents. Online stores rank products. Video platforms rank videos. Music apps rank songs. Social platforms rank posts and people. In all of these cases, the core task is not merely to predict a label. It is to choose what to show, in what order, for whom, and under what constraints.</p>\n<p>This makes recommendation both practically powerful and conceptually subtle. It combines prediction, representation learning, ranking, decision-making, and user modeling. It also lives in a world of sparse and biased data: users only interact with a small fraction of the available catalog, and what they see is already shaped by the system itself.</p>\n<p>This chapter develops recommendation from the ground up. We begin with the basic framing of the problem, then examine content-based methods, collaborative filtering, matrix factorization, hybrid and industrial systems, and the metrics used to evaluate them. The goal is not to memorize a bag of algorithms, but to understand the logic of recommendation deeply enough that you can explain why each method exists and when it should be used.</p>\n<figure class=\"md-figure\"><img src=\"figures/ch07_recommender_pipeline.png\" alt=\"A real recommender is usually a pipeline: user signals and item data feed candidate generation, then a ranking model orders the shortlist and learns from later feedback.\" loading=\"lazy\" /><figcaption>A real recommender is usually a pipeline: user signals and item data feed candidate generation, then a ranking model orders the shortlist and learns from later feedback.</figcaption></figure>",
      "plainEnglishHtml": "<p>A recommender is trying to decide what to show next, to whom, and in what order. That makes it a ranking problem shaped by sparse data, behavior feedback, and changing user intent.</p>",
      "mentalModelHtml": "<p>Picture a huge user-item table with almost every cell missing. Recommendation is the art of filling in useful parts of that table or ranking promising items even when direct evidence is very sparse.</p>",
      "bridgeForwardHtml": "<p>Sequence models and generative systems later reuse many of the same ideas: embeddings, context, retrieval, ranking, and behavior prediction under uncertainty.</p>",
      "masteryChecklist": [
        "I can explain why recommendation is ranking, not just classification.",
        "I can compare content-based, collaborative, and latent-factor approaches.",
        "I can explain new-user and new-item cold start clearly.",
        "I can explain why implicit feedback is useful but noisy."
      ],
      "equationNotebook": [
        {
          "label": "Bias baseline",
          "latex": "\\hat{r}_{ui} = \\mu + b_u + b_i",
          "meaning": "A strong baseline prediction includes the global mean plus user and item biases.",
          "intuition": "Some users systematically rate high or low, and some items are broadly popular or unpopular even before latent taste factors enter."
        },
        {
          "label": "Latent factor model",
          "latex": "\\hat{r}_{ui} = \\mu + b_u + b_i + p_u^\\top q_i",
          "meaning": "The interaction between user and item embeddings estimates how well they fit in latent taste space.",
          "intuition": "The dot product becomes large when the user vector aligns well with the item's hidden factors."
        },
        {
          "label": "Precision at K",
          "latex": "\\mathrm{Precision@K} = \\frac{\\#\\{\\text{relevant items in top }K\\}}{K}",
          "meaning": "This tells us how concentrated the top of the ranking is with useful items.",
          "intuition": "Recommendation quality depends heavily on what appears near the top because users rarely inspect the entire list."
        }
      ],
      "workedExamples": [
        {
          "title": "Why collaborative filtering can discover hidden taste",
          "scenarioHtml": "<p>Two movies may look different by genre tags, but the same unusual set of users consistently loves both.</p>",
          "walkthroughHtml": "<p>A collaborative method can notice that shared behavior pattern even if the metadata never explicitly described the hidden connection. That is why collaborative filtering can uncover taste structure beyond surface item features.</p>",
          "searchText": "Why collaborative filtering can discover hidden taste Two movies may look different by genre tags, but the same unusual set of users consistently loves both. A collaborative method can notice that shared behavior pattern even if the metadata never explicitly described the hidden connection. That is why collaborative filtering can uncover taste structure beyond surface item features."
        },
        {
          "title": "Why missing data is not the same as negative data",
          "scenarioHtml": "<p>A user did not click a video.</p>",
          "walkthroughHtml": "<p>That could mean the user disliked it, but it could also mean the user never saw it. Recommendation data is therefore biased by exposure, which makes implicit-feedback learning and evaluation more delicate than standard supervised labeling.</p>",
          "searchText": "Why missing data is not the same as negative data A user did not click a video. That could mean the user disliked it, but it could also mean the user never saw it. Recommendation data is therefore biased by exposure, which makes implicit-feedback learning and evaluation more delicate than standard supervised labeling."
        }
      ],
      "supplementalQuestions": [
        {
          "prompt": "Why can content-based recommendation help with brand-new items better than pure collaborative filtering?",
          "answer": "Because a new item can be represented from its known features immediately, while collaborative methods need interaction history before they know where that item belongs in behavior space."
        },
        {
          "prompt": "Why do large systems use candidate generation before ranking?",
          "answer": "Because scoring an enormous catalog with a heavy model for every request is too expensive, so a fast stage first narrows the catalog to a plausible smaller set."
        },
        {
          "prompt": "What is the danger of optimizing only click-through rate?",
          "answer": "It can favor short-term engagement while ignoring diversity, novelty, satisfaction, or long-term user value."
        },
        {
          "prompt": "Why do embeddings help recommendation beyond hand-built metadata?",
          "answer": "Because embeddings can capture hidden structure and interaction patterns that are not explicitly described by manual item fields."
        },
        {
          "prompt": "Why is evaluation harder in recommendation than in many classification problems?",
          "answer": "Because the system only observes interactions on exposed items, ranking order matters, and the model's own behavior shapes the future data it gets to learn from."
        }
      ],
      "sections": [
        {
          "id": "recommendation-systems-01-recommendation-is-a-ranking-problem",
          "title": "7.1 Recommendation Is a Ranking Problem",
          "figureSrc": "figures/sections/ch07_s01_recommendation-is-a-ranking-problem.png",
          "figureAlt": "Visual summary for 7.1 Recommendation Is a Ranking Problem",
          "html": "<p>The first important point is that recommendation is usually a ranking problem, not a plain classification problem.</p>\n<p>Suppose a movie platform has 100000 titles. The system does not mainly need to answer &quot;Will the user like movie X?&quot; in isolation. What it really needs is a sorted list of which movies should be placed near the top.</p>\n<p>That changes the nature of the task:</p>\n<ul class=\"md-list\"><li>relative order matters</li><li>top positions matter more than lower positions</li><li>many items may be acceptable, but only a few can be shown</li><li>the business goal may involve clicks, watch time, purchases, or long-term satisfaction</li></ul>\n<p>This is why recommender systems often care more about ranking metrics than about ordinary classification accuracy.</p>",
          "wordCount": 114,
          "readMinutes": 1,
          "searchText": "The first important point is that recommendation is usually a ranking problem, not a plain classification problem. Suppose a movie platform has 100000 titles. The system does not mainly need to answer &quot;Will the user like movie X?&quot; in isolation. What it really needs is a sorted list of which movies should be placed near the top. That changes the nature of the task: relative order matters top positions matter more than lower positions many items may be acceptable, but only a few can be shown the business goal may involve clicks, watch time, purchases, or long-term satisfaction This is why recommender systems often care more about ranking metrics than about ordinary classification accuracy."
        },
        {
          "id": "recommendation-systems-02-what-data-does-a-recommender-use",
          "title": "7.2 What Data Does a Recommender Use?",
          "figureSrc": "figures/sections/ch07_s02_what-data-does-a-recommender-use.png",
          "figureAlt": "Visual summary for 7.2 What Data Does a Recommender Use?",
          "html": "<p>Recommendation systems can use many kinds of evidence.</p>\n<p>Explicit feedback includes:</p>\n<ul class=\"md-list\"><li>star ratings</li><li>thumbs up or thumbs down</li><li>direct likes</li><li>saved favorites</li></ul>\n<p>Implicit feedback includes:</p>\n<ul class=\"md-list\"><li>clicks</li><li>dwell time</li><li>watch time</li><li>purchases</li><li>skips</li><li>browsing history</li><li>repeated plays</li></ul>\n<p>In many real systems, implicit feedback is far more abundant than explicit feedback. Users rarely rate everything they see, but they constantly generate interaction traces.</p>\n<p>The challenge is that implicit feedback is ambiguous. A click is not the same as love. A missing click does not prove dislike. The user may simply never have seen the item.</p>",
          "wordCount": 93,
          "readMinutes": 1,
          "searchText": "Recommendation systems can use many kinds of evidence. Explicit feedback includes: star ratings thumbs up or thumbs down direct likes saved favorites Implicit feedback includes: clicks dwell time watch time purchases skips browsing history repeated plays In many real systems, implicit feedback is far more abundant than explicit feedback. Users rarely rate everything they see, but they constantly generate interaction traces. The challenge is that implicit feedback is ambiguous. A click is not the same as love. A missing click does not prove dislike. The user may simply never have seen the item."
        },
        {
          "id": "recommendation-systems-03-users-items-and-the-sparse-matrix-view",
          "title": "7.3 Users, Items, and the Sparse Matrix View",
          "figureSrc": "figures/sections/ch07_s03_users-items-and-the-sparse-matrix-view.png",
          "figureAlt": "Visual summary for 7.3 Users, Items, and the Sparse Matrix View",
          "html": "<p>A classical way to represent recommendation data is as a user-item matrix.</p>\n<ul class=\"md-list\"><li>rows are users</li><li>columns are items</li><li>entries are ratings or interactions</li></ul>\n<p>Most entries are missing. This sparsity is not a small inconvenience. It is the central structural fact of recommendation. Even active users interact with only a tiny portion of the full catalog.</p>\n<p>This sparse setting immediately creates several problems:</p>\n<ul class=\"md-list\"><li>many user-item pairs are unobserved</li><li>new users and new items have little history</li><li>direct supervised labels are incomplete and biased</li><li>patterns must be learned from limited overlap</li></ul>\n<p>Recommendation methods differ partly in how they cope with this sparsity.</p>",
          "wordCount": 100,
          "readMinutes": 1,
          "searchText": "A classical way to represent recommendation data is as a user-item matrix. rows are users columns are items entries are ratings or interactions Most entries are missing. This sparsity is not a small inconvenience. It is the central structural fact of recommendation. Even active users interact with only a tiny portion of the full catalog. This sparse setting immediately creates several problems: many user-item pairs are unobserved new users and new items have little history direct supervised labels are incomplete and biased patterns must be learned from limited overlap Recommendation methods differ partly in how they cope with this sparsity."
        },
        {
          "id": "recommendation-systems-04-content-based-recommendation",
          "title": "7.4 Content-Based Recommendation",
          "figureSrc": "figures/sections/ch07_s04_content-based-recommendation.png",
          "figureAlt": "Visual summary for 7.4 Content-Based Recommendation",
          "html": "<p>Content-based recommendation focuses on item attributes. The idea is simple: if a user liked certain items, recommend other items that resemble them.</p>\n<p>To make this work, we need item representations. For a movie, those might include:</p>\n<ul class=\"md-list\"><li>genre</li><li>director</li><li>actors</li><li>year</li><li>keywords</li><li>description text</li></ul>\n<p>For a condo listing, they might include:</p>\n<ul class=\"md-list\"><li>location</li><li>price range</li><li>size</li><li>number of bedrooms</li><li>distance to transportation</li><li>neighborhood features</li></ul>\n<p>Once we represent each item as a feature vector, we can build a user profile from the items the user has liked or consumed. A simple version averages the feature vectors of previously liked items. A more advanced system may weight recent or strongly preferred items more heavily.</p>",
          "wordCount": 110,
          "readMinutes": 1,
          "searchText": "Content-based recommendation focuses on item attributes. The idea is simple: if a user liked certain items, recommend other items that resemble them. To make this work, we need item representations. For a movie, those might include: genre director actors year keywords description text For a condo listing, they might include: location price range size number of bedrooms distance to transportation neighborhood features Once we represent each item as a feature vector, we can build a user profile from the items the user has liked or consumed. A simple version averages the feature vectors of previously liked items. A more advanced system may weight recent or strongly preferred items more heavily."
        },
        {
          "id": "recommendation-systems-05-why-cosine-similarity-appears-so-often",
          "title": "7.5 Why Cosine Similarity Appears So Often",
          "figureSrc": "figures/sections/ch07_s05_why-cosine-similarity-appears-so-often.png",
          "figureAlt": "Visual summary for 7.5 Why Cosine Similarity Appears So Often",
          "html": "<p>In content-based systems, cosine similarity is one of the most common similarity measures.</p>\n<p>It compares vectors by angle rather than raw magnitude. This is useful because we often care more about the direction of preference than about the absolute size of the vector.</p>\n<p>If two item vectors point in similar directions, they share similar feature patterns even if one has larger raw values. Likewise, if a user profile points toward certain genres or themes, cosine similarity helps identify items aligned with that direction.</p>\n<p>Cosine similarity is especially natural for text-derived features such as TF-IDF vectors or dense semantic embeddings.</p>",
          "wordCount": 99,
          "readMinutes": 1,
          "searchText": "In content-based systems, cosine similarity is one of the most common similarity measures. It compares vectors by angle rather than raw magnitude. This is useful because we often care more about the direction of preference than about the absolute size of the vector. If two item vectors point in similar directions, they share similar feature patterns even if one has larger raw values. Likewise, if a user profile points toward certain genres or themes, cosine similarity helps identify items aligned with that direction. Cosine similarity is especially natural for text-derived features such as TF-IDF vectors or dense semantic embeddings."
        },
        {
          "id": "recommendation-systems-06-text-features-tf-idf-and-embeddings",
          "title": "7.6 Text Features: TF-IDF and Embeddings",
          "figureSrc": "figures/sections/ch07_s06_text-features-tf-idf-and-embeddings.png",
          "figureAlt": "Visual summary for 7.6 Text Features: TF-IDF and Embeddings",
          "html": "<p>Many recommendable items come with text:</p>\n<ul class=\"md-list\"><li>movie summaries</li><li>product titles</li><li>app descriptions</li><li>job postings</li><li>news headlines</li></ul>\n<p>Two important representation families appear in the course.</p>\n<h4>7.6.1 TF-IDF</h4>\n<p>TF-IDF stands for term frequency-inverse document frequency. It gives high weight to words that are frequent within one item description but not frequent across the whole corpus.</p>\n<p>This makes TF-IDF a strong baseline because it highlights distinctive words. If a condo description repeatedly mentions &quot;near BTS&quot; or a movie synopsis contains unusual topic words, TF-IDF can capture that.</p>\n<h4>7.6.2 Dense Embeddings</h4>\n<p>Sentence or document embeddings go beyond exact word overlap. They try to map text with similar meaning into nearby vectors.</p>\n<p>This is valuable because users often care about semantic similarity, not only lexical similarity. Two movie summaries may use different wording but describe similar themes.</p>\n<p>The big conceptual lesson is that recommendation quality depends heavily on representation quality. Better item representations make content-based recommendation much stronger.</p>",
          "wordCount": 153,
          "readMinutes": 1,
          "searchText": "Many recommendable items come with text: movie summaries product titles app descriptions job postings news headlines Two important representation families appear in the course. 7.6.1 TF-IDF TF-IDF stands for term frequency-inverse document frequency. It gives high weight to words that are frequent within one item description but not frequent across the whole corpus. This makes TF-IDF a strong baseline because it highlights distinctive words. If a condo description repeatedly mentions &quot;near BTS&quot; or a movie synopsis contains unusual topic words, TF-IDF can capture that. 7.6.2 Dense Embeddings Sentence or document embeddings go beyond exact word overlap. They try to map text with similar meaning into nearby vectors. This is valuable because users often care about semantic similarity, not only lexical similarity. Two movie summaries may use different wording but describe similar themes. The big conceptual lesson is that recommendation quality depends heavily on representation quality. Better item representations make content-based recommendation much stronger."
        },
        {
          "id": "recommendation-systems-07-strengths-and-weaknesses-of-content-based-methods",
          "title": "7.7 Strengths and Weaknesses of Content-Based Methods",
          "figureSrc": "figures/sections/ch07_s07_strengths-and-weaknesses-of-content-based-methods.png",
          "figureAlt": "Visual summary for 7.7 Strengths and Weaknesses of Content-Based Methods",
          "html": "<p>Content-based recommendation has several strengths.</p>\n<ul class=\"md-list\"><li>it can recommend new items as soon as their features are known</li><li>it is often easier to explain</li><li>it can use rich metadata and text</li><li>it works even when user overlap is small</li></ul>\n<p>But it also has limitations.</p>\n<ul class=\"md-list\"><li>it depends on having meaningful item features</li><li>it may over-specialize and recommend items too similar to what the user already consumed</li><li>it may struggle to discover surprising cross-item taste patterns that are not obvious from metadata alone</li></ul>\n<p>This is why content-based systems are powerful but rarely sufficient on their own at scale.</p>",
          "wordCount": 95,
          "readMinutes": 1,
          "searchText": "Content-based recommendation has several strengths. it can recommend new items as soon as their features are known it is often easier to explain it can use rich metadata and text it works even when user overlap is small But it also has limitations. it depends on having meaningful item features it may over-specialize and recommend items too similar to what the user already consumed it may struggle to discover surprising cross-item taste patterns that are not obvious from metadata alone This is why content-based systems are powerful but rarely sufficient on their own at scale."
        },
        {
          "id": "recommendation-systems-08-collaborative-filtering",
          "title": "7.8 Collaborative Filtering",
          "figureSrc": "figures/sections/ch07_s08_collaborative-filtering.png",
          "figureAlt": "Visual summary for 7.8 Collaborative Filtering",
          "html": "<p>Collaborative filtering takes a different approach. Instead of focusing mainly on item content, it learns from patterns of interaction across many users.</p>\n<p>The core intuition is:</p>\n<ul class=\"md-list\"><li>users who behaved similarly in the past may behave similarly in the future</li><li>items consumed by similar groups of users may have similar recommendation value</li></ul>\n<p>This lets the system discover latent taste structure even when no explicit content features are available.</p>\n<p>Collaborative filtering is one of the defining ideas of recommendation because it uses community behavior as a signal. It often captures preferences humans would struggle to encode manually.</p>",
          "wordCount": 95,
          "readMinutes": 1,
          "searchText": "Collaborative filtering takes a different approach. Instead of focusing mainly on item content, it learns from patterns of interaction across many users. The core intuition is: users who behaved similarly in the past may behave similarly in the future items consumed by similar groups of users may have similar recommendation value This lets the system discover latent taste structure even when no explicit content features are available. Collaborative filtering is one of the defining ideas of recommendation because it uses community behavior as a signal. It often captures preferences humans would struggle to encode manually."
        },
        {
          "id": "recommendation-systems-09-user-user-and-item-item-neighborhood-methods",
          "title": "7.9 User-User and Item-Item Neighborhood Methods",
          "figureSrc": "figures/sections/ch07_s09_user-user-and-item-item-neighborhood-methods.png",
          "figureAlt": "Visual summary for 7.9 User-User and Item-Item Neighborhood Methods",
          "html": "<p>The most intuitive collaborative-filtering methods are neighborhood methods.</p>\n<p>In user-user collaborative filtering:</p>\n<ul class=\"md-list\"><li>find users similar to the target user</li><li>look at what those users liked</li><li>recommend those items</li></ul>\n<p>In item-item collaborative filtering:</p>\n<ul class=\"md-list\"><li>find items similar to those the user already consumed</li><li>recommend related items</li></ul>\n<p>Item-item methods often work well in practice because item relationships can be more stable than user relationships. Amazon&#x27;s famous &quot;people who bought this also bought...&quot; idea is closely related to this logic.</p>\n<p>Neighborhood methods are useful to learn because they make collaborative filtering intuitive. They also show clearly that recommendation is built from similarity structure, not only from labels.</p>",
          "wordCount": 103,
          "readMinutes": 1,
          "searchText": "The most intuitive collaborative-filtering methods are neighborhood methods. In user-user collaborative filtering: find users similar to the target user look at what those users liked recommend those items In item-item collaborative filtering: find items similar to those the user already consumed recommend related items Item-item methods often work well in practice because item relationships can be more stable than user relationships. Amazon&#x27;s famous &quot;people who bought this also bought...&quot; idea is closely related to this logic. Neighborhood methods are useful to learn because they make collaborative filtering intuitive. They also show clearly that recommendation is built from similarity structure, not only from labels."
        },
        {
          "id": "recommendation-systems-10-baselines-matter-more-than-students-expect",
          "title": "7.10 Baselines Matter More Than Students Expect",
          "figureSrc": "figures/sections/ch07_s10_baselines-matter-more-than-students-expect.png",
          "figureAlt": "Visual summary for 7.10 Baselines Matter More Than Students Expect",
          "html": "<p>Before learning a complex model, it is often useful to model simple effects.</p>\n<p>For ratings data, a strong classical baseline is:</p>\n<div class=\"math-display\">\\[\\hat{r}_{ui} = \\mu + b_u + b_i\\]</div>\n<p>where:</p>\n<ul class=\"md-list\"><li><code>mu</code> is the global mean rating</li><li>\\(b_u\\) is a user bias</li><li>\\(b_i\\) is an item bias</li></ul>\n<p>Why is this useful?</p>\n<p>Because some users systematically rate high or low, and some items are broadly popular or unpopular. A good recommender should not force latent factors to relearn these obvious effects from scratch.</p>\n<p>This leads naturally into matrix factorization with biases.</p>\n<figure class=\"md-figure\"><img src=\"figures/ch07_matrix_factorization.png\" alt=\"Matrix factorization treats the sparse rating table as the product of user-taste vectors and item-trait vectors, so preference becomes an interaction in a lower-dimensional latent space.\" loading=\"lazy\" /><figcaption>Matrix factorization treats the sparse rating table as the product of user-taste vectors and item-trait vectors, so preference becomes an interaction in a lower-dimensional latent space.</figcaption></figure>",
          "wordCount": 114,
          "readMinutes": 1,
          "searchText": "Before learning a complex model, it is often useful to model simple effects. For ratings data, a strong classical baseline is: \\[\\hat{r}_{ui} = \\mu + b_u + b_i\\] where: mu is the global mean rating \\(b_u\\) is a user bias \\(b_i\\) is an item bias Why is this useful? Because some users systematically rate high or low, and some items are broadly popular or unpopular. A good recommender should not force latent factors to relearn these obvious effects from scratch. This leads naturally into matrix factorization with biases. Matrix factorization treats the sparse rating table as the product of user-taste vectors and item-trait vectors, so preference becomes an interaction in a lower-dimensional latent space."
        },
        {
          "id": "recommendation-systems-11-matrix-factorization",
          "title": "7.11 Matrix Factorization",
          "figureSrc": "figures/sections/ch07_s11_matrix-factorization.png",
          "figureAlt": "Visual summary for 7.11 Matrix Factorization",
          "html": "<p>Matrix factorization is one of the most important ideas in modern recommendation. Koren, Bell, and Volinsky&#x27;s 2009 paper made this especially influential.</p>\n<p>The idea is to approximate the user-item matrix using low-dimensional latent vectors:</p>\n<ul class=\"md-list\"><li>each user gets an embedding \\(p_u\\)</li><li>each item gets an embedding \\(q_i\\)</li></ul>\n<p>The predicted preference is often modeled as</p>\n<div class=\"math-display\">\\[\\hat{r}_{ui} = \\mu + b_u + b_i + p_u^T q_i\\]</div>\n<p>The dot product measures how compatible the user and item are in latent space.</p>\n<p>This is powerful because the model can discover hidden dimensions of taste without requiring manual labels for them. One latent direction may correspond roughly to &quot;prefers action-heavy blockbusters.&quot; Another may correspond to &quot;likes slow serious dramas.&quot; Another may capture &quot;prefers old classics over recent releases.&quot;</p>\n<p>No human had to predefine those factors. They emerge from the interaction data.</p>",
          "wordCount": 135,
          "readMinutes": 1,
          "searchText": "Matrix factorization is one of the most important ideas in modern recommendation. Koren, Bell, and Volinsky&#x27;s 2009 paper made this especially influential. The idea is to approximate the user-item matrix using low-dimensional latent vectors: each user gets an embedding \\(p_u\\) each item gets an embedding \\(q_i\\) The predicted preference is often modeled as \\[\\hat{r}_{ui} = \\mu + b_u + b_i + p_u^T q_i\\] The dot product measures how compatible the user and item are in latent space. This is powerful because the model can discover hidden dimensions of taste without requiring manual labels for them. One latent direction may correspond roughly to &quot;prefers action-heavy blockbusters.&quot; Another may correspond to &quot;likes slow serious dramas.&quot; Another may capture &quot;prefers old classics over recent releases.&quot; No human had to predefine those factors. They emerge from the interaction data."
        },
        {
          "id": "recommendation-systems-12-why-low-rank-structure-helps",
          "title": "7.12 Why Low-Rank Structure Helps",
          "figureSrc": "figures/sections/ch07_s12_why-low-rank-structure-helps.png",
          "figureAlt": "Visual summary for 7.12 Why Low-Rank Structure Helps",
          "html": "<p>Why should a low-dimensional factorization work at all?</p>\n<p>Because user preferences are usually not arbitrary. They are driven by a smaller number of underlying tendencies or factors. If the full user-item matrix has structure, then a lower-rank approximation can capture a large share of that structure compactly.</p>\n<p>This is the same broad mathematical idea that appears in PCA: high-dimensional observations may be governed by lower-dimensional patterns.</p>\n<p>The difference is that matrix factorization in recommendation is optimized to explain user-item interactions rather than generic variance.</p>",
          "wordCount": 84,
          "readMinutes": 1,
          "searchText": "Why should a low-dimensional factorization work at all? Because user preferences are usually not arbitrary. They are driven by a smaller number of underlying tendencies or factors. If the full user-item matrix has structure, then a lower-rank approximation can capture a large share of that structure compactly. This is the same broad mathematical idea that appears in PCA: high-dimensional observations may be governed by lower-dimensional patterns. The difference is that matrix factorization in recommendation is optimized to explain user-item interactions rather than generic variance."
        },
        {
          "id": "recommendation-systems-13-implicit-feedback-is-not-the-same-as-ratings",
          "title": "7.13 Implicit Feedback Is Not the Same as Ratings",
          "figureSrc": "figures/sections/ch07_s13_implicit-feedback-is-not-the-same-as-ratings.png",
          "figureAlt": "Visual summary for 7.13 Implicit Feedback Is Not the Same as Ratings",
          "html": "<p>One of the most important industrial realities is that many systems do not have explicit ratings at all. Instead, they have implicit data such as views, clicks, or purchases.</p>\n<p>Hu, Koren, and Volinsky&#x27;s 2008 work on implicit feedback is important here. Their key insight is that observed interactions indicate preference with varying confidence, while missing entries are not plain negative labels.</p>\n<p>This changes the learning problem.</p>\n<p>In implicit recommendation:</p>\n<ul class=\"md-list\"><li>observed actions often mean &quot;the user probably had some interest&quot;</li><li>unobserved items may be unknown, irrelevant, or simply unseen</li><li>confidence differs across interaction types</li></ul>\n<p>This is why naive treatment of zeros as dislike is often misleading.</p>",
          "wordCount": 105,
          "readMinutes": 1,
          "searchText": "One of the most important industrial realities is that many systems do not have explicit ratings at all. Instead, they have implicit data such as views, clicks, or purchases. Hu, Koren, and Volinsky&#x27;s 2008 work on implicit feedback is important here. Their key insight is that observed interactions indicate preference with varying confidence, while missing entries are not plain negative labels. This changes the learning problem. In implicit recommendation: observed actions often mean &quot;the user probably had some interest&quot; unobserved items may be unknown, irrelevant, or simply unseen confidence differs across interaction types This is why naive treatment of zeros as dislike is often misleading."
        },
        {
          "id": "recommendation-systems-14-cold-start",
          "title": "7.14 Cold Start",
          "figureSrc": "figures/sections/ch07_s14_cold-start.png",
          "figureAlt": "Visual summary for 7.14 Cold Start",
          "html": "<p>Cold start is central to recommendation.</p>\n<h4>7.14.1 New User Cold Start</h4>\n<p>A new user has little or no interaction history. Collaborative methods struggle because the system does not yet know where to place that user in taste space.</p>\n<h4>7.14.2 New Item Cold Start</h4>\n<p>A new item has not yet accumulated interactions, so collaborative methods do not know which users it should match.</p>\n<p>Content-based signals help especially on the new-item side because the item can be recommended from its features before many interactions arrive.</p>\n<p>This is one of the strongest reasons hybrid systems are common.</p>",
          "wordCount": 94,
          "readMinutes": 1,
          "searchText": "Cold start is central to recommendation. 7.14.1 New User Cold Start A new user has little or no interaction history. Collaborative methods struggle because the system does not yet know where to place that user in taste space. 7.14.2 New Item Cold Start A new item has not yet accumulated interactions, so collaborative methods do not know which users it should match. Content-based signals help especially on the new-item side because the item can be recommended from its features before many interactions arrive. This is one of the strongest reasons hybrid systems are common."
        },
        {
          "id": "recommendation-systems-15-hybrid-recommendation",
          "title": "7.15 Hybrid Recommendation",
          "figureSrc": "figures/sections/ch07_s15_hybrid-recommendation.png",
          "figureAlt": "Visual summary for 7.15 Hybrid Recommendation",
          "html": "<p>In practice, many high-performing recommenders combine multiple signals:</p>\n<ul class=\"md-list\"><li>content-based features</li><li>collaborative signals</li><li>user context</li><li>sequence behavior</li><li>popularity priors</li><li>business rules</li></ul>\n<p>Hybrid systems exist because no single method solves every part of the recommendation problem.</p>\n<p>Content-based methods help with explainability and new items.</p>\n<p>Collaborative methods help uncover latent community taste.</p>\n<p>Sequential models help reflect recent intent.</p>\n<p>Business heuristics help enforce platform goals and safety constraints.</p>\n<p>A mature recommender is usually a system, not a single formula.</p>",
          "wordCount": 75,
          "readMinutes": 1,
          "searchText": "In practice, many high-performing recommenders combine multiple signals: content-based features collaborative signals user context sequence behavior popularity priors business rules Hybrid systems exist because no single method solves every part of the recommendation problem. Content-based methods help with explainability and new items. Collaborative methods help uncover latent community taste. Sequential models help reflect recent intent. Business heuristics help enforce platform goals and safety constraints. A mature recommender is usually a system, not a single formula."
        },
        {
          "id": "recommendation-systems-16-memorization-and-generalization",
          "title": "7.16 Memorization and Generalization",
          "figureSrc": "figures/sections/ch07_s16_memorization-and-generalization.png",
          "figureAlt": "Visual summary for 7.16 Memorization and Generalization",
          "html": "<p>Google&#x27;s Wide and Deep paper gives a useful industrial framing. Recommendation often needs both memorization and generalization.</p>\n<p>Memorization means remembering specific feature interactions that historically worked well. For example, a particular user segment may love a specific kind of app.</p>\n<p>Generalization means using embeddings and dense representations to recommend plausible new combinations not seen often before.</p>\n<p>The wide part captures memorized sparse interactions. The deep part learns more general patterns. Together they address an important real-world tradeoff.</p>\n<p>This is a very good concept to remember for the final because it explains why deep models alone are not automatically sufficient.</p>",
          "wordCount": 99,
          "readMinutes": 1,
          "searchText": "Google&#x27;s Wide and Deep paper gives a useful industrial framing. Recommendation often needs both memorization and generalization. Memorization means remembering specific feature interactions that historically worked well. For example, a particular user segment may love a specific kind of app. Generalization means using embeddings and dense representations to recommend plausible new combinations not seen often before. The wide part captures memorized sparse interactions. The deep part learns more general patterns. Together they address an important real-world tradeoff. This is a very good concept to remember for the final because it explains why deep models alone are not automatically sufficient."
        },
        {
          "id": "recommendation-systems-17-two-stage-industrial-pipelines",
          "title": "7.17 Two-Stage Industrial Pipelines",
          "figureSrc": "figures/sections/ch07_s17_two-stage-industrial-pipelines.png",
          "figureAlt": "Visual summary for 7.17 Two-Stage Industrial Pipelines",
          "html": "<p>Large-scale recommenders rarely score every item in the catalog with a heavy model for every request. The catalog may contain millions of items.</p>\n<p>A common architecture is therefore two-stage:</p>\n<h4>7.17.1 Candidate Generation</h4>\n<p>Retrieve a manageable set of plausible items from the full catalog.</p>\n<p>This stage values speed and recall. It should avoid missing good candidates.</p>\n<h4>7.17.2 Ranking or Re-Ranking</h4>\n<p>Apply a stronger model to that smaller candidate set.</p>\n<p>This stage values fine ranking quality. It can use richer features because the candidate set is smaller.</p>\n<p>The YouTube recommendation paper by Covington, Adams, and Sargin explains this industrial split clearly. This design is one of the most important high-level patterns in recommendation engineering.</p>",
          "wordCount": 112,
          "readMinutes": 1,
          "searchText": "Large-scale recommenders rarely score every item in the catalog with a heavy model for every request. The catalog may contain millions of items. A common architecture is therefore two-stage: 7.17.1 Candidate Generation Retrieve a manageable set of plausible items from the full catalog. This stage values speed and recall. It should avoid missing good candidates. 7.17.2 Ranking or Re-Ranking Apply a stronger model to that smaller candidate set. This stage values fine ranking quality. It can use richer features because the candidate set is smaller. The YouTube recommendation paper by Covington, Adams, and Sargin explains this industrial split clearly. This design is one of the most important high-level patterns in recommendation engineering."
        },
        {
          "id": "recommendation-systems-18-time-context-and-sequence",
          "title": "7.18 Time, Context, and Sequence",
          "figureSrc": "figures/sections/ch07_s18_time-context-and-sequence.png",
          "figureAlt": "Visual summary for 7.18 Time, Context, and Sequence",
          "html": "<p>User preferences are not static. What someone liked years ago may matter less than what they clicked five minutes ago.</p>\n<p>Recommendation often benefits from:</p>\n<ul class=\"md-list\"><li>recency</li><li>session context</li><li>time of day</li><li>device context</li><li>short-term sequence patterns</li></ul>\n<p>A user who has watched several children&#x27;s videos in a row is in a different moment than a user whose long-term history contains one children&#x27;s video among many unrelated activities.</p>\n<p>This motivates sequence-aware recommendation and connects recommendation to sequence models studied elsewhere in the course.</p>",
          "wordCount": 80,
          "readMinutes": 1,
          "searchText": "User preferences are not static. What someone liked years ago may matter less than what they clicked five minutes ago. Recommendation often benefits from: recency session context time of day device context short-term sequence patterns A user who has watched several children&#x27;s videos in a row is in a different moment than a user whose long-term history contains one children&#x27;s video among many unrelated activities. This motivates sequence-aware recommendation and connects recommendation to sequence models studied elsewhere in the course."
        },
        {
          "id": "recommendation-systems-19-evaluation-must-match-the-task",
          "title": "7.19 Evaluation Must Match the Task",
          "figureSrc": "figures/sections/ch07_s19_evaluation-must-match-the-task.png",
          "figureAlt": "Visual summary for 7.19 Evaluation Must Match the Task",
          "html": "<p>Because recommendation is a ranking problem, evaluation should emphasize ranked quality.</p>\n<p>Important metrics include:</p>\n<ul class=\"md-list\"><li>Precision@K</li><li>Recall@K</li><li>Hit Rate</li><li>Average Precision</li><li>Mean Average Precision</li><li>Mean Reciprocal Rank</li><li>nDCG</li></ul>\n<p>These metrics answer slightly different questions.</p>\n<p>Precision@K asks: among the top \\(K\\) shown items, how many were relevant?</p>\n<p>Recall@K asks: of all relevant items, how many did we manage to surface in the top \\(K\\)?</p>\n<p>MRR focuses on how early the first relevant item appears.</p>\n<p>nDCG rewards ranking relevant items high while discounting lower positions.</p>\n<p>Students should not merely memorize names. They should understand that the top of the ranking matters much more than the bottom.</p>",
          "wordCount": 103,
          "readMinutes": 1,
          "searchText": "Because recommendation is a ranking problem, evaluation should emphasize ranked quality. Important metrics include: Precision@K Recall@K Hit Rate Average Precision Mean Average Precision Mean Reciprocal Rank nDCG These metrics answer slightly different questions. Precision@K asks: among the top \\(K\\) shown items, how many were relevant? Recall@K asks: of all relevant items, how many did we manage to surface in the top \\(K\\)? MRR focuses on how early the first relevant item appears. nDCG rewards ranking relevant items high while discounting lower positions. Students should not merely memorize names. They should understand that the top of the ranking matters much more than the bottom."
        },
        {
          "id": "recommendation-systems-20-offline-metrics-and-online-reality",
          "title": "7.20 Offline Metrics and Online Reality",
          "figureSrc": "figures/sections/ch07_s20_offline-metrics-and-online-reality.png",
          "figureAlt": "Visual summary for 7.20 Offline Metrics and Online Reality",
          "html": "<p>Offline evaluation is useful, but it is not the whole story.</p>\n<p>A recommender may improve an offline metric yet fail to improve real user outcomes. Why?</p>\n<p>Because real systems operate in a feedback loop:</p>\n<ul class=\"md-list\"><li>the system decides what users see</li><li>what users see affects what they click</li><li>those clicks affect future training data</li></ul>\n<p>Online success may be measured by:</p>\n<ul class=\"md-list\"><li>click-through rate</li><li>watch time</li><li>conversion</li><li>retention</li><li>satisfaction</li><li>diversity of exposure</li></ul>\n<p>An especially important caution is that missing interaction does not mean irrelevance. The user may never have seen the item. This selection bias makes offline recommendation evaluation fundamentally tricky.</p>",
          "wordCount": 98,
          "readMinutes": 1,
          "searchText": "Offline evaluation is useful, but it is not the whole story. A recommender may improve an offline metric yet fail to improve real user outcomes. Why? Because real systems operate in a feedback loop: the system decides what users see what users see affects what they click those clicks affect future training data Online success may be measured by: click-through rate watch time conversion retention satisfaction diversity of exposure An especially important caution is that missing interaction does not mean irrelevance. The user may never have seen the item. This selection bias makes offline recommendation evaluation fundamentally tricky."
        },
        {
          "id": "recommendation-systems-21-diversity-novelty-and-over-specialization",
          "title": "7.21 Diversity, Novelty, and Over-Specialization",
          "figureSrc": "figures/sections/ch07_s21_diversity-novelty-and-over-specialization.png",
          "figureAlt": "Visual summary for 7.21 Diversity, Novelty, and Over-Specialization",
          "html": "<p>A recommender that only shows the safest similar items may get stuck in a narrow loop. This can reduce discovery and long-term satisfaction.</p>\n<p>Therefore practical systems often care not only about immediate relevance, but also about:</p>\n<ul class=\"md-list\"><li>diversity</li><li>novelty</li><li>serendipity</li><li>coverage</li></ul>\n<p>These ideas matter because recommendation is not just prediction. It shapes what the user experiences.</p>",
          "wordCount": 55,
          "readMinutes": 1,
          "searchText": "A recommender that only shows the safest similar items may get stuck in a narrow loop. This can reduce discovery and long-term satisfaction. Therefore practical systems often care not only about immediate relevance, but also about: diversity novelty serendipity coverage These ideas matter because recommendation is not just prediction. It shapes what the user experiences."
        },
        {
          "id": "recommendation-systems-22-exploration-and-exploitation",
          "title": "7.22 Exploration and Exploitation",
          "figureSrc": "figures/sections/ch07_s22_exploration-and-exploitation.png",
          "figureAlt": "Visual summary for 7.22 Exploration and Exploitation",
          "html": "<p>Another deep issue is exploration versus exploitation.</p>\n<p>If a system always recommends what it already thinks is best, it may never gather evidence about other possibilities. But if it explores too aggressively, user experience may suffer.</p>\n<p>A good recommender balances:</p>\n<ul class=\"md-list\"><li>exploitation of what currently seems promising</li><li>exploration to learn more about users and items</li></ul>\n<p>Even if your course treats this only lightly, the idea is worth understanding because it explains why recommendation is tied to online decision-making.</p>",
          "wordCount": 77,
          "readMinutes": 1,
          "searchText": "Another deep issue is exploration versus exploitation. If a system always recommends what it already thinks is best, it may never gather evidence about other possibilities. But if it explores too aggressively, user experience may suffer. A good recommender balances: exploitation of what currently seems promising exploration to learn more about users and items Even if your course treats this only lightly, the idea is worth understanding because it explains why recommendation is tied to online decision-making."
        },
        {
          "id": "recommendation-systems-23-common-exam-questions",
          "title": "7.23 Common Exam Questions",
          "figureSrc": "figures/sections/ch07_s23_common-exam-questions.png",
          "figureAlt": "Visual summary for 7.23 Common Exam Questions",
          "html": "<p>Typical exam questions on recommendation often ask you to:</p>\n<ul class=\"md-list\"><li>compare content-based and collaborative filtering</li><li>explain cold start</li><li>interpret cosine similarity</li><li>describe matrix factorization intuitively</li><li>explain why ranking metrics are preferred</li><li>discuss why implicit feedback is difficult</li><li>describe a two-stage recommender pipeline</li></ul>\n<p>The strongest answers will not only define terms but also explain why each method exists.</p>",
          "wordCount": 56,
          "readMinutes": 1,
          "searchText": "Typical exam questions on recommendation often ask you to: compare content-based and collaborative filtering explain cold start interpret cosine similarity describe matrix factorization intuitively explain why ranking metrics are preferred discuss why implicit feedback is difficult describe a two-stage recommender pipeline The strongest answers will not only define terms but also explain why each method exists."
        },
        {
          "id": "recommendation-systems-24-common-misunderstandings",
          "title": "7.24 Common Misunderstandings",
          "figureSrc": "figures/sections/ch07_s24_common-misunderstandings.png",
          "figureAlt": "Visual summary for 7.24 Common Misunderstandings",
          "html": "<p>Students often make the following mistakes.</p>\n<ul class=\"md-list\"><li>treating recommendation as ordinary classification</li><li>assuming missing interaction means dislike</li><li>claiming collaborative filtering needs item metadata</li><li>claiming content-based recommendation can solve everything if enough features are added</li><li>forgetting that ranking position matters</li><li>describing matrix factorization as merely compressing the matrix without explaining latent preference structure</li></ul>\n<p>These mistakes usually happen when someone memorizes vocabulary without understanding the task structure.</p>",
          "wordCount": 64,
          "readMinutes": 1,
          "searchText": "Students often make the following mistakes. treating recommendation as ordinary classification assuming missing interaction means dislike claiming collaborative filtering needs item metadata claiming content-based recommendation can solve everything if enough features are added forgetting that ranking position matters describing matrix factorization as merely compressing the matrix without explaining latent preference structure These mistakes usually happen when someone memorizes vocabulary without understanding the task structure."
        },
        {
          "id": "recommendation-systems-25-big-picture-summary",
          "title": "7.25 Big Picture Summary",
          "figureSrc": "figures/sections/ch07_s25_big-picture-summary.png",
          "figureAlt": "Visual summary for 7.25 Big Picture Summary",
          "html": "<p>Recommendation systems predict and rank items for users under sparse, biased, and dynamic data conditions. Content-based methods use item features and profile similarity. Collaborative filtering uses interaction patterns across users and items. Matrix factorization learns latent user and item vectors that explain preference structure compactly. Hybrid systems combine content, collaboration, sequence, and business constraints. Real systems often use candidate generation followed by ranking. Evaluation must respect the fact that recommendation is a ranking problem embedded in a live feedback loop.</p>\n<p>If you remember one sentence from this chapter, remember this: a recommender is not just trying to predict what is good in general, but what should be shown next to this user, from this catalog, under this context, and in this order.</p>",
          "wordCount": 122,
          "readMinutes": 1,
          "searchText": "Recommendation systems predict and rank items for users under sparse, biased, and dynamic data conditions. Content-based methods use item features and profile similarity. Collaborative filtering uses interaction patterns across users and items. Matrix factorization learns latent user and item vectors that explain preference structure compactly. Hybrid systems combine content, collaboration, sequence, and business constraints. Real systems often use candidate generation followed by ranking. Evaluation must respect the fact that recommendation is a ranking problem embedded in a live feedback loop. If you remember one sentence from this chapter, remember this: a recommender is not just trying to predict what is good in general, but what should be shown next to this user, from this catalog, under this context, and in this order."
        },
        {
          "id": "recommendation-systems-26-primary-references-used-to-expand-this-chapter",
          "title": "7.26 Primary References Used to Expand This Chapter",
          "figureSrc": "figures/sections/ch07_s26_primary-references-used-to-expand-this-chapter.png",
          "figureAlt": "Visual summary for 7.26 Primary References Used to Expand This Chapter",
          "html": "<ul class=\"md-list\"><li>Koren, Y., Bell, R., and Volinsky, C. &quot;Matrix Factorization Techniques for Recommender Systems&quot; (IEEE Computer 2009): <a href=\"https://www.chrisvolinsky.com/publications/17545-matrix-factorization-techniques-for-recommender-systems\" target=\"_blank\" rel=\"noreferrer\">https://www.chrisvolinsky.com/publications/17545-matrix-factorization-techniques-for-recommender-systems</a></li><li>Hu, Y., Koren, Y., and Volinsky, C. &quot;Collaborative Filtering for Implicit Feedback Datasets&quot; (ICDM 2008): <a href=\"https://www.chrisvolinsky.com/publications/17546-collaborative-filtering-for-implicit-feedback-datasets\" target=\"_blank\" rel=\"noreferrer\">https://www.chrisvolinsky.com/publications/17546-collaborative-filtering-for-implicit-feedback-datasets</a></li><li>Covington, P., Adams, J., and Sargin, E. &quot;Deep Neural Networks for YouTube Recommendations&quot; (RecSys 2016): <a href=\"https://research.google/pubs/pub45530\" target=\"_blank\" rel=\"noreferrer\">https://research.google/pubs/pub45530</a></li><li>Cheng, H. et al. &quot;Wide &amp; Deep Learning for Recommender Systems&quot; (2016): <a href=\"https://research.google/pubs/pub45413\" target=\"_blank\" rel=\"noreferrer\">https://research.google/pubs/pub45413</a></li></ul>",
          "wordCount": 62,
          "readMinutes": 1,
          "searchText": "Koren, Y., Bell, R., and Volinsky, C. &quot;Matrix Factorization Techniques for Recommender Systems&quot; (IEEE Computer 2009): https://www.chrisvolinsky.com/publications/17545-matrix-factorization-techniques-for-recommender-systems Hu, Y., Koren, Y., and Volinsky, C. &quot;Collaborative Filtering for Implicit Feedback Datasets&quot; (ICDM 2008): https://www.chrisvolinsky.com/publications/17546-collaborative-filtering-for-implicit-feedback-datasets Covington, P., Adams, J., and Sargin, E. &quot;Deep Neural Networks for YouTube Recommendations&quot; (RecSys 2016): https://research.google/pubs/pub45530 Cheng, H. et al. &quot;Wide &amp; Deep Learning for Recommender Systems&quot; (2016): https://research.google/pubs/pub45413"
        }
      ],
      "wordCount": 3212,
      "sectionCount": 26,
      "readMinutes": 18,
      "searchText": "Recommendation systems are among the most important real-world applications of machine learning. Search engines rank documents. Online stores rank products. Video platforms rank videos. Music apps rank songs. Social platforms rank posts and people. In all of these cases, the core task is not merely to predict a label. It is to choose what to show, in what order, for whom, and under what constraints. This makes recommendation both practically powerful and conceptually subtle. It combines prediction, representation learning, ranking, decision-making, and user modeling. It also lives in a world of sparse and biased data: users only interact with a small fraction of the available catalog, and what they see is already shaped by the system itself. This chapter develops recommendation from the ground up. We begin with the basic framing of the problem, then examine content-based methods, collaborative filtering, matrix factorization, hybrid and industrial systems, and the metrics used to evaluate them. The goal is not to memorize a bag of algorithms, but to understand the logic of recommendation deeply enough that you can explain why each method exists and when it should be used. A real recommender is usually a pipeline: user signals and item data feed candidate generation, then a ranking model orders the shortlist and learns from later feedback. The first important point is that recommendation is usually a ranking problem, not a plain classification problem. Suppose a movie platform has 100000 titles. The system does not mainly need to answer &quot;Will the user like movie X?&quot; in isolation. What it really needs is a sorted list of which movies should be placed near the top. That changes the nature of the task: relative order matters top positions matter more than lower positions many items may be acceptable, but only a few can be shown the business goal may involve clicks, watch time, purchases, or long-term satisfaction This is why recommender systems often care more about ranking metrics than about ordinary classification accuracy. Recommendation systems can use many kinds of evidence. Explicit feedback includes: star ratings thumbs up or thumbs down direct likes saved favorites Implicit feedback includes: clicks dwell time watch time purchases skips browsing history repeated plays In many real systems, implicit feedback is far more abundant than explicit feedback. Users rarely rate everything they see, but they constantly generate interaction traces. The challenge is that implicit feedback is ambiguous. A click is not the same as love. A missing click does not prove dislike. The user may simply never have seen the item. A classical way to represent recommendation data is as a user-item matrix. rows are users columns are items entries are ratings or interactions Most entries are missing. This sparsity is not a small inconvenience. It is the central structural fact of recommendation. Even active users interact with only a tiny portion of the full catalog. This sparse setting immediately creates several problems: many user-item pairs are unobserved new users and new items have little history direct supervised labels are incomplete and biased patterns must be learned from limited overlap Recommendation methods differ partly in how they cope with this sparsity. Content-based recommendation focuses on item attributes. The idea is simple: if a user liked certain items, recommend other items that resemble them. To make this work, we need item representations. For a movie, those might include: genre director actors year keywords description text For a condo listing, they might include: location price range size number of bedrooms distance to transportation neighborhood features Once we represent each item as a feature vector, we can build a user profile from the items the user has liked or consumed. A simple version averages the feature vectors of previously liked items. A more advanced system may weight recent or strongly preferred items more heavily. In content-based systems, cosine similarity is one of the most common similarity measures. It compares vectors by angle rather than raw magnitude. This is useful because we often care more about the direction of preference than about the absolute size of the vector. If two item vectors point in similar directions, they share similar feature patterns even if one has larger raw values. Likewise, if a user profile points toward certain genres or themes, cosine similarity helps identify items aligned with that direction. Cosine similarity is especially natural for text-derived features such as TF-IDF vectors or dense semantic embeddings. Many recommendable items come with text: movie summaries product titles app descriptions job postings news headlines Two important representation families appear in the course. 7.6.1 TF-IDF TF-IDF stands for term frequency-inverse document frequency. It gives high weight to words that are frequent within one item description but not frequent across the whole corpus. This makes TF-IDF a strong baseline because it highlights distinctive words. If a condo description repeatedly mentions &quot;near BTS&quot; or a movie synopsis contains unusual topic words, TF-IDF can capture that. 7.6.2 Dense Embeddings Sentence or document embeddings go beyond exact word overlap. They try to map text with similar meaning into nearby vectors. This is valuable because users often care about semantic similarity, not only lexical similarity. Two movie summaries may use different wording but describe similar themes. The big conceptual lesson is that recommendation quality depends heavily on representation quality. Better item representations make content-based recommendation much stronger. Content-based recommendation has several strengths. it can recommend new items as soon as their features are known it is often easier to explain it can use rich metadata and text it works even when user overlap is small But it also has limitations. it depends on having meaningful item features it may over-specialize and recommend items too similar to what the user already consumed it may struggle to discover surprising cross-item taste patterns that are not obvious from metadata alone This is why content-based systems are powerful but rarely sufficient on their own at scale. Collaborative filtering takes a different approach. Instead of focusing mainly on item content, it learns from patterns of interaction across many users. The core intuition is: users who behaved similarly in the past may behave similarly in the future items consumed by similar groups of users may have similar recommendation value This lets the system discover latent taste structure even when no explicit content features are available. Collaborative filtering is one of the defining ideas of recommendation because it uses community behavior as a signal. It often captures preferences humans would struggle to encode manually. The most intuitive collaborative-filtering methods are neighborhood methods. In user-user collaborative filtering: find users similar to the target user look at what those users liked recommend those items In item-item collaborative filtering: find items similar to those the user already consumed recommend related items Item-item methods often work well in practice because item relationships can be more stable than user relationships. Amazon&#x27;s famous &quot;people who bought this also bought...&quot; idea is closely related to this logic. Neighborhood methods are useful to learn because they make collaborative filtering intuitive. They also show clearly that recommendation is built from similarity structure, not only from labels. Before learning a complex model, it is often useful to model simple effects. For ratings data, a strong classical baseline is: \\[\\hat{r}_{ui} = \\mu + b_u + b_i\\] where: mu is the global mean rating \\(b_u\\) is a user bias \\(b_i\\) is an item bias Why is this useful? Because some users systematically rate high or low, and some items are broadly popular or unpopular. A good recommender should not force latent factors to relearn these obvious effects from scratch. This leads naturally into matrix factorization with biases. Matrix factorization treats the sparse rating table as the product of user-taste vectors and item-trait vectors, so preference becomes an interaction in a lower-dimensional latent space. Matrix factorization is one of the most important ideas in modern recommendation. Koren, Bell, and Volinsky&#x27;s 2009 paper made this especially influential. The idea is to approximate the user-item matrix using low-dimensional latent vectors: each user gets an embedding \\(p_u\\) each item gets an embedding \\(q_i\\) The predicted preference is often modeled as \\[\\hat{r}_{ui} = \\mu + b_u + b_i + p_u^T q_i\\] The dot product measures how compatible the user and item are in latent space. This is powerful because the model can discover hidden dimensions of taste without requiring manual labels for them. One latent direction may correspond roughly to &quot;prefers action-heavy blockbusters.&quot; Another may correspond to &quot;likes slow serious dramas.&quot; Another may capture &quot;prefers old classics over recent releases.&quot; No human had to predefine those factors. They emerge from the interaction data. Why should a low-dimensional factorization work at all? Because user preferences are usually not arbitrary. They are driven by a smaller number of underlying tendencies or factors. If the full user-item matrix has structure, then a lower-rank approximation can capture a large share of that structure compactly. This is the same broad mathematical idea that appears in PCA: high-dimensional observations may be governed by lower-dimensional patterns. The difference is that matrix factorization in recommendation is optimized to explain user-item interactions rather than generic variance. One of the most important industrial realities is that many systems do not have explicit ratings at all. Instead, they have implicit data such as views, clicks, or purchases. Hu, Koren, and Volinsky&#x27;s 2008 work on implicit feedback is important here. Their key insight is that observed interactions indicate preference with varying confidence, while missing entries are not plain negative labels. This changes the learning problem. In implicit recommendation: observed actions often mean &quot;the user probably had some interest&quot; unobserved items may be unknown, irrelevant, or simply unseen confidence differs across interaction types This is why naive treatment of zeros as dislike is often misleading. Cold start is central to recommendation. 7.14.1 New User Cold Start A new user has little or no interaction history. Collaborative methods struggle because the system does not yet know where to place that user in taste space. 7.14.2 New Item Cold Start A new item has not yet accumulated interactions, so collaborative methods do not know which users it should match. Content-based signals help especially on the new-item side because the item can be recommended from its features before many interactions arrive. This is one of the strongest reasons hybrid systems are common. In practice, many high-performing recommenders combine multiple signals: content-based features collaborative signals user context sequence behavior popularity priors business rules Hybrid systems exist because no single method solves every part of the recommendation problem. Content-based methods help with explainability and new items. Collaborative methods help uncover latent community taste. Sequential models help reflect recent intent. Business heuristics help enforce platform goals and safety constraints. A mature recommender is usually a system, not a single formula. Google&#x27;s Wide and Deep paper gives a useful industrial framing. Recommendation often needs both memorization and generalization. Memorization means remembering specific feature interactions that historically worked well. For example, a particular user segment may love a specific kind of app. Generalization means using embeddings and dense representations to recommend plausible new combinations not seen often before. The wide part captures memorized sparse interactions. The deep part learns more general patterns. Together they address an important real-world tradeoff. This is a very good concept to remember for the final because it explains why deep models alone are not automatically sufficient. Large-scale recommenders rarely score every item in the catalog with a heavy model for every request. The catalog may contain millions of items. A common architecture is therefore two-stage: 7.17.1 Candidate Generation Retrieve a manageable set of plausible items from the full catalog. This stage values speed and recall. It should avoid missing good candidates. 7.17.2 Ranking or Re-Ranking Apply a stronger model to that smaller candidate set. This stage values fine ranking quality. It can use richer features because the candidate set is smaller. The YouTube recommendation paper by Covington, Adams, and Sargin explains this industrial split clearly. This design is one of the most important high-level patterns in recommendation engineering. User preferences are not static. What someone liked years ago may matter less than what they clicked five minutes ago. Recommendation often benefits from: recency session context time of day device context short-term sequence patterns A user who has watched several children&#x27;s videos in a row is in a different moment than a user whose long-term history contains one children&#x27;s video among many unrelated activities. This motivates sequence-aware recommendation and connects recommendation to sequence models studied elsewhere in the course. Because recommendation is a ranking problem, evaluation should emphasize ranked quality. Important metrics include: Precision@K Recall@K Hit Rate Average Precision Mean Average Precision Mean Reciprocal Rank nDCG These metrics answer slightly different questions. Precision@K asks: among the top \\(K\\) shown items, how many were relevant? Recall@K asks: of all relevant items, how many did we manage to surface in the top \\(K\\)? MRR focuses on how early the first relevant item appears. nDCG rewards ranking relevant items high while discounting lower positions. Students should not merely memorize names. They should understand that the top of the ranking matters much more than the bottom. Offline evaluation is useful, but it is not the whole story. A recommender may improve an offline metric yet fail to improve real user outcomes. Why? Because real systems operate in a feedback loop: the system decides what users see what users see affects what they click those clicks affect future training data Online success may be measured by: click-through rate watch time conversion retention satisfaction diversity of exposure An especially important caution is that missing interaction does not mean irrelevance. The user may never have seen the item. This selection bias makes offline recommendation evaluation fundamentally tricky. A recommender that only shows the safest similar items may get stuck in a narrow loop. This can reduce discovery and long-term satisfaction. Therefore practical systems often care not only about immediate relevance, but also about: diversity novelty serendipity coverage These ideas matter because recommendation is not just prediction. It shapes what the user experiences. Another deep issue is exploration versus exploitation. If a system always recommends what it already thinks is best, it may never gather evidence about other possibilities. But if it explores too aggressively, user experience may suffer. A good recommender balances: exploitation of what currently seems promising exploration to learn more about users and items Even if your course treats this only lightly, the idea is worth understanding because it explains why recommendation is tied to online decision-making. Typical exam questions on recommendation often ask you to: compare content-based and collaborative filtering explain cold start interpret cosine similarity describe matrix factorization intuitively explain why ranking metrics are preferred discuss why implicit feedback is difficult describe a two-stage recommender pipeline The strongest answers will not only define terms but also explain why each method exists. Students often make the following mistakes. treating recommendation as ordinary classification assuming missing interaction means dislike claiming collaborative filtering needs item metadata claiming content-based recommendation can solve everything if enough features are added forgetting that ranking position matters describing matrix factorization as merely compressing the matrix without explaining latent preference structure These mistakes usually happen when someone memorizes vocabulary without understanding the task structure. Recommendation systems predict and rank items for users under sparse, biased, and dynamic data conditions. Content-based methods use item features and profile similarity. Collaborative filtering uses interaction patterns across users and items. Matrix factorization learns latent user and item vectors that explain preference structure compactly. Hybrid systems combine content, collaboration, sequence, and business constraints. Real systems often use candidate generation followed by ranking. Evaluation must respect the fact that recommendation is a ranking problem embedded in a live feedback loop. If you remember one sentence from this chapter, remember this: a recommender is not just trying to predict what is good in general, but what should be shown next to this user, from this catalog, under this context, and in this order. Koren, Y., Bell, R., and Volinsky, C. &quot;Matrix Factorization Techniques for Recommender Systems&quot; (IEEE Computer 2009): https://www.chrisvolinsky.com/publications/17545-matrix-factorization-techniques-for-recommender-systems Hu, Y., Koren, Y., and Volinsky, C. &quot;Collaborative Filtering for Implicit Feedback Datasets&quot; (ICDM 2008): https://www.chrisvolinsky.com/publications/17546-collaborative-filtering-for-implicit-feedback-datasets Covington, P., Adams, J., and Sargin, E. &quot;Deep Neural Networks for YouTube Recommendations&quot; (RecSys 2016): https://research.google/pubs/pub45530 Cheng, H. et al. &quot;Wide &amp; Deep Learning for Recommender Systems&quot; (2016): https://research.google/pubs/pub45413 A recommender is trying to decide what to show next, to whom, and in what order. That makes it a ranking problem shaped by sparse data, behavior feedback, and changing user intent. Picture a huge user-item table with almost every cell missing. Recommendation is the art of filling in useful parts of that table or ranking promising items even when direct evidence is very sparse. Sequence models and generative systems later reuse many of the same ideas: embeddings, context, retrieval, ranking, and behavior prediction under uncertainty. I can explain why recommendation is ranking, not just classification. I can compare content-based, collaborative, and latent-factor approaches. I can explain new-user and new-item cold start clearly. I can explain why implicit feedback is useful but noisy. Bias baseline A strong baseline prediction includes the global mean plus user and item biases. Some users systematically rate high or low, and some items are broadly popular or unpopular even before latent taste factors enter. Latent factor model The interaction between user and item embeddings estimates how well they fit in latent taste space. The dot product becomes large when the user vector aligns well with the item's hidden factors. Precision at K This tells us how concentrated the top of the ranking is with useful items. Recommendation quality depends heavily on what appears near the top because users rarely inspect the entire list. Why collaborative filtering can discover hidden taste Two movies may look different by genre tags, but the same unusual set of users consistently loves both. A collaborative method can notice that shared behavior pattern even if the metadata never explicitly described the hidden connection. That is why collaborative filtering can uncover taste structure beyond surface item features. Why missing data is not the same as negative data A user did not click a video. That could mean the user disliked it, but it could also mean the user never saw it. Recommendation data is therefore biased by exposure, which makes implicit-feedback learning and evaluation more delicate than standard supervised labeling. Why can content-based recommendation help with brand-new items better than pure collaborative filtering? Because a new item can be represented from its known features immediately, while collaborative methods need interaction history before they know where that item belongs in behavior space. Why do large systems use candidate generation before ranking? Because scoring an enormous catalog with a heavy model for every request is too expensive, so a fast stage first narrows the catalog to a plausible smaller set. What is the danger of optimizing only click-through rate? It can favor short-term engagement while ignoring diversity, novelty, satisfaction, or long-term user value. Why do embeddings help recommendation beyond hand-built metadata? Because embeddings can capture hidden structure and interaction patterns that are not explicitly described by manual item fields. Why is evaluation harder in recommendation than in many classification problems? Because the system only observes interactions on exposed items, ranking order matters, and the model's own behavior shapes the future data it gets to learn from."
    },
    {
      "chapter": 8,
      "slug": "sequence-models",
      "title": "8 Sequence Models",
      "shortTitle": "Sequence Models",
      "badge": "Chapter 8",
      "summary": "RNNs, LSTMs, seq2seq, attention, and Transformers as solutions to ordered-data problems.",
      "goals": [
        "Understand why order changes the learning problem.",
        "Explain vanishing gradients and how LSTM gates help.",
        "See why attention and Transformers became dominant."
      ],
      "traps": [
        "Assuming plain RNNs automatically remember everything important.",
        "Confusing teacher forcing during training with inference-time generation.",
        "Memorizing the attention formula without understanding query, key, and value."
      ],
      "formulas": [
        "RNN update: h_t = phi(W_x x_t + W_h h_(t-1) + b)",
        "Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) V",
        "LSTM memory update: c_t = f_t * c_(t-1) + i_t * g_t"
      ],
      "starterQuestions": [
        "Why does order make bag-of-words reasoning fail?",
        "Why is a fixed encoder bottleneck a problem for long sequences?",
        "Why can attention model long-range interaction more directly than recurrence?"
      ],
      "introHtml": "<p>Many machine-learning problems cannot be understood correctly unless order is taken seriously. Language is ordered. Speech is ordered. User behavior in a session is ordered. Financial signals are ordered. Weather unfolds over time. In all of these settings, the same set of elements arranged in a different order can mean something completely different.</p>\n<p>This chapter studies the family of models designed for such data. We begin with recurrent neural networks, explain why they are conceptually natural but hard to train over long ranges, then develop LSTMs, sequence-to-sequence models, attention, and Transformers. These ideas are among the most important bridges between classical deep learning and modern generative AI.</p>\n<p>The goal is not only to know the names of the architectures. The goal is to understand what problem each one was trying to solve.</p>\n<figure class=\"md-figure\"><img src=\"figures/ch08_sequence_memory.png\" alt=\"Sequence models must preserve useful context over time: a plain RNN repeatedly rewrites one hidden state, while an LSTM adds a longer-lived cell state that is controlled by gates.\" loading=\"lazy\" /><figcaption>Sequence models must preserve useful context over time: a plain RNN repeatedly rewrites one hidden state, while an LSTM adds a longer-lived cell state that is controlled by gates.</figcaption></figure>",
      "plainEnglishHtml": "<p>Sequence models exist because order changes meaning. The model must not only know what the pieces are, but also how earlier pieces affect later ones.</p>",
      "mentalModelHtml": "<p>You can think of sequence modeling as memory management. The central question is always: what information should be preserved, what should be forgotten, and how should the model retrieve the relevant past when it needs it?</p>",
      "bridgeForwardHtml": "<p>Large language models and modern generative AI are direct descendants of this topic. If sequence modeling clicks, the jump to autoregressive text generation becomes much easier.</p>",
      "masteryChecklist": [
        "I can explain why sequence order changes the problem fundamentally.",
        "I can explain vanishing gradients and why LSTM gating helps.",
        "I can explain teacher forcing and exposure bias.",
        "I can explain attention as learned relevance weighting rather than as a mysterious black box."
      ],
      "equationNotebook": [
        {
          "label": "RNN state update",
          "latex": "h_t = \\phi(W_x x_t + W_h h_{t-1} + b)",
          "meaning": "A recurrent model updates its hidden state from the current input and the previous state.",
          "intuition": "The hidden state is trying to summarize the relevant past, but in a plain RNN that memory path is fragile over long ranges."
        },
        {
          "label": "LSTM memory update",
          "latex": "c_t = f_t \\cdot c_{t-1} + i_t \\cdot g_t",
          "meaning": "The cell state keeps part of the old memory and writes selected new content.",
          "intuition": "This is why LSTM can preserve important information more stably than a plain recurrent update."
        },
        {
          "label": "Scaled dot-product attention",
          "latex": "\\mathrm{Attention}(Q, K, V) = \\mathrm{softmax}\\!\\left(\\frac{QK^\\top}{\\sqrt{d_k}}\\right)V",
          "meaning": "Attention scores how strongly a query should use each key, then mixes the values using those normalized weights.",
          "intuition": "It is a learned relevance lookup: matching decides where to look, and values provide the content to aggregate."
        }
      ],
      "workedExamples": [
        {
          "title": "Why LSTM was introduced",
          "scenarioHtml": "<p>A plain RNN must carry important information through many repeated transformations, and gradients can vanish or explode before they connect early evidence to late decisions.</p>",
          "walkthroughHtml": "<p>LSTM creates a more controlled memory path. Forget, input, and output gates regulate what gets kept, written, and exposed, making long-range learning far more stable in practice.</p>",
          "searchText": "Why LSTM was introduced A plain RNN must carry important information through many repeated transformations, and gradients can vanish or explode before they connect early evidence to late decisions. LSTM creates a more controlled memory path. Forget, input, and output gates regulate what gets kept, written, and exposed, making long-range learning far more stable in practice."
        },
        {
          "title": "Why attention changed the field",
          "scenarioHtml": "<p>A decoder trying to generate one token from one fixed encoder vector may lose access to detail from long inputs.</p>",
          "walkthroughHtml": "<p>Attention replaces that one-vector bottleneck with dynamic lookup over source states. The model can focus on whichever parts of the input matter for the current output step, which is a major conceptual leap.</p>",
          "searchText": "Why attention changed the field A decoder trying to generate one token from one fixed encoder vector may lose access to detail from long inputs. Attention replaces that one-vector bottleneck with dynamic lookup over source states. The model can focus on whichever parts of the input matter for the current output step, which is a major conceptual leap."
        }
      ],
      "supplementalQuestions": [
        {
          "prompt": "Why is it useful to think of an unrolled RNN as a deep network over time?",
          "answer": "Because it makes the gradient problem easier to see: long sequences create long paths for error signals, which is exactly why vanishing and exploding gradients appear."
        },
        {
          "prompt": "Why does teacher forcing help during training but create a mismatch at inference time?",
          "answer": "Because during training the decoder sees the true previous token, but during inference it must condition on its own predictions, which may include mistakes."
        },
        {
          "prompt": "Why can Transformers be trained more efficiently on modern hardware than RNNs?",
          "answer": "Because attention-based layers allow much more parallel computation during training instead of strict token-by-token recurrence."
        },
        {
          "prompt": "Why are multiple attention heads useful rather than redundant?",
          "answer": "Because different heads can learn different relevance patterns or relational views of the same sequence in parallel."
        },
        {
          "prompt": "Why does positional information still matter in a Transformer?",
          "answer": "Because attention alone does not inherently encode token order, so positional signals are needed to distinguish sequences with the same tokens in different arrangements."
        }
      ],
      "sections": [
        {
          "id": "sequence-models-01-why-sequence-structure-changes-the-problem",
          "title": "8.1 Why Sequence Structure Changes the Problem",
          "figureSrc": "figures/sections/ch08_s01_why-sequence-structure-changes-the-problem.png",
          "figureAlt": "Visual summary for 8.1 Why Sequence Structure Changes the Problem",
          "html": "<p>If we ignore order, then many tasks collapse into nonsense.</p>\n<p>The sentence:</p>\n<p><code>dog bites man</code></p>\n<p>contains the same words as:</p>\n<p><code>man bites dog</code></p>\n<p>but the meaning is very different.</p>\n<p>Likewise, a user who watched three videos about calculus in a row is in a different short-term state than a user who watched one calculus video three years ago. A weather pattern that intensifies over five time steps is different from one that weakens over those same values in reverse order.</p>\n<p>This is the key reason ordinary feedforward models are often insufficient for sequence tasks. They do not have a built-in mechanism for state that evolves over time.</p>",
          "wordCount": 107,
          "readMinutes": 1,
          "searchText": "If we ignore order, then many tasks collapse into nonsense. The sentence: dog bites man contains the same words as: man bites dog but the meaning is very different. Likewise, a user who watched three videos about calculus in a row is in a different short-term state than a user who watched one calculus video three years ago. A weather pattern that intensifies over five time steps is different from one that weakens over those same values in reverse order. This is the key reason ordinary feedforward models are often insufficient for sequence tasks. They do not have a built-in mechanism for state that evolves over time."
        },
        {
          "id": "sequence-models-02-recurrent-neural-networks",
          "title": "8.2 Recurrent Neural Networks",
          "figureSrc": "figures/sections/ch08_s02_recurrent-neural-networks.png",
          "figureAlt": "Visual summary for 8.2 Recurrent Neural Networks",
          "html": "<p>A recurrent neural network, or RNN, processes a sequence one step at a time. At time \\(t\\), it reads the current input \\(x_t\\) together with a hidden state \\(h_{t-1}\\) carried from the previous step. It then updates the hidden state:</p>\n<div class=\"math-display\">\\[h_t = \\phi(W_x x_t + W_h h_{t-1} + b)\\]</div>\n<p>where <code>phi</code> is usually a nonlinearity such as <code>tanh</code>.</p>\n<p>This recurrence creates memory. The hidden state is meant to summarize the relevant past.</p>\n<p>That is the beauty of the RNN idea. The same network can process variable-length sequences because it reuses the same parameters at every time step.</p>",
          "wordCount": 98,
          "readMinutes": 1,
          "searchText": "A recurrent neural network, or RNN, processes a sequence one step at a time. At time \\(t\\), it reads the current input \\(x_t\\) together with a hidden state \\(h_{t-1}\\) carried from the previous step. It then updates the hidden state: \\[h_t = \\phi(W_x x_t + W_h h_{t-1} + b)\\] where phi is usually a nonlinearity such as tanh . This recurrence creates memory. The hidden state is meant to summarize the relevant past. That is the beauty of the RNN idea. The same network can process variable-length sequences because it reuses the same parameters at every time step."
        },
        {
          "id": "sequence-models-03-why-parameter-sharing-across-time-matters",
          "title": "8.3 Why Parameter Sharing Across Time Matters",
          "figureSrc": "figures/sections/ch08_s03_why-parameter-sharing-across-time-matters.png",
          "figureAlt": "Visual summary for 8.3 Why Parameter Sharing Across Time Matters",
          "html": "<p>The fact that an RNN reuses the same weights at every time step is extremely important.</p>\n<p>Without this sharing, a model handling 100 time steps would need a different set of parameters for each position. That would be wasteful and would not generalize naturally to different sequence lengths.</p>\n<p>Parameter sharing means:</p>\n<ul class=\"md-list\"><li>the same update rule is reused over time</li><li>the model can process variable-length inputs</li><li>the number of parameters does not grow with sequence length</li></ul>\n<p>This is why recurrence was such a natural early solution for sequence learning.</p>",
          "wordCount": 88,
          "readMinutes": 1,
          "searchText": "The fact that an RNN reuses the same weights at every time step is extremely important. Without this sharing, a model handling 100 time steps would need a different set of parameters for each position. That would be wasteful and would not generalize naturally to different sequence lengths. Parameter sharing means: the same update rule is reused over time the model can process variable-length inputs the number of parameters does not grow with sequence length This is why recurrence was such a natural early solution for sequence learning."
        },
        {
          "id": "sequence-models-04-input-output-patterns-in-sequence-tasks",
          "title": "8.4 Input-Output Patterns in Sequence Tasks",
          "figureSrc": "figures/sections/ch08_s04_input-output-patterns-in-sequence-tasks.png",
          "figureAlt": "Visual summary for 8.4 Input-Output Patterns in Sequence Tasks",
          "html": "<p>Sequence models can be used in several structural settings.</p>\n<h4>8.4.1 Sequence to One</h4>\n<p>A sequence input produces one output. Example: sentiment classification from a sentence.</p>\n<h4>8.4.2 One to Sequence</h4>\n<p>A fixed input produces a sequence output. Example: image captioning.</p>\n<h4>8.4.3 Sequence to Sequence</h4>\n<p>A sequence input produces a sequence output. Example: machine translation.</p>\n<h4>8.4.4 Sequence to Sequence with Aligned Outputs</h4>\n<p>An output is produced at every time step. Example: part-of-speech tagging or frame-by-frame event labeling.</p>\n<p>Understanding these patterns helps students see that sequence modeling is not one single task but a family of structured problems.</p>",
          "wordCount": 95,
          "readMinutes": 1,
          "searchText": "Sequence models can be used in several structural settings. 8.4.1 Sequence to One A sequence input produces one output. Example: sentiment classification from a sentence. 8.4.2 One to Sequence A fixed input produces a sequence output. Example: image captioning. 8.4.3 Sequence to Sequence A sequence input produces a sequence output. Example: machine translation. 8.4.4 Sequence to Sequence with Aligned Outputs An output is produced at every time step. Example: part-of-speech tagging or frame-by-frame event labeling. Understanding these patterns helps students see that sequence modeling is not one single task but a family of structured problems."
        },
        {
          "id": "sequence-models-05-backpropagation-through-time",
          "title": "8.5 Backpropagation Through Time",
          "figureSrc": "figures/sections/ch08_s05_backpropagation-through-time.png",
          "figureAlt": "Visual summary for 8.5 Backpropagation Through Time",
          "html": "<p>Training an RNN uses gradient descent just like other neural networks, but the chain rule must pass through repeated time steps. This procedure is called backpropagation through time, or BPTT.</p>\n<p>You can think of an RNN unrolled across time as a deep network whose depth equals the number of time steps. The same parameters appear again and again in that unrolled graph.</p>\n<p>This viewpoint makes the central training difficulty obvious: long sequences create long gradient paths.</p>",
          "wordCount": 76,
          "readMinutes": 1,
          "searchText": "Training an RNN uses gradient descent just like other neural networks, but the chain rule must pass through repeated time steps. This procedure is called backpropagation through time, or BPTT. You can think of an RNN unrolled across time as a deep network whose depth equals the number of time steps. The same parameters appear again and again in that unrolled graph. This viewpoint makes the central training difficulty obvious: long sequences create long gradient paths."
        },
        {
          "id": "sequence-models-06-vanishing-and-exploding-gradients",
          "title": "8.6 Vanishing and Exploding Gradients",
          "figureSrc": "figures/sections/ch08_s06_vanishing-and-exploding-gradients.png",
          "figureAlt": "Visual summary for 8.6 Vanishing and Exploding Gradients",
          "html": "<p>When gradients are multiplied through many time steps, they can shrink toward zero or grow very large.</p>\n<p>If they shrink, we get vanishing gradients. Then information from far back in the sequence has very little influence on parameter updates. The model becomes biased toward short-term dependencies.</p>\n<p>If they grow uncontrollably, we get exploding gradients. Then training becomes unstable and can diverge.</p>\n<p>This is not a minor technical annoyance. It is the main reason simple RNNs struggle with long-range dependencies.</p>\n<p>A useful intuition is this: even if the model should remember something from 100 steps ago, gradient signals may die before they get there.</p>",
          "wordCount": 103,
          "readMinutes": 1,
          "searchText": "When gradients are multiplied through many time steps, they can shrink toward zero or grow very large. If they shrink, we get vanishing gradients. Then information from far back in the sequence has very little influence on parameter updates. The model becomes biased toward short-term dependencies. If they grow uncontrollably, we get exploding gradients. Then training becomes unstable and can diverge. This is not a minor technical annoyance. It is the main reason simple RNNs struggle with long-range dependencies. A useful intuition is this: even if the model should remember something from 100 steps ago, gradient signals may die before they get there."
        },
        {
          "id": "sequence-models-07-why-long-term-dependencies-are-hard",
          "title": "8.7 Why Long-Term Dependencies Are Hard",
          "figureSrc": "figures/sections/ch08_s07_why-long-term-dependencies-are-hard.png",
          "figureAlt": "Visual summary for 8.7 Why Long-Term Dependencies Are Hard",
          "html": "<p>Imagine a sentence where the meaning of a later word depends on context introduced much earlier. Or imagine a long time series where a key event at the beginning determines what later states mean.</p>\n<p>A plain RNN stores everything in one evolving hidden state and repeatedly transforms it. Over many steps, old information can be overwritten, distorted, or simply become inaccessible to learning.</p>\n<p>This does not mean RNNs are useless. It means their memory mechanism is fragile.</p>\n<p>The search for better sequence models therefore focused on making memory more stable and selective.</p>",
          "wordCount": 92,
          "readMinutes": 1,
          "searchText": "Imagine a sentence where the meaning of a later word depends on context introduced much earlier. Or imagine a long time series where a key event at the beginning determines what later states mean. A plain RNN stores everything in one evolving hidden state and repeatedly transforms it. Over many steps, old information can be overwritten, distorted, or simply become inaccessible to learning. This does not mean RNNs are useless. It means their memory mechanism is fragile. The search for better sequence models therefore focused on making memory more stable and selective."
        },
        {
          "id": "sequence-models-08-long-short-term-memory",
          "title": "8.8 Long Short-Term Memory",
          "figureSrc": "figures/sections/ch08_s08_long-short-term-memory.png",
          "figureAlt": "Visual summary for 8.8 Long Short-Term Memory",
          "html": "<p>Long Short-Term Memory, or LSTM, was introduced by Hochreiter and Schmidhuber in 1997 to address long-range learning difficulties. Later work added forget gates and helped make the architecture more practical.</p>\n<p>The big idea is that the model should have a more controlled path for memory. Instead of storing everything in one plain hidden state transformation, it maintains a cell state \\(c_t\\) together with gates that regulate information flow.</p>\n<p>The cell state acts like a memory conveyor belt. Gates decide:</p>\n<ul class=\"md-list\"><li>what to forget</li><li>what new information to write</li><li>what to expose as output</li></ul>\n<p>This makes it easier for useful information to persist over longer ranges.</p>",
          "wordCount": 104,
          "readMinutes": 1,
          "searchText": "Long Short-Term Memory, or LSTM, was introduced by Hochreiter and Schmidhuber in 1997 to address long-range learning difficulties. Later work added forget gates and helped make the architecture more practical. The big idea is that the model should have a more controlled path for memory. Instead of storing everything in one plain hidden state transformation, it maintains a cell state \\(c_t\\) together with gates that regulate information flow. The cell state acts like a memory conveyor belt. Gates decide: what to forget what new information to write what to expose as output This makes it easier for useful information to persist over longer ranges."
        },
        {
          "id": "sequence-models-09-the-forget-gate",
          "title": "8.9 The Forget Gate",
          "figureSrc": "figures/sections/ch08_s09_the-forget-gate.png",
          "figureAlt": "Visual summary for 8.9 The Forget Gate",
          "html": "<p>The forget gate determines how much of the previous cell state should remain:</p>\n<div class=\"math-display\">\\[f_t = \\sigma(W_f [h_{t-1}, x_t] + b_f)\\]</div>\n<p>If a component of \\(f_t\\) is near 1, the corresponding memory is mostly retained. If it is near 0, that memory is mostly discarded.</p>\n<p>This is conceptually important because good memory is not only about remembering. It is also about forgetting what no longer matters.</p>",
          "wordCount": 65,
          "readMinutes": 1,
          "searchText": "The forget gate determines how much of the previous cell state should remain: \\[f_t = \\sigma(W_f [h_{t-1}, x_t] + b_f)\\] If a component of \\(f_t\\) is near 1, the corresponding memory is mostly retained. If it is near 0, that memory is mostly discarded. This is conceptually important because good memory is not only about remembering. It is also about forgetting what no longer matters."
        },
        {
          "id": "sequence-models-10-the-input-gate-and-candidate-memory",
          "title": "8.10 The Input Gate and Candidate Memory",
          "figureSrc": "figures/sections/ch08_s10_the-input-gate-and-candidate-memory.png",
          "figureAlt": "Visual summary for 8.10 The Input Gate and Candidate Memory",
          "html": "<p>The input gate determines how much new candidate information should be written into memory:</p>\n<div class=\"math-display\">\\[i_t = \\sigma(W_i [h_{t-1}, x_t] + b_i)\\]</div>\n<p>and a candidate memory is formed, often as</p>\n<div class=\"math-display\">\\[g_t = \\tanh(W_g [h_{t-1}, x_t] + b_g)\\]</div>\n<p>The cell state update then combines retention and writing:</p>\n<div class=\"math-display\">\\[c_t = f_t \\cdot c_{t-1} + i_t \\cdot g_t\\]</div>\n<p>This equation is one of the most important in sequence modeling because it shows why LSTM can maintain more stable information. The old memory is not always completely re-created from scratch. It can be carried forward directly and only selectively modified.</p>",
          "wordCount": 95,
          "readMinutes": 1,
          "searchText": "The input gate determines how much new candidate information should be written into memory: \\[i_t = \\sigma(W_i [h_{t-1}, x_t] + b_i)\\] and a candidate memory is formed, often as \\[g_t = \\tanh(W_g [h_{t-1}, x_t] + b_g)\\] The cell state update then combines retention and writing: \\[c_t = f_t \\cdot c_{t-1} + i_t \\cdot g_t\\] This equation is one of the most important in sequence modeling because it shows why LSTM can maintain more stable information. The old memory is not always completely re-created from scratch. It can be carried forward directly and only selectively modified."
        },
        {
          "id": "sequence-models-11-the-output-gate",
          "title": "8.11 The Output Gate",
          "figureSrc": "figures/sections/ch08_s11_the-output-gate.png",
          "figureAlt": "Visual summary for 8.11 The Output Gate",
          "html": "<p>The output gate determines how much of the internal memory should be exposed to the hidden state:</p>\n<div class=\"math-display\">\\[o_t = \\sigma(W_o [h_{t-1}, x_t] + b_o)\\]</div>\n<p>and then</p>\n<div class=\"math-display\">\\[h_t = o_t \\cdot \\tanh(c_t)\\]</div>\n<p>This separation between internal memory and exposed state is part of what gives LSTM its flexibility.</p>",
          "wordCount": 47,
          "readMinutes": 1,
          "searchText": "The output gate determines how much of the internal memory should be exposed to the hidden state: \\[o_t = \\sigma(W_o [h_{t-1}, x_t] + b_o)\\] and then \\[h_t = o_t \\cdot \\tanh(c_t)\\] This separation between internal memory and exposed state is part of what gives LSTM its flexibility."
        },
        {
          "id": "sequence-models-12-why-lstm-helps",
          "title": "8.12 Why LSTM Helps",
          "figureSrc": "figures/sections/ch08_s12_why-lstm-helps.png",
          "figureAlt": "Visual summary for 8.12 Why LSTM Helps",
          "html": "<p>LSTM does not magically solve every sequence problem, but it greatly improves the ability to learn long-range patterns. The reason is not simply &quot;more parameters.&quot; The reason is architectural control over information flow.</p>\n<p>The network can:</p>\n<ul class=\"md-list\"><li>preserve useful memory</li><li>avoid overwriting it too aggressively</li><li>selectively reveal information</li></ul>\n<p>This is why LSTM became a dominant sequence architecture before Transformers took over many large-scale tasks.</p>",
          "wordCount": 63,
          "readMinutes": 1,
          "searchText": "LSTM does not magically solve every sequence problem, but it greatly improves the ability to learn long-range patterns. The reason is not simply &quot;more parameters.&quot; The reason is architectural control over information flow. The network can: preserve useful memory avoid overwriting it too aggressively selectively reveal information This is why LSTM became a dominant sequence architecture before Transformers took over many large-scale tasks."
        },
        {
          "id": "sequence-models-13-gru-in-brief",
          "title": "8.13 GRU in Brief",
          "figureSrc": "figures/sections/ch08_s13_gru-in-brief.png",
          "figureAlt": "Visual summary for 8.13 GRU in Brief",
          "html": "<p>Although the lecture may focus more on LSTM, it is worth knowing that Gated Recurrent Units, or GRUs, are a related architecture with fewer gates and a somewhat simpler structure.</p>\n<p>The exam may not require detailed GRU equations, but the conceptual point is useful: many later recurrent architectures tried to keep the gating idea while simplifying the machinery.</p>",
          "wordCount": 58,
          "readMinutes": 1,
          "searchText": "Although the lecture may focus more on LSTM, it is worth knowing that Gated Recurrent Units, or GRUs, are a related architecture with fewer gates and a somewhat simpler structure. The exam may not require detailed GRU equations, but the conceptual point is useful: many later recurrent architectures tried to keep the gating idea while simplifying the machinery."
        },
        {
          "id": "sequence-models-14-sequence-to-sequence-learning",
          "title": "8.14 Sequence-to-Sequence Learning",
          "figureSrc": "figures/sections/ch08_s14_sequence-to-sequence-learning.png",
          "figureAlt": "Visual summary for 8.14 Sequence-to-Sequence Learning",
          "html": "<p>Some problems require transforming one sequence into another:</p>\n<ul class=\"md-list\"><li>English sentence to Thai sentence</li><li>speech signal to text</li><li>input text to summary</li><li>question to answer sequence</li></ul>\n<p>The classical seq2seq architecture uses:</p>\n<ul class=\"md-list\"><li>an encoder to read the input sequence</li><li>a decoder to generate the output sequence</li></ul>\n<p>The 2014 sequence-to-sequence paper by Sutskever, Vinyals, and Le showed that a neural network could learn this mapping end to end with LSTMs.</p>",
          "wordCount": 67,
          "readMinutes": 1,
          "searchText": "Some problems require transforming one sequence into another: English sentence to Thai sentence speech signal to text input text to summary question to answer sequence The classical seq2seq architecture uses: an encoder to read the input sequence a decoder to generate the output sequence The 2014 sequence-to-sequence paper by Sutskever, Vinyals, and Le showed that a neural network could learn this mapping end to end with LSTMs."
        },
        {
          "id": "sequence-models-15-the-encoder-bottleneck",
          "title": "8.15 The Encoder Bottleneck",
          "figureSrc": "figures/sections/ch08_s15_the-encoder-bottleneck.png",
          "figureAlt": "Visual summary for 8.15 The Encoder Bottleneck",
          "html": "<p>Early seq2seq models often compressed the entire input sequence into one final encoder vector, then asked the decoder to produce the full output from that fixed representation.</p>\n<p>This worked surprisingly well, but it created a bottleneck. Long or information-rich inputs were hard to compress into one vector without losing useful detail.</p>\n<p>This bottleneck is one of the main reasons attention became transformative.</p>",
          "wordCount": 62,
          "readMinutes": 1,
          "searchText": "Early seq2seq models often compressed the entire input sequence into one final encoder vector, then asked the decoder to produce the full output from that fixed representation. This worked surprisingly well, but it created a bottleneck. Long or information-rich inputs were hard to compress into one vector without losing useful detail. This bottleneck is one of the main reasons attention became transformative."
        },
        {
          "id": "sequence-models-16-teacher-forcing",
          "title": "8.16 Teacher Forcing",
          "figureSrc": "figures/sections/ch08_s16_teacher-forcing.png",
          "figureAlt": "Visual summary for 8.16 Teacher Forcing",
          "html": "<p>During training of a decoder, the model often uses teacher forcing. That means the decoder receives the true previous output token as input for the next step rather than the model&#x27;s own previous prediction.</p>\n<p>This stabilizes training because one early mistake does not immediately corrupt the rest of the generated sequence during learning.</p>\n<p>But it also creates a mismatch:</p>\n<ul class=\"md-list\"><li>during training, the decoder sees the true history</li><li>during inference, it must rely on its own generated history</li></ul>\n<p>This difference is sometimes called exposure bias. It is a subtle but very important concept.</p>",
          "wordCount": 92,
          "readMinutes": 1,
          "searchText": "During training of a decoder, the model often uses teacher forcing. That means the decoder receives the true previous output token as input for the next step rather than the model&#x27;s own previous prediction. This stabilizes training because one early mistake does not immediately corrupt the rest of the generated sequence during learning. But it also creates a mismatch: during training, the decoder sees the true history during inference, it must rely on its own generated history This difference is sometimes called exposure bias. It is a subtle but very important concept."
        },
        {
          "id": "sequence-models-17-attention",
          "title": "8.17 Attention",
          "figureSrc": "figures/sections/ch08_s17_attention.png",
          "figureAlt": "Visual summary for 8.17 Attention",
          "html": "<p>Bahdanau, Cho, and Bengio&#x27;s attention-based translation model addressed the encoder bottleneck by letting the decoder look back at the encoder states at every output step.</p>\n<p>Instead of one fixed summary vector, the decoder forms a context vector dynamically. It can focus more on whichever source positions matter for the current word being generated.</p>\n<p>This changed sequence modeling profoundly. The model no longer needed to compress everything into one static memory. It could retrieve relevant source information as needed.</p>\n<p>Conceptually, attention says:</p>\n<p>&quot;Do not try to remember everything equally. Learn where to look.&quot;</p>",
          "wordCount": 92,
          "readMinutes": 1,
          "searchText": "Bahdanau, Cho, and Bengio&#x27;s attention-based translation model addressed the encoder bottleneck by letting the decoder look back at the encoder states at every output step. Instead of one fixed summary vector, the decoder forms a context vector dynamically. It can focus more on whichever source positions matter for the current word being generated. This changed sequence modeling profoundly. The model no longer needed to compress everything into one static memory. It could retrieve relevant source information as needed. Conceptually, attention says: &quot;Do not try to remember everything equally. Learn where to look.&quot;"
        },
        {
          "id": "sequence-models-18-alignment-as-a-learned-soft-search",
          "title": "8.18 Alignment as a Learned Soft Search",
          "figureSrc": "figures/sections/ch08_s18_alignment-as-a-learned-soft-search.png",
          "figureAlt": "Visual summary for 8.18 Alignment as a Learned Soft Search",
          "html": "<p>The original attention model is often described as learning alignment. When producing one target token, the decoder assigns scores to different input positions, converts them into weights, and forms a weighted combination of encoder representations.</p>\n<p>This is a soft search rather than a hard discrete jump. The model can spread attention across several positions if needed.</p>\n<p>This idea is so important because it replaces one fixed bottleneck with a flexible routing mechanism.</p>",
          "wordCount": 72,
          "readMinutes": 1,
          "searchText": "The original attention model is often described as learning alignment. When producing one target token, the decoder assigns scores to different input positions, converts them into weights, and forms a weighted combination of encoder representations. This is a soft search rather than a hard discrete jump. The model can spread attention across several positions if needed. This idea is so important because it replaces one fixed bottleneck with a flexible routing mechanism."
        },
        {
          "id": "sequence-models-19-from-attention-to-self-attention",
          "title": "8.19 From Attention to Self-Attention",
          "figureSrc": "figures/sections/ch08_s19_from-attention-to-self-attention.png",
          "figureAlt": "Visual summary for 8.19 From Attention to Self-Attention",
          "html": "<p>Classical attention in seq2seq models connects decoder steps to encoder states. Self-attention generalizes the idea. Here, elements of the same sequence attend to one another.</p>\n<p>This means a token can directly gather information from other relevant tokens in the input, regardless of how far away they are.</p>\n<p>That is a major advantage over recurrence, where long-range interaction must pass through many intermediate steps.</p>\n<figure class=\"md-figure\"><img src=\"figures/ch08_attention_transformer.png\" alt=\"Attention lets one token look directly at multiple relevant positions, and the Transformer stacks self-attention with feed-forward blocks plus residual connections.\" loading=\"lazy\" /><figcaption>Attention lets one token look directly at multiple relevant positions, and the Transformer stacks self-attention with feed-forward blocks plus residual connections.</figcaption></figure>",
          "wordCount": 84,
          "readMinutes": 1,
          "searchText": "Classical attention in seq2seq models connects decoder steps to encoder states. Self-attention generalizes the idea. Here, elements of the same sequence attend to one another. This means a token can directly gather information from other relevant tokens in the input, regardless of how far away they are. That is a major advantage over recurrence, where long-range interaction must pass through many intermediate steps. Attention lets one token look directly at multiple relevant positions, and the Transformer stacks self-attention with feed-forward blocks plus residual connections."
        },
        {
          "id": "sequence-models-20-transformers",
          "title": "8.20 Transformers",
          "figureSrc": "figures/sections/ch08_s20_transformers.png",
          "figureAlt": "Visual summary for 8.20 Transformers",
          "html": "<p>The Transformer, introduced in &quot;Attention Is All You Need,&quot; made attention the central computation rather than just an auxiliary mechanism added to RNNs.</p>\n<p>This was historically decisive.</p>\n<p>Instead of processing tokens strictly through recurrence, Transformers build contextual representations by repeated attention and feed-forward blocks.</p>\n<p>This gives two major advantages:</p>\n<ul class=\"md-list\"><li>much better parallelization during training</li><li>more direct modeling of long-range interactions</li></ul>\n<p>That is why Transformers became dominant in language modeling and later in many other domains.</p>",
          "wordCount": 75,
          "readMinutes": 1,
          "searchText": "The Transformer, introduced in &quot;Attention Is All You Need,&quot; made attention the central computation rather than just an auxiliary mechanism added to RNNs. This was historically decisive. Instead of processing tokens strictly through recurrence, Transformers build contextual representations by repeated attention and feed-forward blocks. This gives two major advantages: much better parallelization during training more direct modeling of long-range interactions That is why Transformers became dominant in language modeling and later in many other domains."
        },
        {
          "id": "sequence-models-21-query-key-and-value",
          "title": "8.21 Query, Key, and Value",
          "figureSrc": "figures/sections/ch08_s21_query-key-and-value.png",
          "figureAlt": "Visual summary for 8.21 Query, Key, and Value",
          "html": "<p>The most famous Transformer equation is:</p>\n<div class=\"math-display\">\\[\\mathrm{Attention}(Q, K, V) = \\mathrm{softmax}\\!\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V\\]</div>\n<p>To understand it deeply, forget the symbols for a moment and ask what job each part is doing.</p>\n<p>Query:</p>\n<ul class=\"md-list\"><li>what information is this token looking for?</li></ul>\n<p>Key:</p>\n<ul class=\"md-list\"><li>what information does each token advertise as relevant?</li></ul>\n<p>Value:</p>\n<ul class=\"md-list\"><li>what content should actually be passed along if attention selects that token?</li></ul>\n<p>Attention scores compare queries with keys. Softmax turns those scores into weights. Those weights combine the values.</p>\n<p>So attention is a content-addressed lookup mechanism.</p>",
          "wordCount": 83,
          "readMinutes": 1,
          "searchText": "The most famous Transformer equation is: \\[\\mathrm{Attention}(Q, K, V) = \\mathrm{softmax}\\!\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V\\] To understand it deeply, forget the symbols for a moment and ask what job each part is doing. Query: what information is this token looking for? Key: what information does each token advertise as relevant? Value: what content should actually be passed along if attention selects that token? Attention scores compare queries with keys. Softmax turns those scores into weights. Those weights combine the values. So attention is a content-addressed lookup mechanism."
        },
        {
          "id": "sequence-models-22-why-the-scaling-by-sqrt-d-k-appears",
          "title": "8.22 Why the Scaling by `sqrt(d_k)` Appears",
          "figureSrc": "figures/sections/ch08_s22_why-the-scaling-by-sqrt-d-k-appears.png",
          "figureAlt": "Visual summary for 8.22 Why the Scaling by `sqrt(d_k)` Appears",
          "html": "<p>If the key dimension is large, raw dot products can become large in magnitude. That can make the softmax overly sharp and hurt optimization. Dividing by \\(\\sqrt{d_k}\\) keeps the score scale more controlled.</p>\n<p>Students often memorize this factor mechanically. A better understanding is that it is there for numerical stability and learning behavior.</p>",
          "wordCount": 53,
          "readMinutes": 1,
          "searchText": "If the key dimension is large, raw dot products can become large in magnitude. That can make the softmax overly sharp and hurt optimization. Dividing by \\(\\sqrt{d_k}\\) keeps the score scale more controlled. Students often memorize this factor mechanically. A better understanding is that it is there for numerical stability and learning behavior."
        },
        {
          "id": "sequence-models-23-multi-head-attention",
          "title": "8.23 Multi-Head Attention",
          "figureSrc": "figures/sections/ch08_s23_multi-head-attention.png",
          "figureAlt": "Visual summary for 8.23 Multi-Head Attention",
          "html": "<p>One attention operation may not capture every kind of relationship needed in a sequence. Multi-head attention lets the model learn several different attention patterns in parallel using separate learned projections.</p>\n<p>Different heads may specialize in different roles:</p>\n<ul class=\"md-list\"><li>local syntactic relations</li><li>long-distance agreement</li><li>entity reference</li><li>phrase-level grouping</li></ul>\n<p>The important point is not that every head becomes humanly interpretable. The point is that multiple attention subspaces increase representational flexibility.</p>",
          "wordCount": 67,
          "readMinutes": 1,
          "searchText": "One attention operation may not capture every kind of relationship needed in a sequence. Multi-head attention lets the model learn several different attention patterns in parallel using separate learned projections. Different heads may specialize in different roles: local syntactic relations long-distance agreement entity reference phrase-level grouping The important point is not that every head becomes humanly interpretable. The point is that multiple attention subspaces increase representational flexibility."
        },
        {
          "id": "sequence-models-24-positional-information",
          "title": "8.24 Positional Information",
          "figureSrc": "figures/sections/ch08_s24_positional-information.png",
          "figureAlt": "Visual summary for 8.24 Positional Information",
          "html": "<p>If a Transformer only used self-attention with no positional information, then the set of tokens would matter but their order would be ambiguous.</p>\n<p>Therefore position must be injected somehow. The original Transformer used positional encodings. Later models also use learned positional embeddings or related variants.</p>\n<p>This reminds us of a deep principle: attention is powerful, but order does not come for free.</p>",
          "wordCount": 62,
          "readMinutes": 1,
          "searchText": "If a Transformer only used self-attention with no positional information, then the set of tokens would matter but their order would be ambiguous. Therefore position must be injected somehow. The original Transformer used positional encodings. Later models also use learned positional embeddings or related variants. This reminds us of a deep principle: attention is powerful, but order does not come for free."
        },
        {
          "id": "sequence-models-25-encoder-and-decoder-in-the-transformer",
          "title": "8.25 Encoder and Decoder in the Transformer",
          "figureSrc": "figures/sections/ch08_s25_encoder-and-decoder-in-the-transformer.png",
          "figureAlt": "Visual summary for 8.25 Encoder and Decoder in the Transformer",
          "html": "<p>The original Transformer has both encoder and decoder stacks.</p>\n<p>Each encoder layer contains:</p>\n<ul class=\"md-list\"><li>self-attention</li><li>feed-forward network</li><li>residual connections</li><li>normalization</li></ul>\n<p>Each decoder layer contains:</p>\n<ul class=\"md-list\"><li>masked self-attention</li><li>encoder-decoder attention</li><li>feed-forward network</li><li>residual connections</li><li>normalization</li></ul>\n<p>Masked self-attention prevents the decoder from seeing future target tokens during training. This preserves the autoregressive nature of generation.</p>",
          "wordCount": 51,
          "readMinutes": 1,
          "searchText": "The original Transformer has both encoder and decoder stacks. Each encoder layer contains: self-attention feed-forward network residual connections normalization Each decoder layer contains: masked self-attention encoder-decoder attention feed-forward network residual connections normalization Masked self-attention prevents the decoder from seeing future target tokens during training. This preserves the autoregressive nature of generation."
        },
        {
          "id": "sequence-models-26-residual-connections-and-layer-normalization",
          "title": "8.26 Residual Connections and Layer Normalization",
          "figureSrc": "figures/sections/ch08_s26_residual-connections-and-layer-normalization.png",
          "figureAlt": "Visual summary for 8.26 Residual Connections and Layer Normalization",
          "html": "<p>Just as ResNet helped image models train deeply, residual connections also help Transformer optimization. The model can refine representations rather than rebuild them from zero at each layer.</p>\n<p>Layer normalization stabilizes hidden representations and helps optimization. Together, these components are part of why deep attention-based stacks can train effectively.</p>",
          "wordCount": 49,
          "readMinutes": 1,
          "searchText": "Just as ResNet helped image models train deeply, residual connections also help Transformer optimization. The model can refine representations rather than rebuild them from zero at each layer. Layer normalization stabilizes hidden representations and helps optimization. Together, these components are part of why deep attention-based stacks can train effectively."
        },
        {
          "id": "sequence-models-27-complexity-and-tradeoffs",
          "title": "8.27 Complexity and Tradeoffs",
          "figureSrc": "figures/sections/ch08_s27_complexity-and-tradeoffs.png",
          "figureAlt": "Visual summary for 8.27 Complexity and Tradeoffs",
          "html": "<p>Transformers are powerful, but they are not free.</p>\n<p>RNNs process tokens sequentially, which limits parallelism but keeps memory structure simple.</p>\n<p>Transformers allow broad parallelization during training, but standard self-attention has cost that grows quickly with sequence length. This is one reason long-context modeling remains an active area of research.</p>\n<p>A strong student answer should recognize that no architecture is universally best under every resource constraint.</p>",
          "wordCount": 65,
          "readMinutes": 1,
          "searchText": "Transformers are powerful, but they are not free. RNNs process tokens sequentially, which limits parallelism but keeps memory structure simple. Transformers allow broad parallelization during training, but standard self-attention has cost that grows quickly with sequence length. This is one reason long-context modeling remains an active area of research. A strong student answer should recognize that no architecture is universally best under every resource constraint."
        },
        {
          "id": "sequence-models-28-decoding-and-beam-search",
          "title": "8.28 Decoding and Beam Search",
          "figureSrc": "figures/sections/ch08_s28_decoding-and-beam-search.png",
          "figureAlt": "Visual summary for 8.28 Decoding and Beam Search",
          "html": "<p>When a sequence model generates output autoregressively, it must choose tokens step by step. Greedy decoding picks the highest-probability token each time. Beam search keeps several promising partial sequences alive at once.</p>\n<p>Beam search is important because locally best token choices do not always lead to globally best sequences.</p>\n<p>Even if your course treats beam search lightly, the concept is useful: sequence generation involves search, not only local prediction.</p>",
          "wordCount": 69,
          "readMinutes": 1,
          "searchText": "When a sequence model generates output autoregressively, it must choose tokens step by step. Greedy decoding picks the highest-probability token each time. Beam search keeps several promising partial sequences alive at once. Beam search is important because locally best token choices do not always lead to globally best sequences. Even if your course treats beam search lightly, the concept is useful: sequence generation involves search, not only local prediction."
        },
        {
          "id": "sequence-models-29-why-transformers-replaced-many-rnn-systems",
          "title": "8.29 Why Transformers Replaced Many RNN Systems",
          "figureSrc": "figures/sections/ch08_s29_why-transformers-replaced-many-rnn-systems.png",
          "figureAlt": "Visual summary for 8.29 Why Transformers Replaced Many RNN Systems",
          "html": "<p>Transformers became dominant not because recurrence was wrong, but because attention-based models scaled better under modern data and hardware regimes.</p>\n<p>They offered:</p>\n<ul class=\"md-list\"><li>better parallel training</li><li>strong long-range interaction modeling</li><li>better scaling to large corpora</li><li>a flexible foundation for pretraining</li></ul>\n<p>This made them especially effective for language modeling, translation, summarization, and later multimodal generation.</p>",
          "wordCount": 53,
          "readMinutes": 1,
          "searchText": "Transformers became dominant not because recurrence was wrong, but because attention-based models scaled better under modern data and hardware regimes. They offered: better parallel training strong long-range interaction modeling better scaling to large corpora a flexible foundation for pretraining This made them especially effective for language modeling, translation, summarization, and later multimodal generation."
        },
        {
          "id": "sequence-models-30-sequence-models-and-the-rest-of-the-course",
          "title": "8.30 Sequence Models and the Rest of the Course",
          "figureSrc": "figures/sections/ch08_s30_sequence-models-and-the-rest-of-the-course.png",
          "figureAlt": "Visual summary for 8.30 Sequence Models and the Rest of the Course",
          "html": "<p>Sequence modeling is not an isolated topic. It connects directly to:</p>\n<ul class=\"md-list\"><li>recommendation through session modeling</li><li>generative AI through autoregressive text generation</li><li>machine translation through seq2seq learning</li><li>evaluation metrics such as BLEU and COMET</li></ul>\n<p>Understanding sequence models therefore helps unify much of the later course content.</p>",
          "wordCount": 45,
          "readMinutes": 1,
          "searchText": "Sequence modeling is not an isolated topic. It connects directly to: recommendation through session modeling generative AI through autoregressive text generation machine translation through seq2seq learning evaluation metrics such as BLEU and COMET Understanding sequence models therefore helps unify much of the later course content."
        },
        {
          "id": "sequence-models-31-common-exam-questions",
          "title": "8.31 Common Exam Questions",
          "figureSrc": "figures/sections/ch08_s31_common-exam-questions.png",
          "figureAlt": "Visual summary for 8.31 Common Exam Questions",
          "html": "<p>Typical questions include:</p>\n<ul class=\"md-list\"><li>explain why order matters</li><li>compare feedforward networks and RNNs</li><li>explain vanishing gradients</li><li>describe how LSTM gates work</li><li>explain teacher forcing</li><li>explain why attention helps seq2seq models</li><li>interpret the roles of query, key, and value</li><li>compare RNNs and Transformers</li></ul>\n<p>The best answers explain the problem each mechanism solves, not just the definition.</p>",
          "wordCount": 54,
          "readMinutes": 1,
          "searchText": "Typical questions include: explain why order matters compare feedforward networks and RNNs explain vanishing gradients describe how LSTM gates work explain teacher forcing explain why attention helps seq2seq models interpret the roles of query, key, and value compare RNNs and Transformers The best answers explain the problem each mechanism solves, not just the definition."
        },
        {
          "id": "sequence-models-32-common-misunderstandings",
          "title": "8.32 Common Misunderstandings",
          "figureSrc": "figures/sections/ch08_s32_common-misunderstandings.png",
          "figureAlt": "Visual summary for 8.32 Common Misunderstandings",
          "html": "<p>Students often make the following mistakes.</p>\n<ul class=\"md-list\"><li>saying RNNs remember everything automatically</li><li>claiming LSTM completely solves long-range reasoning</li><li>confusing the cell state with the hidden state</li><li>thinking teacher forcing is used during normal inference</li><li>memorizing the attention equation without understanding matching and weighted aggregation</li><li>claiming Transformers ignore order entirely without noting positional encoding</li></ul>\n<p>These mistakes usually come from memorizing names without understanding information flow.</p>",
          "wordCount": 63,
          "readMinutes": 1,
          "searchText": "Students often make the following mistakes. saying RNNs remember everything automatically claiming LSTM completely solves long-range reasoning confusing the cell state with the hidden state thinking teacher forcing is used during normal inference memorizing the attention equation without understanding matching and weighted aggregation claiming Transformers ignore order entirely without noting positional encoding These mistakes usually come from memorizing names without understanding information flow."
        },
        {
          "id": "sequence-models-33-big-picture-summary",
          "title": "8.33 Big Picture Summary",
          "figureSrc": "figures/sections/ch08_s33_big-picture-summary.png",
          "figureAlt": "Visual summary for 8.33 Big Picture Summary",
          "html": "<p>Sequence models exist because ordered data cannot be treated as ordinary fixed vectors. RNNs introduced recurrent state, but simple recurrence struggles with vanishing and exploding gradients. LSTMs improved memory through gated control of information flow. Sequence-to-sequence learning enabled end-to-end mapping between sequences, while attention removed the bottleneck of fixed encoder summaries. Transformers then made attention the central engine of sequence modeling, enabling powerful contextual learning at scale.</p>\n<p>If you remember one sentence from this chapter, remember this: sequence modeling is the story of better ways to preserve, access, and update information across positions in ordered data.</p>",
          "wordCount": 96,
          "readMinutes": 1,
          "searchText": "Sequence models exist because ordered data cannot be treated as ordinary fixed vectors. RNNs introduced recurrent state, but simple recurrence struggles with vanishing and exploding gradients. LSTMs improved memory through gated control of information flow. Sequence-to-sequence learning enabled end-to-end mapping between sequences, while attention removed the bottleneck of fixed encoder summaries. Transformers then made attention the central engine of sequence modeling, enabling powerful contextual learning at scale. If you remember one sentence from this chapter, remember this: sequence modeling is the story of better ways to preserve, access, and update information across positions in ordered data."
        },
        {
          "id": "sequence-models-34-primary-references-used-to-expand-this-chapter",
          "title": "8.34 Primary References Used to Expand This Chapter",
          "figureSrc": "figures/sections/ch08_s34_primary-references-used-to-expand-this-chapter.png",
          "figureAlt": "Visual summary for 8.34 Primary References Used to Expand This Chapter",
          "html": "<ul class=\"md-list\"><li>Hochreiter, S. and Schmidhuber, J. &quot;Long Short-Term Memory&quot; (Neural Computation 1997): <a href=\"https://direct.mit.edu/neco/article/9/8/1735/6109/Long-Short-Term-Memory\" target=\"_blank\" rel=\"noreferrer\">https://direct.mit.edu/neco/article/9/8/1735/6109/Long-Short-Term-Memory</a></li><li>Gers, F., Schmidhuber, J., and Cummins, F. &quot;Learning to Forget: Continual Prediction with LSTM&quot; (Neural Computation 2000): <a href=\"https://direct.mit.edu/neco/article/12/10/2451/6415/Learning-to-Forget-Continual-Prediction-with-LSTM\" target=\"_blank\" rel=\"noreferrer\">https://direct.mit.edu/neco/article/12/10/2451/6415/Learning-to-Forget-Continual-Prediction-with-LSTM</a></li><li>Sutskever, I., Vinyals, O., and Le, Q. &quot;Sequence to Sequence Learning with Neural Networks&quot; (NeurIPS 2014): <a href=\"https://papers.nips.cc/paper/5346-sequence-to-sequence-learning-with-neural\" target=\"_blank\" rel=\"noreferrer\">https://papers.nips.cc/paper/5346-sequence-to-sequence-learning-with-neural</a></li><li>Bahdanau, D., Cho, K., and Bengio, Y. &quot;Neural Machine Translation by Jointly Learning to Align and Translate&quot; (2014): <a href=\"https://arxiv.org/abs/1409.0473\" target=\"_blank\" rel=\"noreferrer\">https://arxiv.org/abs/1409.0473</a></li><li>Vaswani, A. et al. &quot;Attention Is All You Need&quot; (NeurIPS 2017): <a href=\"https://papers.nips.cc/paper/7181-attention-is-all-you-need\" target=\"_blank\" rel=\"noreferrer\">https://papers.nips.cc/paper/7181-attention-is-all-you-need</a></li></ul>",
          "wordCount": 78,
          "readMinutes": 1,
          "searchText": "Hochreiter, S. and Schmidhuber, J. &quot;Long Short-Term Memory&quot; (Neural Computation 1997): https://direct.mit.edu/neco/article/9/8/1735/6109/Long-Short-Term-Memory Gers, F., Schmidhuber, J., and Cummins, F. &quot;Learning to Forget: Continual Prediction with LSTM&quot; (Neural Computation 2000): https://direct.mit.edu/neco/article/12/10/2451/6415/Learning-to-Forget-Continual-Prediction-with-LSTM Sutskever, I., Vinyals, O., and Le, Q. &quot;Sequence to Sequence Learning with Neural Networks&quot; (NeurIPS 2014): https://papers.nips.cc/paper/5346-sequence-to-sequence-learning-with-neural Bahdanau, D., Cho, K., and Bengio, Y. &quot;Neural Machine Translation by Jointly Learning to Align and Translate&quot; (2014): https://arxiv.org/abs/1409.0473 Vaswani, A. et al. &quot;Attention Is All You Need&quot; (NeurIPS 2017): https://papers.nips.cc/paper/7181-attention-is-all-you-need"
        }
      ],
      "wordCount": 3206,
      "sectionCount": 34,
      "readMinutes": 18,
      "searchText": "Many machine-learning problems cannot be understood correctly unless order is taken seriously. Language is ordered. Speech is ordered. User behavior in a session is ordered. Financial signals are ordered. Weather unfolds over time. In all of these settings, the same set of elements arranged in a different order can mean something completely different. This chapter studies the family of models designed for such data. We begin with recurrent neural networks, explain why they are conceptually natural but hard to train over long ranges, then develop LSTMs, sequence-to-sequence models, attention, and Transformers. These ideas are among the most important bridges between classical deep learning and modern generative AI. The goal is not only to know the names of the architectures. The goal is to understand what problem each one was trying to solve. Sequence models must preserve useful context over time: a plain RNN repeatedly rewrites one hidden state, while an LSTM adds a longer-lived cell state that is controlled by gates. If we ignore order, then many tasks collapse into nonsense. The sentence: dog bites man contains the same words as: man bites dog but the meaning is very different. Likewise, a user who watched three videos about calculus in a row is in a different short-term state than a user who watched one calculus video three years ago. A weather pattern that intensifies over five time steps is different from one that weakens over those same values in reverse order. This is the key reason ordinary feedforward models are often insufficient for sequence tasks. They do not have a built-in mechanism for state that evolves over time. A recurrent neural network, or RNN, processes a sequence one step at a time. At time \\(t\\), it reads the current input \\(x_t\\) together with a hidden state \\(h_{t-1}\\) carried from the previous step. It then updates the hidden state: \\[h_t = \\phi(W_x x_t + W_h h_{t-1} + b)\\] where phi is usually a nonlinearity such as tanh . This recurrence creates memory. The hidden state is meant to summarize the relevant past. That is the beauty of the RNN idea. The same network can process variable-length sequences because it reuses the same parameters at every time step. The fact that an RNN reuses the same weights at every time step is extremely important. Without this sharing, a model handling 100 time steps would need a different set of parameters for each position. That would be wasteful and would not generalize naturally to different sequence lengths. Parameter sharing means: the same update rule is reused over time the model can process variable-length inputs the number of parameters does not grow with sequence length This is why recurrence was such a natural early solution for sequence learning. Sequence models can be used in several structural settings. 8.4.1 Sequence to One A sequence input produces one output. Example: sentiment classification from a sentence. 8.4.2 One to Sequence A fixed input produces a sequence output. Example: image captioning. 8.4.3 Sequence to Sequence A sequence input produces a sequence output. Example: machine translation. 8.4.4 Sequence to Sequence with Aligned Outputs An output is produced at every time step. Example: part-of-speech tagging or frame-by-frame event labeling. Understanding these patterns helps students see that sequence modeling is not one single task but a family of structured problems. Training an RNN uses gradient descent just like other neural networks, but the chain rule must pass through repeated time steps. This procedure is called backpropagation through time, or BPTT. You can think of an RNN unrolled across time as a deep network whose depth equals the number of time steps. The same parameters appear again and again in that unrolled graph. This viewpoint makes the central training difficulty obvious: long sequences create long gradient paths. When gradients are multiplied through many time steps, they can shrink toward zero or grow very large. If they shrink, we get vanishing gradients. Then information from far back in the sequence has very little influence on parameter updates. The model becomes biased toward short-term dependencies. If they grow uncontrollably, we get exploding gradients. Then training becomes unstable and can diverge. This is not a minor technical annoyance. It is the main reason simple RNNs struggle with long-range dependencies. A useful intuition is this: even if the model should remember something from 100 steps ago, gradient signals may die before they get there. Imagine a sentence where the meaning of a later word depends on context introduced much earlier. Or imagine a long time series where a key event at the beginning determines what later states mean. A plain RNN stores everything in one evolving hidden state and repeatedly transforms it. Over many steps, old information can be overwritten, distorted, or simply become inaccessible to learning. This does not mean RNNs are useless. It means their memory mechanism is fragile. The search for better sequence models therefore focused on making memory more stable and selective. Long Short-Term Memory, or LSTM, was introduced by Hochreiter and Schmidhuber in 1997 to address long-range learning difficulties. Later work added forget gates and helped make the architecture more practical. The big idea is that the model should have a more controlled path for memory. Instead of storing everything in one plain hidden state transformation, it maintains a cell state \\(c_t\\) together with gates that regulate information flow. The cell state acts like a memory conveyor belt. Gates decide: what to forget what new information to write what to expose as output This makes it easier for useful information to persist over longer ranges. The forget gate determines how much of the previous cell state should remain: \\[f_t = \\sigma(W_f [h_{t-1}, x_t] + b_f)\\] If a component of \\(f_t\\) is near 1, the corresponding memory is mostly retained. If it is near 0, that memory is mostly discarded. This is conceptually important because good memory is not only about remembering. It is also about forgetting what no longer matters. The input gate determines how much new candidate information should be written into memory: \\[i_t = \\sigma(W_i [h_{t-1}, x_t] + b_i)\\] and a candidate memory is formed, often as \\[g_t = \\tanh(W_g [h_{t-1}, x_t] + b_g)\\] The cell state update then combines retention and writing: \\[c_t = f_t \\cdot c_{t-1} + i_t \\cdot g_t\\] This equation is one of the most important in sequence modeling because it shows why LSTM can maintain more stable information. The old memory is not always completely re-created from scratch. It can be carried forward directly and only selectively modified. The output gate determines how much of the internal memory should be exposed to the hidden state: \\[o_t = \\sigma(W_o [h_{t-1}, x_t] + b_o)\\] and then \\[h_t = o_t \\cdot \\tanh(c_t)\\] This separation between internal memory and exposed state is part of what gives LSTM its flexibility. LSTM does not magically solve every sequence problem, but it greatly improves the ability to learn long-range patterns. The reason is not simply &quot;more parameters.&quot; The reason is architectural control over information flow. The network can: preserve useful memory avoid overwriting it too aggressively selectively reveal information This is why LSTM became a dominant sequence architecture before Transformers took over many large-scale tasks. Although the lecture may focus more on LSTM, it is worth knowing that Gated Recurrent Units, or GRUs, are a related architecture with fewer gates and a somewhat simpler structure. The exam may not require detailed GRU equations, but the conceptual point is useful: many later recurrent architectures tried to keep the gating idea while simplifying the machinery. Some problems require transforming one sequence into another: English sentence to Thai sentence speech signal to text input text to summary question to answer sequence The classical seq2seq architecture uses: an encoder to read the input sequence a decoder to generate the output sequence The 2014 sequence-to-sequence paper by Sutskever, Vinyals, and Le showed that a neural network could learn this mapping end to end with LSTMs. Early seq2seq models often compressed the entire input sequence into one final encoder vector, then asked the decoder to produce the full output from that fixed representation. This worked surprisingly well, but it created a bottleneck. Long or information-rich inputs were hard to compress into one vector without losing useful detail. This bottleneck is one of the main reasons attention became transformative. During training of a decoder, the model often uses teacher forcing. That means the decoder receives the true previous output token as input for the next step rather than the model&#x27;s own previous prediction. This stabilizes training because one early mistake does not immediately corrupt the rest of the generated sequence during learning. But it also creates a mismatch: during training, the decoder sees the true history during inference, it must rely on its own generated history This difference is sometimes called exposure bias. It is a subtle but very important concept. Bahdanau, Cho, and Bengio&#x27;s attention-based translation model addressed the encoder bottleneck by letting the decoder look back at the encoder states at every output step. Instead of one fixed summary vector, the decoder forms a context vector dynamically. It can focus more on whichever source positions matter for the current word being generated. This changed sequence modeling profoundly. The model no longer needed to compress everything into one static memory. It could retrieve relevant source information as needed. Conceptually, attention says: &quot;Do not try to remember everything equally. Learn where to look.&quot; The original attention model is often described as learning alignment. When producing one target token, the decoder assigns scores to different input positions, converts them into weights, and forms a weighted combination of encoder representations. This is a soft search rather than a hard discrete jump. The model can spread attention across several positions if needed. This idea is so important because it replaces one fixed bottleneck with a flexible routing mechanism. Classical attention in seq2seq models connects decoder steps to encoder states. Self-attention generalizes the idea. Here, elements of the same sequence attend to one another. This means a token can directly gather information from other relevant tokens in the input, regardless of how far away they are. That is a major advantage over recurrence, where long-range interaction must pass through many intermediate steps. Attention lets one token look directly at multiple relevant positions, and the Transformer stacks self-attention with feed-forward blocks plus residual connections. The Transformer, introduced in &quot;Attention Is All You Need,&quot; made attention the central computation rather than just an auxiliary mechanism added to RNNs. This was historically decisive. Instead of processing tokens strictly through recurrence, Transformers build contextual representations by repeated attention and feed-forward blocks. This gives two major advantages: much better parallelization during training more direct modeling of long-range interactions That is why Transformers became dominant in language modeling and later in many other domains. The most famous Transformer equation is: \\[\\mathrm{Attention}(Q, K, V) = \\mathrm{softmax}\\!\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V\\] To understand it deeply, forget the symbols for a moment and ask what job each part is doing. Query: what information is this token looking for? Key: what information does each token advertise as relevant? Value: what content should actually be passed along if attention selects that token? Attention scores compare queries with keys. Softmax turns those scores into weights. Those weights combine the values. So attention is a content-addressed lookup mechanism. If the key dimension is large, raw dot products can become large in magnitude. That can make the softmax overly sharp and hurt optimization. Dividing by \\(\\sqrt{d_k}\\) keeps the score scale more controlled. Students often memorize this factor mechanically. A better understanding is that it is there for numerical stability and learning behavior. One attention operation may not capture every kind of relationship needed in a sequence. Multi-head attention lets the model learn several different attention patterns in parallel using separate learned projections. Different heads may specialize in different roles: local syntactic relations long-distance agreement entity reference phrase-level grouping The important point is not that every head becomes humanly interpretable. The point is that multiple attention subspaces increase representational flexibility. If a Transformer only used self-attention with no positional information, then the set of tokens would matter but their order would be ambiguous. Therefore position must be injected somehow. The original Transformer used positional encodings. Later models also use learned positional embeddings or related variants. This reminds us of a deep principle: attention is powerful, but order does not come for free. The original Transformer has both encoder and decoder stacks. Each encoder layer contains: self-attention feed-forward network residual connections normalization Each decoder layer contains: masked self-attention encoder-decoder attention feed-forward network residual connections normalization Masked self-attention prevents the decoder from seeing future target tokens during training. This preserves the autoregressive nature of generation. Just as ResNet helped image models train deeply, residual connections also help Transformer optimization. The model can refine representations rather than rebuild them from zero at each layer. Layer normalization stabilizes hidden representations and helps optimization. Together, these components are part of why deep attention-based stacks can train effectively. Transformers are powerful, but they are not free. RNNs process tokens sequentially, which limits parallelism but keeps memory structure simple. Transformers allow broad parallelization during training, but standard self-attention has cost that grows quickly with sequence length. This is one reason long-context modeling remains an active area of research. A strong student answer should recognize that no architecture is universally best under every resource constraint. When a sequence model generates output autoregressively, it must choose tokens step by step. Greedy decoding picks the highest-probability token each time. Beam search keeps several promising partial sequences alive at once. Beam search is important because locally best token choices do not always lead to globally best sequences. Even if your course treats beam search lightly, the concept is useful: sequence generation involves search, not only local prediction. Transformers became dominant not because recurrence was wrong, but because attention-based models scaled better under modern data and hardware regimes. They offered: better parallel training strong long-range interaction modeling better scaling to large corpora a flexible foundation for pretraining This made them especially effective for language modeling, translation, summarization, and later multimodal generation. Sequence modeling is not an isolated topic. It connects directly to: recommendation through session modeling generative AI through autoregressive text generation machine translation through seq2seq learning evaluation metrics such as BLEU and COMET Understanding sequence models therefore helps unify much of the later course content. Typical questions include: explain why order matters compare feedforward networks and RNNs explain vanishing gradients describe how LSTM gates work explain teacher forcing explain why attention helps seq2seq models interpret the roles of query, key, and value compare RNNs and Transformers The best answers explain the problem each mechanism solves, not just the definition. Students often make the following mistakes. saying RNNs remember everything automatically claiming LSTM completely solves long-range reasoning confusing the cell state with the hidden state thinking teacher forcing is used during normal inference memorizing the attention equation without understanding matching and weighted aggregation claiming Transformers ignore order entirely without noting positional encoding These mistakes usually come from memorizing names without understanding information flow. Sequence models exist because ordered data cannot be treated as ordinary fixed vectors. RNNs introduced recurrent state, but simple recurrence struggles with vanishing and exploding gradients. LSTMs improved memory through gated control of information flow. Sequence-to-sequence learning enabled end-to-end mapping between sequences, while attention removed the bottleneck of fixed encoder summaries. Transformers then made attention the central engine of sequence modeling, enabling powerful contextual learning at scale. If you remember one sentence from this chapter, remember this: sequence modeling is the story of better ways to preserve, access, and update information across positions in ordered data. Hochreiter, S. and Schmidhuber, J. &quot;Long Short-Term Memory&quot; (Neural Computation 1997): https://direct.mit.edu/neco/article/9/8/1735/6109/Long-Short-Term-Memory Gers, F., Schmidhuber, J., and Cummins, F. &quot;Learning to Forget: Continual Prediction with LSTM&quot; (Neural Computation 2000): https://direct.mit.edu/neco/article/12/10/2451/6415/Learning-to-Forget-Continual-Prediction-with-LSTM Sutskever, I., Vinyals, O., and Le, Q. &quot;Sequence to Sequence Learning with Neural Networks&quot; (NeurIPS 2014): https://papers.nips.cc/paper/5346-sequence-to-sequence-learning-with-neural Bahdanau, D., Cho, K., and Bengio, Y. &quot;Neural Machine Translation by Jointly Learning to Align and Translate&quot; (2014): https://arxiv.org/abs/1409.0473 Vaswani, A. et al. &quot;Attention Is All You Need&quot; (NeurIPS 2017): https://papers.nips.cc/paper/7181-attention-is-all-you-need Sequence models exist because order changes meaning. The model must not only know what the pieces are, but also how earlier pieces affect later ones. You can think of sequence modeling as memory management. The central question is always: what information should be preserved, what should be forgotten, and how should the model retrieve the relevant past when it needs it? Large language models and modern generative AI are direct descendants of this topic. If sequence modeling clicks, the jump to autoregressive text generation becomes much easier. I can explain why sequence order changes the problem fundamentally. I can explain vanishing gradients and why LSTM gating helps. I can explain teacher forcing and exposure bias. I can explain attention as learned relevance weighting rather than as a mysterious black box. RNN state update A recurrent model updates its hidden state from the current input and the previous state. The hidden state is trying to summarize the relevant past, but in a plain RNN that memory path is fragile over long ranges. LSTM memory update The cell state keeps part of the old memory and writes selected new content. This is why LSTM can preserve important information more stably than a plain recurrent update. Scaled dot-product attention Attention scores how strongly a query should use each key, then mixes the values using those normalized weights. It is a learned relevance lookup: matching decides where to look, and values provide the content to aggregate. Why LSTM was introduced A plain RNN must carry important information through many repeated transformations, and gradients can vanish or explode before they connect early evidence to late decisions. LSTM creates a more controlled memory path. Forget, input, and output gates regulate what gets kept, written, and exposed, making long-range learning far more stable in practice. Why attention changed the field A decoder trying to generate one token from one fixed encoder vector may lose access to detail from long inputs. Attention replaces that one-vector bottleneck with dynamic lookup over source states. The model can focus on whichever parts of the input matter for the current output step, which is a major conceptual leap. Why is it useful to think of an unrolled RNN as a deep network over time? Because it makes the gradient problem easier to see: long sequences create long paths for error signals, which is exactly why vanishing and exploding gradients appear. Why does teacher forcing help during training but create a mismatch at inference time? Because during training the decoder sees the true previous token, but during inference it must condition on its own predictions, which may include mistakes. Why can Transformers be trained more efficiently on modern hardware than RNNs? Because attention-based layers allow much more parallel computation during training instead of strict token-by-token recurrence. Why are multiple attention heads useful rather than redundant? Because different heads can learn different relevance patterns or relational views of the same sequence in parallel. Why does positional information still matter in a Transformer? Because attention alone does not inherently encode token order, so positional signals are needed to distinguish sequences with the same tokens in different arrangements."
    },
    {
      "chapter": 9,
      "slug": "generative-ai",
      "title": "9 Generative AI",
      "shortTitle": "Generative AI",
      "badge": "Chapter 9",
      "summary": "Autoregressive language models, tokenization, alignment, retrieval, evaluation, and diffusion image generation.",
      "goals": [
        "Understand how next-token prediction powers large language models.",
        "Compare prompting, instruction tuning, RLHF, LoRA, and RAG.",
        "Explain why diffusion models generate strong images and why safety still matters."
      ],
      "traps": [
        "Thinking a fluent answer is probably true.",
        "Confusing LoRA with RAG.",
        "Assuming RLHF guarantees factual correctness."
      ],
      "formulas": [
        "Autoregressive factorization: P(x_1, ..., x_T) = product_t P(x_t | x_<t)",
        "Forward diffusion gradually adds noise; reverse diffusion learns to denoise.",
        "KV cache stores past key-value states to avoid recomputing the whole prefix."
      ],
      "starterQuestions": [
        "Why is training different from inference in a language model?",
        "Why can retrieval solve freshness problems that fine-tuning does not solve well?",
        "Why is diffusion powerful even though it is slower than one-shot generation?"
      ],
      "introHtml": "<p>Generative AI is the part of machine learning concerned with creating new content rather than only predicting existing labels. Modern systems can generate text, code, images, audio, and other structured outputs. Because these models now power chatbots, coding systems, translation tools, image generation, and document assistants, generative AI has become one of the most visible parts of the field.</p>\n<p>But the public visibility can make the topic feel more magical than it really is. Under the surface, generative AI is built from ideas we have already studied:</p>\n<ul class=\"md-list\"><li>probability modeling</li><li>sequence modeling</li><li>representation learning</li><li>optimization</li><li>attention</li></ul>\n<p>This chapter takes a slow and detailed approach. We begin with the basic meaning of generative modeling, then study autoregressive language models, tokenization, decoding, prompting, instruction tuning, RLHF, evaluation, retrieval, parameter-efficient adaptation, efficiency, safety, and diffusion-based image generation. The aim is to build a strong conceptual foundation rather than a pile of fashionable terms.</p>\n<figure class=\"md-figure\"><img src=\"figures/ch09_llm_stack.png\" alt=\"Modern generative AI is a stack: tokenized data supports pretraining, instruction tuning and RLHF shape behavior, and deployed systems often add retrieval, tools, LoRA adapters, caching, and guardrails.\" loading=\"lazy\" /><figcaption>Modern generative AI is a stack: tokenized data supports pretraining, instruction tuning and RLHF shape behavior, and deployed systems often add retrieval, tools, LoRA adapters, caching, and guardrails.</figcaption></figure>",
      "plainEnglishHtml": "<p>Generative AI is about learning a distribution well enough to create new samples from it. In language models, that usually means predicting one token at a time so well that long coherent outputs can emerge.</p>",
      "mentalModelHtml": "<p>Think of a large language model as a powerful next-step predictor wrapped inside a broader system. The model predicts likely continuations; prompting, retrieval, alignment, and tools shape which continuations become useful answers.</p>",
      "bridgeForwardHtml": "<p>This topic blends ideas from probability, sequence modeling, optimization, and systems design. It is less one algorithm than a stack of methods working together.</p>",
      "masteryChecklist": [
        "I can explain next-token prediction and why inference differs from training.",
        "I can compare prompting, instruction tuning, and RLHF without mixing them up.",
        "I can explain why RAG and LoRA solve different problems.",
        "I can describe diffusion at a high level without pretending it is one-step image drawing."
      ],
      "equationNotebook": [
        {
          "label": "Autoregressive factorization",
          "latex": "P(x_1, x_2, \\ldots, x_T) = \\prod_t P(x_t \\mid x_{<t})",
          "meaning": "A full sequence probability is decomposed into next-token predictions conditioned on previous context.",
          "intuition": "This is why a language model can generate long outputs from one repeated local skill: predicting what should come next."
        },
        {
          "label": "Softmax with temperature intuition",
          "latex": "p_i = \\frac{e^{z_i / T}}{\\sum_j e^{z_j / T}}",
          "meaning": "Temperature rescales logits before softmax, changing how sharp or flat the sampling distribution becomes.",
          "intuition": "Lower temperature makes the model more conservative. Higher temperature makes it more diverse but also more prone to drift."
        },
        {
          "label": "Diffusion story",
          "latex": "x_0 \\rightarrow x_1 \\rightarrow x_2 \\rightarrow \\cdots \\rightarrow x_T",
          "meaning": "The forward process gradually corrupts clean data with noise, and the learned reverse process removes it step by step.",
          "intuition": "Diffusion works by solving many small denoising tasks instead of one giant jump from randomness to a finished image."
        }
      ],
      "workedExamples": [
        {
          "title": "Why fluent text is not the same as true text",
          "scenarioHtml": "<p>A model can produce a very confident answer that sounds polished and still be wrong.</p>",
          "walkthroughHtml": "<p>The model is trained to continue text plausibly, not to directly verify reality. Alignment can make it more helpful or safer, but factual grounding often still needs retrieval, tools, or external checking.</p>",
          "searchText": "Why fluent text is not the same as true text A model can produce a very confident answer that sounds polished and still be wrong. The model is trained to continue text plausibly, not to directly verify reality. Alignment can make it more helpful or safer, but factual grounding often still needs retrieval, tools, or external checking."
        },
        {
          "title": "Why RAG beats fine-tuning for fresh facts",
          "scenarioHtml": "<p>A company policy changes every month and the model keeps getting asked about the latest version.</p>",
          "walkthroughHtml": "<p>Updating model weights every time is expensive and brittle. RAG lets the system retrieve the newest document at inference time, which is usually the better design when freshness and traceability matter more than stylistic adaptation.</p>",
          "searchText": "Why RAG beats fine-tuning for fresh facts A company policy changes every month and the model keeps getting asked about the latest version. Updating model weights every time is expensive and brittle. RAG lets the system retrieve the newest document at inference time, which is usually the better design when freshness and traceability matter more than stylistic adaptation."
        }
      ],
      "supplementalQuestions": [
        {
          "prompt": "Why does decoding matter if the model already outputs probabilities?",
          "answer": "Because probabilities are not yet final text. The decoding rule decides how those probabilities are turned into an actual token sequence, which strongly affects diversity and coherence."
        },
        {
          "prompt": "Why is instruction tuning different from pretraining?",
          "answer": "Pretraining teaches broad next-token modeling from general corpora, while instruction tuning specifically teaches the model to respond helpfully to task-like prompts."
        },
        {
          "prompt": "Why does RLHF improve user experience without guaranteeing truth?",
          "answer": "Because it optimizes toward outputs preferred by human raters, which often improves tone and helpfulness but is not the same as direct factual verification."
        },
        {
          "prompt": "Why is KV cache a system optimization rather than a new learning objective?",
          "answer": "Because it speeds up autoregressive inference by reusing prior attention computations rather than changing how the model was trained."
        },
        {
          "prompt": "Why are diffusion models often slower than autoregressive text generation feels conceptually?",
          "answer": "Because image generation typically requires many iterative denoising steps, whereas text generation emits one token at a time from a directly trained autoregressive model."
        }
      ],
      "sections": [
        {
          "id": "generative-ai-01-predictive-models-versus-generative-models",
          "title": "9.1 Predictive Models Versus Generative Models",
          "figureSrc": "figures/sections/ch09_s01_predictive-models-versus-generative-models.png",
          "figureAlt": "Visual summary for 9.1 Predictive Models Versus Generative Models",
          "html": "<p>A predictive model usually maps input to a label or number:</p>\n<ul class=\"md-list\"><li>classify an email as spam or not spam</li><li>predict house price</li><li>identify an image category</li></ul>\n<p>A generative model tries to model a data distribution well enough to produce new samples from it. Depending on the setting, it may model:</p>\n<ul class=\"md-list\"><li>\\(P(X)\\) for unconditional generation</li><li>\\(P(X \\mid Y)\\) for conditional generation</li><li>sometimes joint structure involving both inputs and outputs</li></ul>\n<p>If the model learns the distribution of natural-language sequences, it can generate text. If it learns the distribution of images, it can generate images. If it learns a conditional mapping from prompt to image, it can generate images guided by language.</p>\n<p>The deepest difference is this: predictive modeling selects among known outcomes, while generative modeling creates new outputs that should still look plausible under the learned distribution.</p>",
          "wordCount": 135,
          "readMinutes": 1,
          "searchText": "A predictive model usually maps input to a label or number: classify an email as spam or not spam predict house price identify an image category A generative model tries to model a data distribution well enough to produce new samples from it. Depending on the setting, it may model: \\(P(X)\\) for unconditional generation \\(P(X \\mid Y)\\) for conditional generation sometimes joint structure involving both inputs and outputs If the model learns the distribution of natural-language sequences, it can generate text. If it learns the distribution of images, it can generate images. If it learns a conditional mapping from prompt to image, it can generate images guided by language. The deepest difference is this: predictive modeling selects among known outcomes, while generative modeling creates new outputs that should still look plausible under the learned distribution."
        },
        {
          "id": "generative-ai-02-why-language-modeling-became-central",
          "title": "9.2 Why Language Modeling Became Central",
          "figureSrc": "figures/sections/ch09_s02_why-language-modeling-became-central.png",
          "figureAlt": "Visual summary for 9.2 Why Language Modeling Became Central",
          "html": "<p>Language is a natural fit for generative modeling because it is already a sequence. A sentence can be generated token by token.</p>\n<p>This leads to the autoregressive factorization:</p>\n<div class=\"math-display\">\\[P(x_1, x_2, \\ldots, x_T) = \\prod_t P(x_t \\mid x_{&lt;t})\\]</div>\n<p>In words, the probability of a full sequence is decomposed into next-token prediction conditioned on the previous context.</p>\n<p>This is one of the most important ideas in generative AI. It means that a model can learn to generate a long output by repeatedly solving a simpler local problem: given the context so far, what token should come next?</p>",
          "wordCount": 95,
          "readMinutes": 1,
          "searchText": "Language is a natural fit for generative modeling because it is already a sequence. A sentence can be generated token by token. This leads to the autoregressive factorization: \\[P(x_1, x_2, \\ldots, x_T) = \\prod_t P(x_t \\mid x_{&lt;t})\\] In words, the probability of a full sequence is decomposed into next-token prediction conditioned on the previous context. This is one of the most important ideas in generative AI. It means that a model can learn to generate a long output by repeatedly solving a simpler local problem: given the context so far, what token should come next?"
        },
        {
          "id": "generative-ai-03-training-an-autoregressive-language-model",
          "title": "9.3 Training an Autoregressive Language Model",
          "figureSrc": "figures/sections/ch09_s03_training-an-autoregressive-language-model.png",
          "figureAlt": "Visual summary for 9.3 Training an Autoregressive Language Model",
          "html": "<p>During training, the model sees real text sequences and is asked to predict the next token at each position. The usual loss is cross-entropy over the vocabulary.</p>\n<p>This training setup uses teacher forcing:</p>\n<ul class=\"md-list\"><li>the model is given the true previous tokens</li><li>it predicts the next true token</li></ul>\n<p>This is efficient because one training example can contribute prediction loss at many positions at once.</p>\n<p>The result is a model that has learned a probability distribution over next tokens in context.</p>",
          "wordCount": 79,
          "readMinutes": 1,
          "searchText": "During training, the model sees real text sequences and is asked to predict the next token at each position. The usual loss is cross-entropy over the vocabulary. This training setup uses teacher forcing: the model is given the true previous tokens it predicts the next true token This is efficient because one training example can contribute prediction loss at many positions at once. The result is a model that has learned a probability distribution over next tokens in context."
        },
        {
          "id": "generative-ai-04-inference-is-different-from-training",
          "title": "9.4 Inference Is Different From Training",
          "figureSrc": "figures/sections/ch09_s04_inference-is-different-from-training.png",
          "figureAlt": "Visual summary for 9.4 Inference Is Different From Training",
          "html": "<p>During inference, the model no longer has access to the future true token. It must generate one token, append it to the context, and continue.</p>\n<p>This difference matters because errors can compound. A mediocre token choice early in the sequence may pull the rest of the generation in a weaker direction.</p>\n<p>That is why generation quality depends on two things:</p>\n<ul class=\"md-list\"><li>the trained model</li><li>the decoding strategy used at inference time</li></ul>\n<p>Students often understand the training objective but forget that generation is also a search and control problem.</p>",
          "wordCount": 87,
          "readMinutes": 1,
          "searchText": "During inference, the model no longer has access to the future true token. It must generate one token, append it to the context, and continue. This difference matters because errors can compound. A mediocre token choice early in the sequence may pull the rest of the generation in a weaker direction. That is why generation quality depends on two things: the trained model the decoding strategy used at inference time Students often understand the training objective but forget that generation is also a search and control problem."
        },
        {
          "id": "generative-ai-05-tokens-and-tokenization",
          "title": "9.5 Tokens and Tokenization",
          "figureSrc": "figures/sections/ch09_s05_tokens-and-tokenization.png",
          "figureAlt": "Visual summary for 9.5 Tokens and Tokenization",
          "html": "<p>Modern language models do not usually operate on full words directly. Instead they operate on tokens, which may be:</p>\n<ul class=\"md-list\"><li>whole words</li><li>subword pieces</li><li>punctuation marks</li><li>special symbols</li></ul>\n<p>Tokenization matters more than beginners expect. It affects:</p>\n<ul class=\"md-list\"><li>vocabulary size</li><li>sequence length</li><li>treatment of rare words</li><li>multilingual handling</li><li>efficiency</li></ul>\n<h4>9.5.1 Why Subword Tokenization Became Standard</h4>\n<p>A pure word-level vocabulary becomes huge and still fails on rare or unseen words. A pure character-level model avoids out-of-vocabulary words but makes sequences much longer and learning harder.</p>\n<p>Subword tokenization is a compromise. Frequent words may remain whole, while rare words can be broken into meaningful pieces.</p>\n<h4>9.5.2 BPE and Related Methods</h4>\n<p>The subword-BPE approach popularized by Sennrich, Haddow, and Birch showed how rare-word problems in neural machine translation could be reduced by learning frequent subword merges.</p>\n<p>WordPiece and similar methods use related ideas.</p>\n<p>SentencePiece is especially important conceptually because it treats tokenization itself as a learnable text segmentation process and does not rely on whitespace word boundaries. That is useful for languages such as Thai, where whitespace does not segment words in the same way as English.</p>",
          "wordCount": 181,
          "readMinutes": 1,
          "searchText": "Modern language models do not usually operate on full words directly. Instead they operate on tokens, which may be: whole words subword pieces punctuation marks special symbols Tokenization matters more than beginners expect. It affects: vocabulary size sequence length treatment of rare words multilingual handling efficiency 9.5.1 Why Subword Tokenization Became Standard A pure word-level vocabulary becomes huge and still fails on rare or unseen words. A pure character-level model avoids out-of-vocabulary words but makes sequences much longer and learning harder. Subword tokenization is a compromise. Frequent words may remain whole, while rare words can be broken into meaningful pieces. 9.5.2 BPE and Related Methods The subword-BPE approach popularized by Sennrich, Haddow, and Birch showed how rare-word problems in neural machine translation could be reduced by learning frequent subword merges. WordPiece and similar methods use related ideas. SentencePiece is especially important conceptually because it treats tokenization itself as a learnable text segmentation process and does not rely on whitespace word boundaries. That is useful for languages such as Thai, where whitespace does not segment words in the same way as English."
        },
        {
          "id": "generative-ai-06-embeddings-and-contextualization",
          "title": "9.6 Embeddings and Contextualization",
          "figureSrc": "figures/sections/ch09_s06_embeddings-and-contextualization.png",
          "figureAlt": "Visual summary for 9.6 Embeddings and Contextualization",
          "html": "<p>Once text is tokenized, each token is mapped to a vector embedding. In a Transformer-based language model, these embeddings are then contextualized by attention layers. That means the representation of a token is shaped by surrounding tokens.</p>\n<p>This is why the same token can have different effective meanings in different contexts. The model is not just looking up a static dictionary entry. It is building context-aware representations before predicting the next token.</p>",
          "wordCount": 72,
          "readMinutes": 1,
          "searchText": "Once text is tokenized, each token is mapped to a vector embedding. In a Transformer-based language model, these embeddings are then contextualized by attention layers. That means the representation of a token is shaped by surrounding tokens. This is why the same token can have different effective meanings in different contexts. The model is not just looking up a static dictionary entry. It is building context-aware representations before predicting the next token."
        },
        {
          "id": "generative-ai-07-decoding-turning-probabilities-into-output",
          "title": "9.7 Decoding: Turning Probabilities Into Output",
          "figureSrc": "figures/sections/ch09_s07_decoding-turning-probabilities-into-output.png",
          "figureAlt": "Visual summary for 9.7 Decoding: Turning Probabilities Into Output",
          "html": "<p>At each generation step, the model produces a probability distribution over the next token. But probabilities alone are not yet output. A decision rule is needed.</p>\n<p>This is decoding.</p>\n<h4>9.7.1 Greedy Decoding</h4>\n<p>Greedy decoding selects the highest-probability token at every step.</p>\n<p>It is fast and simple, but it can become repetitive or get trapped in dull local choices. The locally best next token is not always part of the globally best sequence.</p>\n<h4>9.7.2 Beam Search</h4>\n<p>Beam search keeps several promising partial sequences instead of only one. It is common in tasks like translation, where fidelity may matter more than creative diversity.</p>\n<p>However, beam search can still over-favor bland or overly high-probability continuations, and it is not always preferred for open-ended chat generation.</p>\n<h4>9.7.3 Sampling</h4>\n<p>Sampling draws the next token from the probability distribution. This introduces diversity.</p>\n<p>But unrestricted sampling can become unstable because low-probability tokens may derail the sequence.</p>\n<h4>9.7.4 Top-k and Top-p</h4>\n<p>Top-k sampling restricts the choice to the \\(k\\) highest-probability tokens.</p>\n<p>Top-p, or nucleus sampling, restricts the choice to the smallest token set whose cumulative probability exceeds a threshold \\(p\\).</p>\n<p>These methods try to balance coherence and diversity.</p>\n<h4>9.7.5 Temperature</h4>\n<p>Temperature rescales logits before softmax. Lower temperature makes the distribution sharper and more conservative. Higher temperature makes it flatter and more random.</p>\n<p>Temperature does not change the model&#x27;s knowledge. It changes how boldly or cautiously the model samples from that knowledge.</p>",
          "wordCount": 233,
          "readMinutes": 1,
          "searchText": "At each generation step, the model produces a probability distribution over the next token. But probabilities alone are not yet output. A decision rule is needed. This is decoding. 9.7.1 Greedy Decoding Greedy decoding selects the highest-probability token at every step. It is fast and simple, but it can become repetitive or get trapped in dull local choices. The locally best next token is not always part of the globally best sequence. 9.7.2 Beam Search Beam search keeps several promising partial sequences instead of only one. It is common in tasks like translation, where fidelity may matter more than creative diversity. However, beam search can still over-favor bland or overly high-probability continuations, and it is not always preferred for open-ended chat generation. 9.7.3 Sampling Sampling draws the next token from the probability distribution. This introduces diversity. But unrestricted sampling can become unstable because low-probability tokens may derail the sequence. 9.7.4 Top-k and Top-p Top-k sampling restricts the choice to the \\(k\\) highest-probability tokens. Top-p, or nucleus sampling, restricts the choice to the smallest token set whose cumulative probability exceeds a threshold \\(p\\). These methods try to balance coherence and diversity. 9.7.5 Temperature Temperature rescales logits before softmax. Lower temperature makes the distribution sharper and more conservative. Higher temperature makes it flatter and more random. Temperature does not change the model&#x27;s knowledge. It changes how boldly or cautiously the model samples from that knowledge."
        },
        {
          "id": "generative-ai-08-scale-and-in-context-learning",
          "title": "9.8 Scale and In-Context Learning",
          "figureSrc": "figures/sections/ch09_s08_scale-and-in-context-learning.png",
          "figureAlt": "Visual summary for 9.8 Scale and In-Context Learning",
          "html": "<p>One of the striking discoveries of large language models is that scale changes behavior. The GPT-3 paper showed that sufficiently large autoregressive models can perform many tasks in zero-shot, one-shot, or few-shot settings by conditioning on examples in the prompt.</p>\n<p>This is called in-context learning.</p>\n<p>The important conceptual point is that the model is not updating its weights during the prompt. It is adapting behavior from context alone.</p>\n<p>This is one reason large language models feel unusually flexible. A single pretrained model can perform many tasks if prompted appropriately.</p>",
          "wordCount": 89,
          "readMinutes": 1,
          "searchText": "One of the striking discoveries of large language models is that scale changes behavior. The GPT-3 paper showed that sufficiently large autoregressive models can perform many tasks in zero-shot, one-shot, or few-shot settings by conditioning on examples in the prompt. This is called in-context learning. The important conceptual point is that the model is not updating its weights during the prompt. It is adapting behavior from context alone. This is one reason large language models feel unusually flexible. A single pretrained model can perform many tasks if prompted appropriately."
        },
        {
          "id": "generative-ai-09-prompting",
          "title": "9.9 Prompting",
          "figureSrc": "figures/sections/ch09_s09_prompting.png",
          "figureAlt": "Visual summary for 9.9 Prompting",
          "html": "<p>Prompting is the practice of shaping the model&#x27;s input so the output better matches the user&#x27;s goal.</p>\n<p>A strong prompt often includes:</p>\n<ul class=\"md-list\"><li>the task</li><li>needed context</li><li>desired style or role</li><li>output format</li><li>examples if useful</li><li>constraints</li></ul>\n<p>Prompting matters because a language model is a conditional generator. Small changes in conditioning can strongly affect output behavior.</p>\n<p>But prompting also has limits. It cannot reliably substitute for missing knowledge, external retrieval, or alignment. It is a control interface, not a miracle repair tool.</p>",
          "wordCount": 81,
          "readMinutes": 1,
          "searchText": "Prompting is the practice of shaping the model&#x27;s input so the output better matches the user&#x27;s goal. A strong prompt often includes: the task needed context desired style or role output format examples if useful constraints Prompting matters because a language model is a conditional generator. Small changes in conditioning can strongly affect output behavior. But prompting also has limits. It cannot reliably substitute for missing knowledge, external retrieval, or alignment. It is a control interface, not a miracle repair tool."
        },
        {
          "id": "generative-ai-10-why-next-token-prediction-is-not-enough",
          "title": "9.10 Why Next-Token Prediction Is Not Enough",
          "figureSrc": "figures/sections/ch09_s10_why-next-token-prediction-is-not-enough.png",
          "figureAlt": "Visual summary for 9.10 Why Next-Token Prediction Is Not Enough",
          "html": "<p>A raw language model trained only on next-token prediction can imitate text well, but imitation alone does not guarantee that it will:</p>\n<ul class=\"md-list\"><li>follow instructions reliably</li><li>answer helpfully</li><li>refuse unsafe requests</li><li>stay grounded in truth</li><li>format answers in useful ways</li></ul>\n<p>This leads to the alignment problem. The model may be fluent without being appropriately helpful.</p>",
          "wordCount": 54,
          "readMinutes": 1,
          "searchText": "A raw language model trained only on next-token prediction can imitate text well, but imitation alone does not guarantee that it will: follow instructions reliably answer helpfully refuse unsafe requests stay grounded in truth format answers in useful ways This leads to the alignment problem. The model may be fluent without being appropriately helpful."
        },
        {
          "id": "generative-ai-11-instruction-tuning",
          "title": "9.11 Instruction Tuning",
          "figureSrc": "figures/sections/ch09_s11_instruction-tuning.png",
          "figureAlt": "Visual summary for 9.11 Instruction Tuning",
          "html": "<p>Instruction tuning, also called supervised fine-tuning on instruction data, teaches a pretrained language model to respond to tasks phrased as instructions.</p>\n<p>Instead of only continuing generic internet text, the model is trained on pairs such as:</p>\n<ul class=\"md-list\"><li>instruction</li><li>desired response</li></ul>\n<p>This changes the model&#x27;s behavior significantly. It becomes more likely to interpret prompts as requests and to respond in a helpful task-oriented style.</p>\n<p>The FLAN and InstructGPT lines of work helped make this idea especially visible.</p>",
          "wordCount": 75,
          "readMinutes": 1,
          "searchText": "Instruction tuning, also called supervised fine-tuning on instruction data, teaches a pretrained language model to respond to tasks phrased as instructions. Instead of only continuing generic internet text, the model is trained on pairs such as: instruction desired response This changes the model&#x27;s behavior significantly. It becomes more likely to interpret prompts as requests and to respond in a helpful task-oriented style. The FLAN and InstructGPT lines of work helped make this idea especially visible."
        },
        {
          "id": "generative-ai-12-instructgpt-and-the-rlhf-pipeline",
          "title": "9.12 InstructGPT and the RLHF Pipeline",
          "figureSrc": "figures/sections/ch09_s12_instructgpt-and-the-rlhf-pipeline.png",
          "figureAlt": "Visual summary for 9.12 InstructGPT and the RLHF Pipeline",
          "html": "<p>The InstructGPT paper is central because it clarified a widely used alignment pipeline.</p>\n<p>At a high level:</p>\n<ol class=\"md-list\"><li>pretrain a language model with next-token prediction</li><li>perform supervised fine-tuning on instruction-response data</li><li>collect human preference comparisons between candidate outputs</li><li>train a reward model to predict those preferences</li><li>optimize the model with reinforcement learning so outputs score highly under the reward model</li></ol>\n<p>This is reinforcement learning from human feedback, or RLHF.</p>\n<p>RLHF does not mean the model discovers truth directly from reality. It means the model is further optimized to align with judged human preference.</p>",
          "wordCount": 92,
          "readMinutes": 1,
          "searchText": "The InstructGPT paper is central because it clarified a widely used alignment pipeline. At a high level: pretrain a language model with next-token prediction perform supervised fine-tuning on instruction-response data collect human preference comparisons between candidate outputs train a reward model to predict those preferences optimize the model with reinforcement learning so outputs score highly under the reward model This is reinforcement learning from human feedback, or RLHF. RLHF does not mean the model discovers truth directly from reality. It means the model is further optimized to align with judged human preference."
        },
        {
          "id": "generative-ai-13-why-rlhf-helps-and-why-it-does-not-solve-everything",
          "title": "9.13 Why RLHF Helps and Why It Does Not Solve Everything",
          "figureSrc": "figures/sections/ch09_s13_why-rlhf-helps-and-why-it-does-not-solve-everything.png",
          "figureAlt": "Visual summary for 9.13 Why RLHF Helps and Why It Does Not Solve Everything",
          "html": "<p>RLHF often improves:</p>\n<ul class=\"md-list\"><li>helpfulness</li><li>instruction following</li><li>tone</li><li>harmlessness</li><li>refusal behavior</li></ul>\n<p>But it does not guarantee truthfulness.</p>\n<p>A model can learn to produce answers that sound good to human raters while still containing incorrect facts. Fluency and confidence are not the same as correctness.</p>\n<p>This is one of the most important conceptual warnings in generative AI.</p>",
          "wordCount": 55,
          "readMinutes": 1,
          "searchText": "RLHF often improves: helpfulness instruction following tone harmlessness refusal behavior But it does not guarantee truthfulness. A model can learn to produce answers that sound good to human raters while still containing incorrect facts. Fluency and confidence are not the same as correctness. This is one of the most important conceptual warnings in generative AI."
        },
        {
          "id": "generative-ai-14-hallucination-and-grounding",
          "title": "9.14 Hallucination and Grounding",
          "figureSrc": "figures/sections/ch09_s14_hallucination-and-grounding.png",
          "figureAlt": "Visual summary for 9.14 Hallucination and Grounding",
          "html": "<p>A hallucination is an output that is fluent and plausible but unsupported or false.</p>\n<p>Hallucinations happen for deep reasons:</p>\n<ul class=\"md-list\"><li>the model is trained to generate likely text, not to verify reality</li><li>parametric knowledge can be outdated</li><li>the prompt may be ambiguous</li><li>decoding may favor plausible continuations over abstention</li></ul>\n<p>This is why grounding methods matter. If factual correctness is important, we often need:</p>\n<ul class=\"md-list\"><li>retrieval</li><li>tool use</li><li>database access</li><li>citation workflows</li><li>external verification</li></ul>",
          "wordCount": 71,
          "readMinutes": 1,
          "searchText": "A hallucination is an output that is fluent and plausible but unsupported or false. Hallucinations happen for deep reasons: the model is trained to generate likely text, not to verify reality parametric knowledge can be outdated the prompt may be ambiguous decoding may favor plausible continuations over abstention This is why grounding methods matter. If factual correctness is important, we often need: retrieval tool use database access citation workflows external verification"
        },
        {
          "id": "generative-ai-15-retrieval-augmented-generation",
          "title": "9.15 Retrieval-Augmented Generation",
          "figureSrc": "figures/sections/ch09_s15_retrieval-augmented-generation.png",
          "figureAlt": "Visual summary for 9.15 Retrieval-Augmented Generation",
          "html": "<p>Retrieval-Augmented Generation, or RAG, combines a language model with external documents retrieved at inference time.</p>\n<p>The RAG paper by Lewis and colleagues framed this as combining:</p>\n<ul class=\"md-list\"><li>parametric memory inside the model weights</li><li>non-parametric memory in an external document store</li></ul>\n<p>This is valuable because external knowledge can be:</p>\n<ul class=\"md-list\"><li>updated without retraining the whole model</li><li>cited or inspected</li><li>domain-specific</li><li>fresher than the model&#x27;s internal knowledge</li></ul>\n<p>In practice, RAG is often preferable to fine-tuning when the main need is factual grounding or knowledge freshness.</p>",
          "wordCount": 81,
          "readMinutes": 1,
          "searchText": "Retrieval-Augmented Generation, or RAG, combines a language model with external documents retrieved at inference time. The RAG paper by Lewis and colleagues framed this as combining: parametric memory inside the model weights non-parametric memory in an external document store This is valuable because external knowledge can be: updated without retraining the whole model cited or inspected domain-specific fresher than the model&#x27;s internal knowledge In practice, RAG is often preferable to fine-tuning when the main need is factual grounding or knowledge freshness."
        },
        {
          "id": "generative-ai-16-lora-and-parameter-efficient-adaptation",
          "title": "9.16 LoRA and Parameter-Efficient Adaptation",
          "figureSrc": "figures/sections/ch09_s16_lora-and-parameter-efficient-adaptation.png",
          "figureAlt": "Visual summary for 9.16 LoRA and Parameter-Efficient Adaptation",
          "html": "<p>Full fine-tuning of large models is expensive. LoRA, or Low-Rank Adaptation, addresses this by freezing the main model weights and learning small low-rank update matrices.</p>\n<p>Conceptually, LoRA says:</p>\n<p>&quot;Do not rewrite the whole model if a much smaller update can steer it.&quot;</p>\n<p>This dramatically reduces trainable parameters and memory cost. It is useful when adapting a model to:</p>\n<ul class=\"md-list\"><li>a domain</li><li>a task</li><li>a style</li><li>an internal workflow</li></ul>\n<p>The important exam distinction is this:</p>\n<ul class=\"md-list\"><li>LoRA changes model behavior through learned parameter updates</li><li>RAG changes available context by retrieving documents at inference time</li></ul>\n<p>They solve different problems.</p>",
          "wordCount": 95,
          "readMinutes": 1,
          "searchText": "Full fine-tuning of large models is expensive. LoRA, or Low-Rank Adaptation, addresses this by freezing the main model weights and learning small low-rank update matrices. Conceptually, LoRA says: &quot;Do not rewrite the whole model if a much smaller update can steer it.&quot; This dramatically reduces trainable parameters and memory cost. It is useful when adapting a model to: a domain a task a style an internal workflow The important exam distinction is this: LoRA changes model behavior through learned parameter updates RAG changes available context by retrieving documents at inference time They solve different problems."
        },
        {
          "id": "generative-ai-17-rag-versus-lora",
          "title": "9.17 RAG Versus LoRA",
          "figureSrc": "figures/sections/ch09_s17_rag-versus-lora.png",
          "figureAlt": "Visual summary for 9.17 RAG Versus LoRA",
          "html": "<p>Students often confuse RAG and LoRA, so it is worth stating the difference plainly.</p>\n<p>Use RAG when you need:</p>\n<ul class=\"md-list\"><li>current facts</li><li>source-grounded answers</li><li>document-specific reasoning</li><li>easier updates to knowledge</li></ul>\n<p>Use LoRA when you need:</p>\n<ul class=\"md-list\"><li>cheaper adaptation</li><li>task-specific style or behavior changes</li><li>domain-specific tuning</li></ul>\n<p>RAG is mainly about supplying knowledge from outside the model. LoRA is mainly about changing how the model behaves.</p>",
          "wordCount": 62,
          "readMinutes": 1,
          "searchText": "Students often confuse RAG and LoRA, so it is worth stating the difference plainly. Use RAG when you need: current facts source-grounded answers document-specific reasoning easier updates to knowledge Use LoRA when you need: cheaper adaptation task-specific style or behavior changes domain-specific tuning RAG is mainly about supplying knowledge from outside the model. LoRA is mainly about changing how the model behaves."
        },
        {
          "id": "generative-ai-18-evaluation-of-generated-text",
          "title": "9.18 Evaluation of Generated Text",
          "figureSrc": "figures/sections/ch09_s18_evaluation-of-generated-text.png",
          "figureAlt": "Visual summary for 9.18 Evaluation of Generated Text",
          "html": "<p>Evaluating generated text is hard because many different outputs may be acceptable.</p>\n<p>This is why text-generation evaluation uses several families of metrics.</p>\n<h4>9.18.1 BLEU</h4>\n<p>BLEU measures n-gram overlap between a candidate and a reference, with a brevity penalty. It was historically very influential in translation.</p>\n<p>Its limitation is that semantic paraphrases may get poor scores if the wording differs from the reference.</p>\n<h4>9.18.2 BERTScore</h4>\n<p>BERTScore compares contextual token embeddings instead of only exact word matches. This makes it more sensitive to semantic similarity.</p>\n<h4>9.18.3 COMET</h4>\n<p>COMET uses a learned model to predict translation quality and correlates better with human judgments than older lexical-overlap metrics in many settings.</p>\n<h4>9.18.4 Human Evaluation</h4>\n<p>Ultimately, many important properties still require human judgment:</p>\n<ul class=\"md-list\"><li>helpfulness</li><li>factuality</li><li>safety</li><li>usefulness</li><li>style fit</li></ul>\n<p>This is why automatic evaluation is important but not sufficient.</p>",
          "wordCount": 134,
          "readMinutes": 1,
          "searchText": "Evaluating generated text is hard because many different outputs may be acceptable. This is why text-generation evaluation uses several families of metrics. 9.18.1 BLEU BLEU measures n-gram overlap between a candidate and a reference, with a brevity penalty. It was historically very influential in translation. Its limitation is that semantic paraphrases may get poor scores if the wording differs from the reference. 9.18.2 BERTScore BERTScore compares contextual token embeddings instead of only exact word matches. This makes it more sensitive to semantic similarity. 9.18.3 COMET COMET uses a learned model to predict translation quality and correlates better with human judgments than older lexical-overlap metrics in many settings. 9.18.4 Human Evaluation Ultimately, many important properties still require human judgment: helpfulness factuality safety usefulness style fit This is why automatic evaluation is important but not sufficient."
        },
        {
          "id": "generative-ai-19-tool-use-and-agentic-systems",
          "title": "9.19 Tool Use and Agentic Systems",
          "figureSrc": "figures/sections/ch09_s19_tool-use-and-agentic-systems.png",
          "figureAlt": "Visual summary for 9.19 Tool Use and Agentic Systems",
          "html": "<p>Modern generative AI systems are often more than a single model call. A model can be embedded inside a larger system that allows it to:</p>\n<ul class=\"md-list\"><li>search the web</li><li>retrieve documents</li><li>run code</li><li>call APIs</li><li>use structured tools</li><li>cooperate with other agents</li></ul>\n<p>This matters because capability is partly systemic. A model with tool access can solve tasks that would be much harder from internal text continuation alone.</p>\n<p>The course lecture mentions MCP and similar tool-use ideas because they show how generative models become parts of practical workflows rather than isolated next-token engines.</p>",
          "wordCount": 91,
          "readMinutes": 1,
          "searchText": "Modern generative AI systems are often more than a single model call. A model can be embedded inside a larger system that allows it to: search the web retrieve documents run code call APIs use structured tools cooperate with other agents This matters because capability is partly systemic. A model with tool access can solve tasks that would be much harder from internal text continuation alone. The course lecture mentions MCP and similar tool-use ideas because they show how generative models become parts of practical workflows rather than isolated next-token engines."
        },
        {
          "id": "generative-ai-20-efficiency-kv-cache-and-why-it-matters",
          "title": "9.20 Efficiency: KV Cache and Why It Matters",
          "figureSrc": "figures/sections/ch09_s20_efficiency-kv-cache-and-why-it-matters.png",
          "figureAlt": "Visual summary for 9.20 Efficiency: KV Cache and Why It Matters",
          "html": "<p>Autoregressive generation repeatedly extends a context by one token. Without optimization, the model would keep recomputing attention over the already-processed prefix.</p>\n<p>The KV cache stores previously computed key and value tensors so that generation can reuse them instead of recomputing the whole prefix every step.</p>\n<p>This reduces latency and cost substantially.</p>\n<p>The broader lesson is that deployed generative AI is not only about model quality. It is also about:</p>\n<ul class=\"md-list\"><li>latency</li><li>throughput</li><li>memory use</li><li>serving cost</li></ul>\n<p>Engineering concerns strongly shape real-world system design.</p>",
          "wordCount": 82,
          "readMinutes": 1,
          "searchText": "Autoregressive generation repeatedly extends a context by one token. Without optimization, the model would keep recomputing attention over the already-processed prefix. The KV cache stores previously computed key and value tensors so that generation can reuse them instead of recomputing the whole prefix every step. This reduces latency and cost substantially. The broader lesson is that deployed generative AI is not only about model quality. It is also about: latency throughput memory use serving cost Engineering concerns strongly shape real-world system design."
        },
        {
          "id": "generative-ai-21-safety-guardrails-and-bias",
          "title": "9.21 Safety, Guardrails, and Bias",
          "figureSrc": "figures/sections/ch09_s21_safety-guardrails-and-bias.png",
          "figureAlt": "Visual summary for 9.21 Safety, Guardrails, and Bias",
          "html": "<p>Large generative models inherit patterns from training data, including undesirable ones. They can produce:</p>\n<ul class=\"md-list\"><li>harmful stereotypes</li><li>unsafe instructions</li><li>privacy leaks</li><li>overconfident falsehoods</li></ul>\n<p>Guardrails can be placed at multiple levels:</p>\n<ul class=\"md-list\"><li>prompt constraints</li><li>retrieval filtering</li><li>moderation classifiers</li><li>output checks</li><li>human review in high-risk settings</li></ul>\n<p>But guardrails are not perfect. Safety is an ongoing systems problem. It involves data, alignment, product design, monitoring, and policy decisions.</p>",
          "wordCount": 63,
          "readMinutes": 1,
          "searchText": "Large generative models inherit patterns from training data, including undesirable ones. They can produce: harmful stereotypes unsafe instructions privacy leaks overconfident falsehoods Guardrails can be placed at multiple levels: prompt constraints retrieval filtering moderation classifiers output checks human review in high-risk settings But guardrails are not perfect. Safety is an ongoing systems problem. It involves data, alignment, product design, monitoring, and policy decisions."
        },
        {
          "id": "generative-ai-22-multimodal-generative-ai",
          "title": "9.22 Multimodal Generative AI",
          "figureSrc": "figures/sections/ch09_s22_multimodal-generative-ai.png",
          "figureAlt": "Visual summary for 9.22 Multimodal Generative AI",
          "html": "<p>Generative AI is no longer only about text. Models can connect language with images, audio, and video.</p>\n<p>This happens because learned representations can align different modalities in shared or cooperating spaces. A text prompt can therefore guide image generation, and an image can condition caption generation or question answering.</p>\n<p>The conceptual jump is that once models learn strong representations and conditioning mechanisms, &quot;generate from prompt&quot; becomes a general pattern across modalities.</p>",
          "wordCount": 71,
          "readMinutes": 1,
          "searchText": "Generative AI is no longer only about text. Models can connect language with images, audio, and video. This happens because learned representations can align different modalities in shared or cooperating spaces. A text prompt can therefore guide image generation, and an image can condition caption generation or question answering. The conceptual jump is that once models learn strong representations and conditioning mechanisms, &quot;generate from prompt&quot; becomes a general pattern across modalities."
        },
        {
          "id": "generative-ai-23-image-generation-before-diffusion",
          "title": "9.23 Image Generation Before Diffusion",
          "figureSrc": "figures/sections/ch09_s23_image-generation-before-diffusion.png",
          "figureAlt": "Visual summary for 9.23 Image Generation Before Diffusion",
          "html": "<p>Earlier image-generation work often focused on GANs. GANs produced striking results but were often difficult to train and could suffer from instability or mode collapse.</p>\n<p>Diffusion models became dominant because they offered a different and often more stable route to high-quality image synthesis.</p>\n<figure class=\"md-figure\"><img src=\"figures/ch09_diffusion_pipeline.png\" alt=\"Diffusion generation gradually adds noise in the forward process and then learns a reverse process that denoises step by step, often guided by a text prompt.\" loading=\"lazy\" /><figcaption>Diffusion generation gradually adds noise in the forward process and then learns a reverse process that denoises step by step, often guided by a text prompt.</figcaption></figure>",
          "wordCount": 69,
          "readMinutes": 1,
          "searchText": "Earlier image-generation work often focused on GANs. GANs produced striking results but were often difficult to train and could suffer from instability or mode collapse. Diffusion models became dominant because they offered a different and often more stable route to high-quality image synthesis. Diffusion generation gradually adds noise in the forward process and then learns a reverse process that denoises step by step, often guided by a text prompt."
        },
        {
          "id": "generative-ai-24-the-core-idea-of-diffusion-models",
          "title": "9.24 The Core Idea of Diffusion Models",
          "figureSrc": "figures/sections/ch09_s24_the-core-idea-of-diffusion-models.png",
          "figureAlt": "Visual summary for 9.24 The Core Idea of Diffusion Models",
          "html": "<p>Diffusion models define a forward process and a reverse process.</p>\n<p>In the forward process, noise is gradually added to a real image over many steps until the image becomes nearly pure noise.</p>\n<p>In the reverse process, a neural network learns how to undo that corruption step by step.</p>\n<p>This gives a beautiful intuition:</p>\n<ul class=\"md-list\"><li>generation starts from noise</li><li>structure emerges through repeated denoising</li></ul>\n<p>The DDPM paper by Ho, Jain, and Abbeel made this framework especially influential.</p>",
          "wordCount": 75,
          "readMinutes": 1,
          "searchText": "Diffusion models define a forward process and a reverse process. In the forward process, noise is gradually added to a real image over many steps until the image becomes nearly pure noise. In the reverse process, a neural network learns how to undo that corruption step by step. This gives a beautiful intuition: generation starts from noise structure emerges through repeated denoising The DDPM paper by Ho, Jain, and Abbeel made this framework especially influential."
        },
        {
          "id": "generative-ai-25-why-diffusion-works-conceptually",
          "title": "9.25 Why Diffusion Works Conceptually",
          "figureSrc": "figures/sections/ch09_s25_why-diffusion-works-conceptually.png",
          "figureAlt": "Visual summary for 9.25 Why Diffusion Works Conceptually",
          "html": "<p>Instead of trying to jump directly from randomness to a perfect image in one shot, diffusion breaks the problem into many easier denoising steps.</p>\n<p>That staged process is part of why the model can generate detailed and coherent images.</p>\n<p>At each step, the model only needs to answer a more local question:</p>\n<p>&quot;Given a noisy sample, what direction moves it toward a less noisy, more data-like sample?&quot;</p>\n<p>This is one reason diffusion became such a powerful generative framework.</p>",
          "wordCount": 78,
          "readMinutes": 1,
          "searchText": "Instead of trying to jump directly from randomness to a perfect image in one shot, diffusion breaks the problem into many easier denoising steps. That staged process is part of why the model can generate detailed and coherent images. At each step, the model only needs to answer a more local question: &quot;Given a noisy sample, what direction moves it toward a less noisy, more data-like sample?&quot; This is one reason diffusion became such a powerful generative framework."
        },
        {
          "id": "generative-ai-26-conditional-image-generation",
          "title": "9.26 Conditional Image Generation",
          "figureSrc": "figures/sections/ch09_s26_conditional-image-generation.png",
          "figureAlt": "Visual summary for 9.26 Conditional Image Generation",
          "html": "<p>To generate images from text, the diffusion process is conditioned on a text representation. The text prompt tells the model what kind of image should emerge from noise.</p>\n<p>Systems such as DALL-E style pipelines and later text-to-image models rely on language-image alignment mechanisms so that text semantics can influence visual generation.</p>\n<p>The exact architecture varies across systems, but the high-level story is consistent:</p>\n<ul class=\"md-list\"><li>encode the prompt</li><li>use it to guide denoising</li><li>generate an image increasingly aligned with the text</li></ul>",
          "wordCount": 79,
          "readMinutes": 1,
          "searchText": "To generate images from text, the diffusion process is conditioned on a text representation. The text prompt tells the model what kind of image should emerge from noise. Systems such as DALL-E style pipelines and later text-to-image models rely on language-image alignment mechanisms so that text semantics can influence visual generation. The exact architecture varies across systems, but the high-level story is consistent: encode the prompt use it to guide denoising generate an image increasingly aligned with the text"
        },
        {
          "id": "generative-ai-27-clip-like-alignment-intuition",
          "title": "9.27 CLIP-Like Alignment Intuition",
          "figureSrc": "figures/sections/ch09_s27_clip-like-alignment-intuition.png",
          "figureAlt": "Visual summary for 9.27 CLIP-Like Alignment Intuition",
          "html": "<p>Although your exam may not require a deep CLIP derivation, the broad idea is worth knowing. If a model learns compatible image and text representations, then a text prompt can guide the generator toward images whose visual features align with the prompt meaning.</p>\n<p>This is part of what makes text-to-image generation possible as a controllable system rather than an unconditional sampler.</p>",
          "wordCount": 61,
          "readMinutes": 1,
          "searchText": "Although your exam may not require a deep CLIP derivation, the broad idea is worth knowing. If a model learns compatible image and text representations, then a text prompt can guide the generator toward images whose visual features align with the prompt meaning. This is part of what makes text-to-image generation possible as a controllable system rather than an unconditional sampler."
        },
        {
          "id": "generative-ai-28-diffusion-tradeoffs",
          "title": "9.28 Diffusion Tradeoffs",
          "figureSrc": "figures/sections/ch09_s28_diffusion-tradeoffs.png",
          "figureAlt": "Visual summary for 9.28 Diffusion Tradeoffs",
          "html": "<p>Diffusion models produce excellent images, but they are not free.</p>\n<p>Their limitations include:</p>\n<ul class=\"md-list\"><li>slow iterative sampling compared with one-shot generation</li><li>heavy compute cost</li><li>sensitivity to prompt phrasing and conditioning</li><li>possible artifact generation</li><li>inherited bias from training data</li></ul>\n<p>This is why later work often tries to speed up sampling or improve controllability.</p>",
          "wordCount": 51,
          "readMinutes": 1,
          "searchText": "Diffusion models produce excellent images, but they are not free. Their limitations include: slow iterative sampling compared with one-shot generation heavy compute cost sensitivity to prompt phrasing and conditioning possible artifact generation inherited bias from training data This is why later work often tries to speed up sampling or improve controllability."
        },
        {
          "id": "generative-ai-29-what-generative-ai-is-good-at",
          "title": "9.29 What Generative AI Is Good At",
          "figureSrc": "figures/sections/ch09_s29_what-generative-ai-is-good-at.png",
          "figureAlt": "Visual summary for 9.29 What Generative AI Is Good At",
          "html": "<p>A practical understanding of generative AI includes knowing when it is a good fit.</p>\n<p>It is especially useful for:</p>\n<ul class=\"md-list\"><li>drafting</li><li>brainstorming</li><li>summarization</li><li>translation</li><li>code assistance</li><li>synthetic creative generation</li><li>multimodal content creation</li></ul>\n<p>It is less trustworthy when:</p>\n<ul class=\"md-list\"><li>factual precision must be guaranteed</li><li>the cost of error is high</li><li>citations or provenance are essential and unavailable</li><li>compliance and safety requirements are strict</li></ul>\n<p>This is not a weakness of one particular model. It is a consequence of the statistical nature of generation.</p>",
          "wordCount": 79,
          "readMinutes": 1,
          "searchText": "A practical understanding of generative AI includes knowing when it is a good fit. It is especially useful for: drafting brainstorming summarization translation code assistance synthetic creative generation multimodal content creation It is less trustworthy when: factual precision must be guaranteed the cost of error is high citations or provenance are essential and unavailable compliance and safety requirements are strict This is not a weakness of one particular model. It is a consequence of the statistical nature of generation."
        },
        {
          "id": "generative-ai-30-common-exam-questions",
          "title": "9.30 Common Exam Questions",
          "figureSrc": "figures/sections/ch09_s30_common-exam-questions.png",
          "figureAlt": "Visual summary for 9.30 Common Exam Questions",
          "html": "<p>Typical questions include:</p>\n<ul class=\"md-list\"><li>explain next-token prediction</li><li>compare training and inference in language models</li><li>explain tokenization and why subwords matter</li><li>compare greedy decoding, beam search, top-k, and top-p</li><li>explain in-context learning</li><li>explain instruction tuning and RLHF</li><li>distinguish LoRA from RAG</li><li>explain why automatic evaluation is difficult</li><li>describe diffusion at a high level</li></ul>\n<p>The strongest answers explain why each method exists, not just what it is called.</p>",
          "wordCount": 65,
          "readMinutes": 1,
          "searchText": "Typical questions include: explain next-token prediction compare training and inference in language models explain tokenization and why subwords matter compare greedy decoding, beam search, top-k, and top-p explain in-context learning explain instruction tuning and RLHF distinguish LoRA from RAG explain why automatic evaluation is difficult describe diffusion at a high level The strongest answers explain why each method exists, not just what it is called."
        },
        {
          "id": "generative-ai-31-common-misunderstandings",
          "title": "9.31 Common Misunderstandings",
          "figureSrc": "figures/sections/ch09_s31_common-misunderstandings.png",
          "figureAlt": "Visual summary for 9.31 Common Misunderstandings",
          "html": "<p>Students often make the following mistakes.</p>\n<ul class=\"md-list\"><li>assuming a fluent answer is probably true</li><li>treating prompting as a full substitute for knowledge grounding</li><li>confusing instruction tuning with RLHF</li><li>claiming RLHF guarantees factual correctness</li><li>confusing LoRA and RAG</li><li>assuming diffusion directly paints the final image in one step</li></ul>\n<p>These are exactly the kinds of mistakes an exam may try to expose.</p>",
          "wordCount": 59,
          "readMinutes": 1,
          "searchText": "Students often make the following mistakes. assuming a fluent answer is probably true treating prompting as a full substitute for knowledge grounding confusing instruction tuning with RLHF claiming RLHF guarantees factual correctness confusing LoRA and RAG assuming diffusion directly paints the final image in one step These are exactly the kinds of mistakes an exam may try to expose."
        },
        {
          "id": "generative-ai-32-big-picture-summary",
          "title": "9.32 Big Picture Summary",
          "figureSrc": "figures/sections/ch09_s32_big-picture-summary.png",
          "figureAlt": "Visual summary for 9.32 Big Picture Summary",
          "html": "<p>Generative AI is the study of models that create new outputs by learning data distributions. In text generation, autoregressive language models predict the next token conditioned on previous context. Tokenization, embeddings, and decoding determine how generation operates in practice. Larger models exhibit in-context learning, while instruction tuning and RLHF steer them toward more useful behavior. Because fluent generation is not the same as truth, retrieval, tool use, grounding, and evaluation remain essential. In image generation, diffusion models create high-quality outputs by learning to reverse a gradual noising process.</p>\n<p>If you remember one sentence from this chapter, remember this: generative AI is not just about making content, but about controlling how statistical models turn learned distributions into useful, grounded, and safe outputs.</p>",
          "wordCount": 121,
          "readMinutes": 1,
          "searchText": "Generative AI is the study of models that create new outputs by learning data distributions. In text generation, autoregressive language models predict the next token conditioned on previous context. Tokenization, embeddings, and decoding determine how generation operates in practice. Larger models exhibit in-context learning, while instruction tuning and RLHF steer them toward more useful behavior. Because fluent generation is not the same as truth, retrieval, tool use, grounding, and evaluation remain essential. In image generation, diffusion models create high-quality outputs by learning to reverse a gradual noising process. If you remember one sentence from this chapter, remember this: generative AI is not just about making content, but about controlling how statistical models turn learned distributions into useful, grounded, and safe outputs."
        },
        {
          "id": "generative-ai-33-primary-references-used-to-expand-this-chapter",
          "title": "9.33 Primary References Used to Expand This Chapter",
          "figureSrc": "figures/sections/ch09_s33_primary-references-used-to-expand-this-chapter.png",
          "figureAlt": "Visual summary for 9.33 Primary References Used to Expand This Chapter",
          "html": "<ul class=\"md-list\"><li>Brown, T. et al. &quot;Language Models are Few-Shot Learners&quot; (2020): <a href=\"https://arxiv.org/abs/2005.14165\" target=\"_blank\" rel=\"noreferrer\">https://arxiv.org/abs/2005.14165</a></li><li>Ouyang, L. et al. &quot;Training language models to follow instructions with human feedback&quot; (InstructGPT, 2022): <a href=\"https://arxiv.org/pdf/2203.02155\" target=\"_blank\" rel=\"noreferrer\">https://arxiv.org/pdf/2203.02155</a></li><li>Sennrich, R., Haddow, B., and Birch, A. &quot;Neural Machine Translation of Rare Words with Subword Units&quot; (ACL 2016): <a href=\"https://aclanthology.org/P16-1162/\" target=\"_blank\" rel=\"noreferrer\">https://aclanthology.org/P16-1162/</a></li><li>Kudo, T. and Richardson, J. &quot;SentencePiece: A simple and language independent subword tokenizer and detokenizer for Neural Text Processing&quot; (EMNLP 2018 demo): <a href=\"https://aclanthology.org/D18-2012/\" target=\"_blank\" rel=\"noreferrer\">https://aclanthology.org/D18-2012/</a></li><li>Lewis, P. et al. &quot;Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks&quot; (NeurIPS 2020): <a href=\"https://papers.neurips.cc/paper_files/paper/2020/file/6b493230205f780e1bc26945df7481e5-Paper.pdf\" target=\"_blank\" rel=\"noreferrer\">https://papers.neurips.cc/paper_files/paper/2020/file/6b493230205f780e1bc26945df7481e5-Paper.pdf</a></li><li>Hu, E. et al. &quot;LoRA: Low-Rank Adaptation of Large Language Models&quot; (2021): <a href=\"https://arxiv.org/abs/2106.09685\" target=\"_blank\" rel=\"noreferrer\">https://arxiv.org/abs/2106.09685</a></li><li>Zhang, T. et al. &quot;BERTScore: Evaluating Text Generation with BERT&quot; (ICLR 2020): <a href=\"https://openreview.net/forum?id=SkeHuCVFDr\" target=\"_blank\" rel=\"noreferrer\">https://openreview.net/forum?id=SkeHuCVFDr</a></li><li>Rei, R. et al. &quot;COMET: A Neural Framework for MT Evaluation&quot; (EMNLP 2020): <a href=\"https://aclanthology.org/2020.emnlp-main.213/\" target=\"_blank\" rel=\"noreferrer\">https://aclanthology.org/2020.emnlp-main.213/</a></li><li>Ho, J., Jain, A., and Abbeel, P. &quot;Denoising Diffusion Probabilistic Models&quot; (NeurIPS 2020): <a href=\"https://papers.nips.cc/paper/2020/file/4c5bcfec8584af0d967f1ab10179ca4b-Paper.pdf\" target=\"_blank\" rel=\"noreferrer\">https://papers.nips.cc/paper/2020/file/4c5bcfec8584af0d967f1ab10179ca4b-Paper.pdf</a></li></ul>",
          "wordCount": 136,
          "readMinutes": 1,
          "searchText": "Brown, T. et al. &quot;Language Models are Few-Shot Learners&quot; (2020): https://arxiv.org/abs/2005.14165 Ouyang, L. et al. &quot;Training language models to follow instructions with human feedback&quot; (InstructGPT, 2022): https://arxiv.org/pdf/2203.02155 Sennrich, R., Haddow, B., and Birch, A. &quot;Neural Machine Translation of Rare Words with Subword Units&quot; (ACL 2016): https://aclanthology.org/P16-1162/ Kudo, T. and Richardson, J. &quot;SentencePiece: A simple and language independent subword tokenizer and detokenizer for Neural Text Processing&quot; (EMNLP 2018 demo): https://aclanthology.org/D18-2012/ Lewis, P. et al. &quot;Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks&quot; (NeurIPS 2020): https://papers.neurips.cc/paper_files/paper/2020/file/6b493230205f780e1bc26945df7481e5-Paper.pdf Hu, E. et al. &quot;LoRA: Low-Rank Adaptation of Large Language Models&quot; (2021): https://arxiv.org/abs/2106.09685 Zhang, T. et al. &quot;BERTScore: Evaluating Text Generation with BERT&quot; (ICLR 2020): https://openreview.net/forum?id=SkeHuCVFDr Rei, R. et al. &quot;COMET: A Neural Framework for MT Evaluation&quot; (EMNLP 2020): https://aclanthology.org/2020.emnlp-main.213/ Ho, J., Jain, A., and Abbeel, P. &quot;Denoising Diffusion Probabilistic Models&quot; (NeurIPS 2020): https://papers.nips.cc/paper/2020/file/4c5bcfec8584af0d967f1ab10179ca4b-Paper.pdf"
        }
      ],
      "wordCount": 3660,
      "sectionCount": 33,
      "readMinutes": 20,
      "searchText": "Generative AI is the part of machine learning concerned with creating new content rather than only predicting existing labels. Modern systems can generate text, code, images, audio, and other structured outputs. Because these models now power chatbots, coding systems, translation tools, image generation, and document assistants, generative AI has become one of the most visible parts of the field. But the public visibility can make the topic feel more magical than it really is. Under the surface, generative AI is built from ideas we have already studied: probability modeling sequence modeling representation learning optimization attention This chapter takes a slow and detailed approach. We begin with the basic meaning of generative modeling, then study autoregressive language models, tokenization, decoding, prompting, instruction tuning, RLHF, evaluation, retrieval, parameter-efficient adaptation, efficiency, safety, and diffusion-based image generation. The aim is to build a strong conceptual foundation rather than a pile of fashionable terms. Modern generative AI is a stack: tokenized data supports pretraining, instruction tuning and RLHF shape behavior, and deployed systems often add retrieval, tools, LoRA adapters, caching, and guardrails. A predictive model usually maps input to a label or number: classify an email as spam or not spam predict house price identify an image category A generative model tries to model a data distribution well enough to produce new samples from it. Depending on the setting, it may model: \\(P(X)\\) for unconditional generation \\(P(X \\mid Y)\\) for conditional generation sometimes joint structure involving both inputs and outputs If the model learns the distribution of natural-language sequences, it can generate text. If it learns the distribution of images, it can generate images. If it learns a conditional mapping from prompt to image, it can generate images guided by language. The deepest difference is this: predictive modeling selects among known outcomes, while generative modeling creates new outputs that should still look plausible under the learned distribution. Language is a natural fit for generative modeling because it is already a sequence. A sentence can be generated token by token. This leads to the autoregressive factorization: \\[P(x_1, x_2, \\ldots, x_T) = \\prod_t P(x_t \\mid x_{&lt;t})\\] In words, the probability of a full sequence is decomposed into next-token prediction conditioned on the previous context. This is one of the most important ideas in generative AI. It means that a model can learn to generate a long output by repeatedly solving a simpler local problem: given the context so far, what token should come next? During training, the model sees real text sequences and is asked to predict the next token at each position. The usual loss is cross-entropy over the vocabulary. This training setup uses teacher forcing: the model is given the true previous tokens it predicts the next true token This is efficient because one training example can contribute prediction loss at many positions at once. The result is a model that has learned a probability distribution over next tokens in context. During inference, the model no longer has access to the future true token. It must generate one token, append it to the context, and continue. This difference matters because errors can compound. A mediocre token choice early in the sequence may pull the rest of the generation in a weaker direction. That is why generation quality depends on two things: the trained model the decoding strategy used at inference time Students often understand the training objective but forget that generation is also a search and control problem. Modern language models do not usually operate on full words directly. Instead they operate on tokens, which may be: whole words subword pieces punctuation marks special symbols Tokenization matters more than beginners expect. It affects: vocabulary size sequence length treatment of rare words multilingual handling efficiency 9.5.1 Why Subword Tokenization Became Standard A pure word-level vocabulary becomes huge and still fails on rare or unseen words. A pure character-level model avoids out-of-vocabulary words but makes sequences much longer and learning harder. Subword tokenization is a compromise. Frequent words may remain whole, while rare words can be broken into meaningful pieces. 9.5.2 BPE and Related Methods The subword-BPE approach popularized by Sennrich, Haddow, and Birch showed how rare-word problems in neural machine translation could be reduced by learning frequent subword merges. WordPiece and similar methods use related ideas. SentencePiece is especially important conceptually because it treats tokenization itself as a learnable text segmentation process and does not rely on whitespace word boundaries. That is useful for languages such as Thai, where whitespace does not segment words in the same way as English. Once text is tokenized, each token is mapped to a vector embedding. In a Transformer-based language model, these embeddings are then contextualized by attention layers. That means the representation of a token is shaped by surrounding tokens. This is why the same token can have different effective meanings in different contexts. The model is not just looking up a static dictionary entry. It is building context-aware representations before predicting the next token. At each generation step, the model produces a probability distribution over the next token. But probabilities alone are not yet output. A decision rule is needed. This is decoding. 9.7.1 Greedy Decoding Greedy decoding selects the highest-probability token at every step. It is fast and simple, but it can become repetitive or get trapped in dull local choices. The locally best next token is not always part of the globally best sequence. 9.7.2 Beam Search Beam search keeps several promising partial sequences instead of only one. It is common in tasks like translation, where fidelity may matter more than creative diversity. However, beam search can still over-favor bland or overly high-probability continuations, and it is not always preferred for open-ended chat generation. 9.7.3 Sampling Sampling draws the next token from the probability distribution. This introduces diversity. But unrestricted sampling can become unstable because low-probability tokens may derail the sequence. 9.7.4 Top-k and Top-p Top-k sampling restricts the choice to the \\(k\\) highest-probability tokens. Top-p, or nucleus sampling, restricts the choice to the smallest token set whose cumulative probability exceeds a threshold \\(p\\). These methods try to balance coherence and diversity. 9.7.5 Temperature Temperature rescales logits before softmax. Lower temperature makes the distribution sharper and more conservative. Higher temperature makes it flatter and more random. Temperature does not change the model&#x27;s knowledge. It changes how boldly or cautiously the model samples from that knowledge. One of the striking discoveries of large language models is that scale changes behavior. The GPT-3 paper showed that sufficiently large autoregressive models can perform many tasks in zero-shot, one-shot, or few-shot settings by conditioning on examples in the prompt. This is called in-context learning. The important conceptual point is that the model is not updating its weights during the prompt. It is adapting behavior from context alone. This is one reason large language models feel unusually flexible. A single pretrained model can perform many tasks if prompted appropriately. Prompting is the practice of shaping the model&#x27;s input so the output better matches the user&#x27;s goal. A strong prompt often includes: the task needed context desired style or role output format examples if useful constraints Prompting matters because a language model is a conditional generator. Small changes in conditioning can strongly affect output behavior. But prompting also has limits. It cannot reliably substitute for missing knowledge, external retrieval, or alignment. It is a control interface, not a miracle repair tool. A raw language model trained only on next-token prediction can imitate text well, but imitation alone does not guarantee that it will: follow instructions reliably answer helpfully refuse unsafe requests stay grounded in truth format answers in useful ways This leads to the alignment problem. The model may be fluent without being appropriately helpful. Instruction tuning, also called supervised fine-tuning on instruction data, teaches a pretrained language model to respond to tasks phrased as instructions. Instead of only continuing generic internet text, the model is trained on pairs such as: instruction desired response This changes the model&#x27;s behavior significantly. It becomes more likely to interpret prompts as requests and to respond in a helpful task-oriented style. The FLAN and InstructGPT lines of work helped make this idea especially visible. The InstructGPT paper is central because it clarified a widely used alignment pipeline. At a high level: pretrain a language model with next-token prediction perform supervised fine-tuning on instruction-response data collect human preference comparisons between candidate outputs train a reward model to predict those preferences optimize the model with reinforcement learning so outputs score highly under the reward model This is reinforcement learning from human feedback, or RLHF. RLHF does not mean the model discovers truth directly from reality. It means the model is further optimized to align with judged human preference. RLHF often improves: helpfulness instruction following tone harmlessness refusal behavior But it does not guarantee truthfulness. A model can learn to produce answers that sound good to human raters while still containing incorrect facts. Fluency and confidence are not the same as correctness. This is one of the most important conceptual warnings in generative AI. A hallucination is an output that is fluent and plausible but unsupported or false. Hallucinations happen for deep reasons: the model is trained to generate likely text, not to verify reality parametric knowledge can be outdated the prompt may be ambiguous decoding may favor plausible continuations over abstention This is why grounding methods matter. If factual correctness is important, we often need: retrieval tool use database access citation workflows external verification Retrieval-Augmented Generation, or RAG, combines a language model with external documents retrieved at inference time. The RAG paper by Lewis and colleagues framed this as combining: parametric memory inside the model weights non-parametric memory in an external document store This is valuable because external knowledge can be: updated without retraining the whole model cited or inspected domain-specific fresher than the model&#x27;s internal knowledge In practice, RAG is often preferable to fine-tuning when the main need is factual grounding or knowledge freshness. Full fine-tuning of large models is expensive. LoRA, or Low-Rank Adaptation, addresses this by freezing the main model weights and learning small low-rank update matrices. Conceptually, LoRA says: &quot;Do not rewrite the whole model if a much smaller update can steer it.&quot; This dramatically reduces trainable parameters and memory cost. It is useful when adapting a model to: a domain a task a style an internal workflow The important exam distinction is this: LoRA changes model behavior through learned parameter updates RAG changes available context by retrieving documents at inference time They solve different problems. Students often confuse RAG and LoRA, so it is worth stating the difference plainly. Use RAG when you need: current facts source-grounded answers document-specific reasoning easier updates to knowledge Use LoRA when you need: cheaper adaptation task-specific style or behavior changes domain-specific tuning RAG is mainly about supplying knowledge from outside the model. LoRA is mainly about changing how the model behaves. Evaluating generated text is hard because many different outputs may be acceptable. This is why text-generation evaluation uses several families of metrics. 9.18.1 BLEU BLEU measures n-gram overlap between a candidate and a reference, with a brevity penalty. It was historically very influential in translation. Its limitation is that semantic paraphrases may get poor scores if the wording differs from the reference. 9.18.2 BERTScore BERTScore compares contextual token embeddings instead of only exact word matches. This makes it more sensitive to semantic similarity. 9.18.3 COMET COMET uses a learned model to predict translation quality and correlates better with human judgments than older lexical-overlap metrics in many settings. 9.18.4 Human Evaluation Ultimately, many important properties still require human judgment: helpfulness factuality safety usefulness style fit This is why automatic evaluation is important but not sufficient. Modern generative AI systems are often more than a single model call. A model can be embedded inside a larger system that allows it to: search the web retrieve documents run code call APIs use structured tools cooperate with other agents This matters because capability is partly systemic. A model with tool access can solve tasks that would be much harder from internal text continuation alone. The course lecture mentions MCP and similar tool-use ideas because they show how generative models become parts of practical workflows rather than isolated next-token engines. Autoregressive generation repeatedly extends a context by one token. Without optimization, the model would keep recomputing attention over the already-processed prefix. The KV cache stores previously computed key and value tensors so that generation can reuse them instead of recomputing the whole prefix every step. This reduces latency and cost substantially. The broader lesson is that deployed generative AI is not only about model quality. It is also about: latency throughput memory use serving cost Engineering concerns strongly shape real-world system design. Large generative models inherit patterns from training data, including undesirable ones. They can produce: harmful stereotypes unsafe instructions privacy leaks overconfident falsehoods Guardrails can be placed at multiple levels: prompt constraints retrieval filtering moderation classifiers output checks human review in high-risk settings But guardrails are not perfect. Safety is an ongoing systems problem. It involves data, alignment, product design, monitoring, and policy decisions. Generative AI is no longer only about text. Models can connect language with images, audio, and video. This happens because learned representations can align different modalities in shared or cooperating spaces. A text prompt can therefore guide image generation, and an image can condition caption generation or question answering. The conceptual jump is that once models learn strong representations and conditioning mechanisms, &quot;generate from prompt&quot; becomes a general pattern across modalities. Earlier image-generation work often focused on GANs. GANs produced striking results but were often difficult to train and could suffer from instability or mode collapse. Diffusion models became dominant because they offered a different and often more stable route to high-quality image synthesis. Diffusion generation gradually adds noise in the forward process and then learns a reverse process that denoises step by step, often guided by a text prompt. Diffusion models define a forward process and a reverse process. In the forward process, noise is gradually added to a real image over many steps until the image becomes nearly pure noise. In the reverse process, a neural network learns how to undo that corruption step by step. This gives a beautiful intuition: generation starts from noise structure emerges through repeated denoising The DDPM paper by Ho, Jain, and Abbeel made this framework especially influential. Instead of trying to jump directly from randomness to a perfect image in one shot, diffusion breaks the problem into many easier denoising steps. That staged process is part of why the model can generate detailed and coherent images. At each step, the model only needs to answer a more local question: &quot;Given a noisy sample, what direction moves it toward a less noisy, more data-like sample?&quot; This is one reason diffusion became such a powerful generative framework. To generate images from text, the diffusion process is conditioned on a text representation. The text prompt tells the model what kind of image should emerge from noise. Systems such as DALL-E style pipelines and later text-to-image models rely on language-image alignment mechanisms so that text semantics can influence visual generation. The exact architecture varies across systems, but the high-level story is consistent: encode the prompt use it to guide denoising generate an image increasingly aligned with the text Although your exam may not require a deep CLIP derivation, the broad idea is worth knowing. If a model learns compatible image and text representations, then a text prompt can guide the generator toward images whose visual features align with the prompt meaning. This is part of what makes text-to-image generation possible as a controllable system rather than an unconditional sampler. Diffusion models produce excellent images, but they are not free. Their limitations include: slow iterative sampling compared with one-shot generation heavy compute cost sensitivity to prompt phrasing and conditioning possible artifact generation inherited bias from training data This is why later work often tries to speed up sampling or improve controllability. A practical understanding of generative AI includes knowing when it is a good fit. It is especially useful for: drafting brainstorming summarization translation code assistance synthetic creative generation multimodal content creation It is less trustworthy when: factual precision must be guaranteed the cost of error is high citations or provenance are essential and unavailable compliance and safety requirements are strict This is not a weakness of one particular model. It is a consequence of the statistical nature of generation. Typical questions include: explain next-token prediction compare training and inference in language models explain tokenization and why subwords matter compare greedy decoding, beam search, top-k, and top-p explain in-context learning explain instruction tuning and RLHF distinguish LoRA from RAG explain why automatic evaluation is difficult describe diffusion at a high level The strongest answers explain why each method exists, not just what it is called. Students often make the following mistakes. assuming a fluent answer is probably true treating prompting as a full substitute for knowledge grounding confusing instruction tuning with RLHF claiming RLHF guarantees factual correctness confusing LoRA and RAG assuming diffusion directly paints the final image in one step These are exactly the kinds of mistakes an exam may try to expose. Generative AI is the study of models that create new outputs by learning data distributions. In text generation, autoregressive language models predict the next token conditioned on previous context. Tokenization, embeddings, and decoding determine how generation operates in practice. Larger models exhibit in-context learning, while instruction tuning and RLHF steer them toward more useful behavior. Because fluent generation is not the same as truth, retrieval, tool use, grounding, and evaluation remain essential. In image generation, diffusion models create high-quality outputs by learning to reverse a gradual noising process. If you remember one sentence from this chapter, remember this: generative AI is not just about making content, but about controlling how statistical models turn learned distributions into useful, grounded, and safe outputs. Brown, T. et al. &quot;Language Models are Few-Shot Learners&quot; (2020): https://arxiv.org/abs/2005.14165 Ouyang, L. et al. &quot;Training language models to follow instructions with human feedback&quot; (InstructGPT, 2022): https://arxiv.org/pdf/2203.02155 Sennrich, R., Haddow, B., and Birch, A. &quot;Neural Machine Translation of Rare Words with Subword Units&quot; (ACL 2016): https://aclanthology.org/P16-1162/ Kudo, T. and Richardson, J. &quot;SentencePiece: A simple and language independent subword tokenizer and detokenizer for Neural Text Processing&quot; (EMNLP 2018 demo): https://aclanthology.org/D18-2012/ Lewis, P. et al. &quot;Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks&quot; (NeurIPS 2020): https://papers.neurips.cc/paper_files/paper/2020/file/6b493230205f780e1bc26945df7481e5-Paper.pdf Hu, E. et al. &quot;LoRA: Low-Rank Adaptation of Large Language Models&quot; (2021): https://arxiv.org/abs/2106.09685 Zhang, T. et al. &quot;BERTScore: Evaluating Text Generation with BERT&quot; (ICLR 2020): https://openreview.net/forum?id=SkeHuCVFDr Rei, R. et al. &quot;COMET: A Neural Framework for MT Evaluation&quot; (EMNLP 2020): https://aclanthology.org/2020.emnlp-main.213/ Ho, J., Jain, A., and Abbeel, P. &quot;Denoising Diffusion Probabilistic Models&quot; (NeurIPS 2020): https://papers.nips.cc/paper/2020/file/4c5bcfec8584af0d967f1ab10179ca4b-Paper.pdf Generative AI is about learning a distribution well enough to create new samples from it. In language models, that usually means predicting one token at a time so well that long coherent outputs can emerge. Think of a large language model as a powerful next-step predictor wrapped inside a broader system. The model predicts likely continuations; prompting, retrieval, alignment, and tools shape which continuations become useful answers. This topic blends ideas from probability, sequence modeling, optimization, and systems design. It is less one algorithm than a stack of methods working together. I can explain next-token prediction and why inference differs from training. I can compare prompting, instruction tuning, and RLHF without mixing them up. I can explain why RAG and LoRA solve different problems. I can describe diffusion at a high level without pretending it is one-step image drawing. Autoregressive factorization A full sequence probability is decomposed into next-token predictions conditioned on previous context. This is why a language model can generate long outputs from one repeated local skill: predicting what should come next. Softmax with temperature intuition Temperature rescales logits before softmax, changing how sharp or flat the sampling distribution becomes. Lower temperature makes the model more conservative. Higher temperature makes it more diverse but also more prone to drift. Diffusion story The forward process gradually corrupts clean data with noise, and the learned reverse process removes it step by step. Diffusion works by solving many small denoising tasks instead of one giant jump from randomness to a finished image. Why fluent text is not the same as true text A model can produce a very confident answer that sounds polished and still be wrong. The model is trained to continue text plausibly, not to directly verify reality. Alignment can make it more helpful or safer, but factual grounding often still needs retrieval, tools, or external checking. Why RAG beats fine-tuning for fresh facts A company policy changes every month and the model keeps getting asked about the latest version. Updating model weights every time is expensive and brittle. RAG lets the system retrieve the newest document at inference time, which is usually the better design when freshness and traceability matter more than stylistic adaptation. Why does decoding matter if the model already outputs probabilities? Because probabilities are not yet final text. The decoding rule decides how those probabilities are turned into an actual token sequence, which strongly affects diversity and coherence. Why is instruction tuning different from pretraining? Pretraining teaches broad next-token modeling from general corpora, while instruction tuning specifically teaches the model to respond helpfully to task-like prompts. Why does RLHF improve user experience without guaranteeing truth? Because it optimizes toward outputs preferred by human raters, which often improves tone and helpfulness but is not the same as direct factual verification. Why is KV cache a system optimization rather than a new learning objective? Because it speeds up autoregressive inference by reusing prior attention computations rather than changing how the model was trained. Why are diffusion models often slower than autoregressive text generation feels conceptually? Because image generation typically requires many iterative denoising steps, whereas text generation emits one token at a time from a directly trained autoregressive model."
    }
  ],
  "workbook": {
    "topicSets": [
      {
        "title": "Workbook Part 1: Unsupervised Learning",
        "topic": "unsupervised-learning",
        "items": [
          {
            "id": "unsupervised-learning-quiz-01",
            "prompt": "What is the difference between supervised and unsupervised learning?",
            "answer": "Unsupervised learning has no labels and tries to discover hidden structure.",
            "difficulty": "core"
          },
          {
            "id": "unsupervised-learning-quiz-02",
            "prompt": "Why does normalization matter so much for K-means?",
            "answer": "Because distance gets dominated by large-scale features if data is not normalized.",
            "difficulty": "core"
          },
          {
            "id": "unsupervised-learning-quiz-03",
            "prompt": "Explain K-means step by step.",
            "answer": "Initialize centroids, assign points to nearest centroid, recompute means, repeat.",
            "difficulty": "core"
          },
          {
            "id": "unsupervised-learning-quiz-04",
            "prompt": "Why does inertia always decrease when `k` increases?",
            "answer": "More clusters always reduce within-cluster spread.",
            "difficulty": "core"
          },
          {
            "id": "unsupervised-learning-quiz-05",
            "prompt": "Why is the elbow method only a heuristic?",
            "answer": "Because the elbow may be weak or ambiguous and does not define a mathematically unique best `k`.",
            "difficulty": "core"
          },
          {
            "id": "unsupervised-learning-quiz-06",
            "prompt": "What does a dendrogram show?",
            "answer": "The sequence and height of hierarchical merges.",
            "difficulty": "stretch"
          },
          {
            "id": "unsupervised-learning-quiz-07",
            "prompt": "Compare Ward linkage and single linkage.",
            "answer": "Ward prefers compact low-variance merges; single linkage uses minimum pair distance and can chain clusters.",
            "difficulty": "stretch"
          },
          {
            "id": "unsupervised-learning-quiz-08",
            "prompt": "What is PCA geometrically?",
            "answer": "PCA rotates the data to directions of maximum variance.",
            "difficulty": "stretch"
          },
          {
            "id": "unsupervised-learning-quiz-09",
            "prompt": "Why is PCA not a clustering algorithm?",
            "answer": "It projects data to new axes but does not assign cluster labels.",
            "difficulty": "stretch"
          },
          {
            "id": "unsupervised-learning-quiz-10",
            "prompt": "Why should t-SNE plots be interpreted carefully?",
            "answer": "Because local neighborhoods may be preserved while global distances and cluster spacing can mislead.",
            "difficulty": "stretch"
          }
        ]
      },
      {
        "title": "Workbook Part 2: Neural Networks",
        "topic": "neural-networks-foundations",
        "items": [
          {
            "id": "neural-networks-foundations-quiz-01",
            "prompt": "Why is nonlinearity necessary in neural networks?",
            "answer": "Without nonlinearity, stacked linear layers still behave like one linear layer.",
            "difficulty": "core"
          },
          {
            "id": "neural-networks-foundations-quiz-02",
            "prompt": "When do you use cross-entropy? When do you use MSE?",
            "answer": "Cross-entropy for classification, MSE for regression.",
            "difficulty": "core"
          },
          {
            "id": "neural-networks-foundations-quiz-03",
            "prompt": "Why is a linear output appropriate for rainfall prediction?",
            "answer": "Because rainfall is a real-valued target and should not be artificially bounded.",
            "difficulty": "core"
          },
          {
            "id": "neural-networks-foundations-quiz-04",
            "prompt": "What is backpropagation?",
            "answer": "Efficient chain-rule computation of gradients through the network.",
            "difficulty": "core"
          },
          {
            "id": "neural-networks-foundations-quiz-05",
            "prompt": "What does the learning rate control?",
            "answer": "The step size of optimization updates.",
            "difficulty": "core"
          },
          {
            "id": "neural-networks-foundations-quiz-06",
            "prompt": "How do you tell overfitting from underfitting?",
            "answer": "Underfitting means both train and validation are poor; overfitting means train is good but validation degrades.",
            "difficulty": "stretch"
          },
          {
            "id": "neural-networks-foundations-quiz-07",
            "prompt": "What does dropout do?",
            "answer": "Randomly disables units during training to reduce co-adaptation and improve generalization.",
            "difficulty": "stretch"
          },
          {
            "id": "neural-networks-foundations-quiz-08",
            "prompt": "Why are CNNs better than MLPs for images?",
            "answer": "CNNs exploit spatial locality and parameter sharing.",
            "difficulty": "stretch"
          },
          {
            "id": "neural-networks-foundations-quiz-09",
            "prompt": "Compute parameters for a dense layer from 75 inputs to 200 outputs.",
            "answer": "`75 * 200 + 200 = 15200`",
            "difficulty": "stretch"
          },
          {
            "id": "neural-networks-foundations-quiz-10",
            "prompt": "Why does transfer learning help on small datasets?",
            "answer": "Because pretrained features give a better starting point and usually converge faster with better accuracy.",
            "difficulty": "stretch"
          }
        ]
      },
      {
        "title": "Workbook Part 3: Recommender Systems",
        "topic": "recommendation-systems",
        "items": [
          {
            "id": "recommendation-systems-quiz-01",
            "prompt": "What is the difference between content-based and collaborative filtering?",
            "answer": "Content-based uses item features; collaborative filtering uses behavior patterns across users and items.",
            "difficulty": "core"
          },
          {
            "id": "recommendation-systems-quiz-02",
            "prompt": "What is the cold start problem?",
            "answer": "Difficulty recommending for new users or new items with little history.",
            "difficulty": "core"
          },
          {
            "id": "recommendation-systems-quiz-03",
            "prompt": "What is matrix factorization trying to learn?",
            "answer": "Low-dimensional latent vectors for users and items.",
            "difficulty": "core"
          },
          {
            "id": "recommendation-systems-quiz-04",
            "prompt": "Why is cosine similarity useful in content-based recommendation?",
            "answer": "It compares profile direction and works well for vector similarity.",
            "difficulty": "core"
          },
          {
            "id": "recommendation-systems-quiz-05",
            "prompt": "Why are ranking metrics more useful than plain accuracy here?",
            "answer": "Because what matters is whether good items appear high in the ranked list.",
            "difficulty": "core"
          },
          {
            "id": "recommendation-systems-quiz-06",
            "prompt": "What does hit rate measure?",
            "answer": "Whether at least one relevant item appears in the recommendation list.",
            "difficulty": "stretch"
          },
          {
            "id": "recommendation-systems-quiz-07",
            "prompt": "What does MRR care about?",
            "answer": "The position of the first relevant result.",
            "difficulty": "stretch"
          },
          {
            "id": "recommendation-systems-quiz-08",
            "prompt": "What is the purpose of candidate generation in a two-stage pipeline?",
            "answer": "To quickly narrow a huge item set into a smaller plausible subset before expensive reranking.",
            "difficulty": "stretch"
          }
        ]
      },
      {
        "title": "Workbook Part 4: Sequence Models",
        "topic": "sequence-models",
        "items": [
          {
            "id": "sequence-models-quiz-01",
            "prompt": "Why are some tasks sequence tasks?",
            "answer": "Because order changes meaning.",
            "difficulty": "core"
          },
          {
            "id": "sequence-models-quiz-02",
            "prompt": "Why do plain RNNs struggle with long-range dependencies?",
            "answer": "Because gradients can vanish or explode over many time steps.",
            "difficulty": "core"
          },
          {
            "id": "sequence-models-quiz-03",
            "prompt": "What problem does LSTM solve?",
            "answer": "It improves long-range memory through gated cell-state updates.",
            "difficulty": "core"
          },
          {
            "id": "sequence-models-quiz-04",
            "prompt": "What does the forget gate do?",
            "answer": "It decides what old information to discard.",
            "difficulty": "core"
          },
          {
            "id": "sequence-models-quiz-05",
            "prompt": "What is teacher forcing?",
            "answer": "Feeding the true previous token during decoder training.",
            "difficulty": "core"
          },
          {
            "id": "sequence-models-quiz-06",
            "prompt": "Why was attention introduced in seq2seq?",
            "answer": "To let the model focus on relevant input parts instead of compressing everything into one fixed vector.",
            "difficulty": "stretch"
          },
          {
            "id": "sequence-models-quiz-07",
            "prompt": "What do Query, Key, and Value mean conceptually?",
            "answer": "Query asks what to look for, Key says what is available, Value carries the content to aggregate.",
            "difficulty": "stretch"
          },
          {
            "id": "sequence-models-quiz-08",
            "prompt": "Why are Transformers easier to parallelize than RNNs?",
            "answer": "Because they do not rely on strict step-by-step recurrence during training.",
            "difficulty": "stretch"
          },
          {
            "id": "sequence-models-quiz-09",
            "prompt": "Why is multi-head attention useful?",
            "answer": "Because different heads can capture different relationships at the same time.",
            "difficulty": "stretch"
          }
        ]
      },
      {
        "title": "Workbook Part 5: Generative AI",
        "topic": "generative-ai",
        "items": [
          {
            "id": "generative-ai-quiz-01",
            "prompt": "Predictive AI vs generative AI?",
            "answer": "Predictive AI predicts labels or values; generative AI creates new content.",
            "difficulty": "core"
          },
          {
            "id": "generative-ai-quiz-02",
            "prompt": "What is an autoregressive language model?",
            "answer": "A model that generates text token by token using previous context.",
            "difficulty": "core"
          },
          {
            "id": "generative-ai-quiz-03",
            "prompt": "Greedy decoding vs top-p sampling?",
            "answer": "Greedy takes the highest-probability token each step; top-p samples from the smallest token set whose cumulative probability exceeds threshold `p`.",
            "difficulty": "core"
          },
          {
            "id": "generative-ai-quiz-04",
            "prompt": "Why does tokenization matter?",
            "answer": "It determines how text is split and affects vocabulary, efficiency, and multilingual behavior.",
            "difficulty": "core"
          },
          {
            "id": "generative-ai-quiz-05",
            "prompt": "What is in-context learning?",
            "answer": "Learning from examples given directly in the prompt without updating weights.",
            "difficulty": "core"
          },
          {
            "id": "generative-ai-quiz-06",
            "prompt": "What is instruction tuning?",
            "answer": "Supervised finetuning on instruction-following examples.",
            "difficulty": "stretch"
          },
          {
            "id": "generative-ai-quiz-07",
            "prompt": "What is RLHF trying to improve?",
            "answer": "Alignment with human preferences and more helpful instruction-following behavior.",
            "difficulty": "stretch"
          },
          {
            "id": "generative-ai-quiz-08",
            "prompt": "Why is BLEU limited?",
            "answer": "It rewards surface overlap and may miss semantic equivalence.",
            "difficulty": "stretch"
          },
          {
            "id": "generative-ai-quiz-09",
            "prompt": "LoRA vs RAG?",
            "answer": "LoRA adapts behavior with small trainable updates; RAG retrieves external knowledge at inference time.",
            "difficulty": "stretch"
          },
          {
            "id": "generative-ai-quiz-10",
            "prompt": "What does KV cache do?",
            "answer": "It reuses previous attention keys and values to reduce recomputation in autoregressive decoding.",
            "difficulty": "stretch"
          },
          {
            "id": "generative-ai-quiz-11",
            "prompt": "Why are guardrails needed?",
            "answer": "Because LLMs can output harmful, biased, or unsafe content.",
            "difficulty": "stretch"
          },
          {
            "id": "generative-ai-quiz-12",
            "prompt": "What is the forward process in diffusion?",
            "answer": "Gradually add noise to clean data.",
            "difficulty": "stretch"
          },
          {
            "id": "generative-ai-quiz-13",
            "prompt": "What is the reverse process in diffusion?",
            "answer": "Learn to denoise step by step from noise back to data.",
            "difficulty": "stretch"
          }
        ]
      },
      {
        "title": "Deep Dive Questions: Chapter 4",
        "topic": "unsupervised-learning",
        "items": [
          {
            "id": "unsupervised-learning-deep-01",
            "prompt": "Why can an unsupervised method produce a useful answer even though there is no label to compare against?",
            "answer": "Because usefulness can come from revealing structure, compression, or interpretable organization in the data even without a single ground-truth target label.",
            "difficulty": "deep"
          },
          {
            "id": "unsupervised-learning-deep-02",
            "prompt": "Why does K-means prefer compact clusters instead of arbitrary shapes?",
            "answer": "Because its objective is based on squared distance to a centroid, so clusters are summarized by one mean point and curved or disconnected shapes are represented poorly.",
            "difficulty": "deep"
          },
          {
            "id": "unsupervised-learning-deep-03",
            "prompt": "What does a dendrogram give you that K-means does not?",
            "answer": "A dendrogram gives the full merge history across scales, so you can inspect structure at multiple cut levels rather than committing to one flat partition only.",
            "difficulty": "deep"
          },
          {
            "id": "unsupervised-learning-deep-04",
            "prompt": "Why might PCA help before clustering even though PCA itself does not cluster?",
            "answer": "Because PCA can reduce noise or redundant dimensions and create a cleaner lower-dimensional representation for a later clustering method.",
            "difficulty": "deep"
          },
          {
            "id": "unsupervised-learning-deep-05",
            "prompt": "Why is it dangerous to compare large empty spaces between t-SNE clusters too literally?",
            "answer": "Because t-SNE is optimized to preserve local neighborhoods, not exact global geometry, so large inter-cluster gaps in the plot can exaggerate separation.",
            "difficulty": "deep"
          }
        ]
      },
      {
        "title": "Deep Dive Questions: Chapter 5",
        "topic": "neural-networks-foundations",
        "items": [
          {
            "id": "neural-networks-foundations-deep-01",
            "prompt": "Why is a hidden layer called hidden rather than magical?",
            "answer": "Because it is simply an internal representation layer whose activations are not the final outputs. It is learned, but it still follows explicit algebraic operations.",
            "difficulty": "deep"
          },
          {
            "id": "neural-networks-foundations-deep-02",
            "prompt": "What does backpropagation actually compute?",
            "answer": "It efficiently computes how changing each parameter would change the loss, using the chain rule through the network's layered structure.",
            "difficulty": "deep"
          },
          {
            "id": "neural-networks-foundations-deep-03",
            "prompt": "Why is low training loss not enough to claim success?",
            "answer": "Because the real goal is generalization. A model can memorize training data and still perform poorly on validation or test data.",
            "difficulty": "deep"
          },
          {
            "id": "neural-networks-foundations-deep-04",
            "prompt": "Why can learning-rate scheduling help even if the architecture stays the same?",
            "answer": "Because optimization behavior changes during training. Larger steps help early movement, while smaller steps often help late refinement.",
            "difficulty": "deep"
          },
          {
            "id": "neural-networks-foundations-deep-05",
            "prompt": "Why is dropout considered regularization instead of ordinary architecture?",
            "answer": "Because its main role is to reduce over-reliance on specific units and improve generalization rather than to change the function class in a deterministic way.",
            "difficulty": "deep"
          }
        ]
      },
      {
        "title": "Deep Dive Questions: Chapter 6",
        "topic": "convolutional-networks",
        "items": [
          {
            "id": "convolutional-networks-deep-01",
            "prompt": "Why does parameter sharing help both learning and efficiency?",
            "answer": "Because the same filter can detect the same kind of pattern anywhere in the image, which reduces parameters and encourages reuse of meaningful local features.",
            "difficulty": "deep"
          },
          {
            "id": "convolutional-networks-deep-02",
            "prompt": "Why is a 1 x 1 convolution useful even though it has almost no spatial extent?",
            "answer": "Because it mixes information across channels and can change channel dimension, acting like a learned projection at each spatial location.",
            "difficulty": "deep"
          },
          {
            "id": "convolutional-networks-deep-03",
            "prompt": "What problem did ResNet mainly solve?",
            "answer": "It mainly improved optimization of very deep networks by allowing identity shortcuts and better gradient flow through residual connections.",
            "difficulty": "deep"
          },
          {
            "id": "convolutional-networks-deep-04",
            "prompt": "Why is a CNN more natural than a dense network for a 5 x 5 x 3 weather grid?",
            "answer": "Because nearby cells have spatial relationships, and a CNN can exploit local structure and shared filters instead of flattening away that geometry.",
            "difficulty": "deep"
          },
          {
            "id": "convolutional-networks-deep-05",
            "prompt": "Why is pooling not the only way to shrink spatial size?",
            "answer": "Because strided convolutions can also reduce spatial dimensions while still learning the downsampling transformation.",
            "difficulty": "deep"
          }
        ]
      },
      {
        "title": "Deep Dive Questions: Chapter 7",
        "topic": "recommendation-systems",
        "items": [
          {
            "id": "recommendation-systems-deep-01",
            "prompt": "Why can content-based recommendation help with brand-new items better than pure collaborative filtering?",
            "answer": "Because a new item can be represented from its known features immediately, while collaborative methods need interaction history before they know where that item belongs in behavior space.",
            "difficulty": "deep"
          },
          {
            "id": "recommendation-systems-deep-02",
            "prompt": "Why do large systems use candidate generation before ranking?",
            "answer": "Because scoring an enormous catalog with a heavy model for every request is too expensive, so a fast stage first narrows the catalog to a plausible smaller set.",
            "difficulty": "deep"
          },
          {
            "id": "recommendation-systems-deep-03",
            "prompt": "What is the danger of optimizing only click-through rate?",
            "answer": "It can favor short-term engagement while ignoring diversity, novelty, satisfaction, or long-term user value.",
            "difficulty": "deep"
          },
          {
            "id": "recommendation-systems-deep-04",
            "prompt": "Why do embeddings help recommendation beyond hand-built metadata?",
            "answer": "Because embeddings can capture hidden structure and interaction patterns that are not explicitly described by manual item fields.",
            "difficulty": "deep"
          },
          {
            "id": "recommendation-systems-deep-05",
            "prompt": "Why is evaluation harder in recommendation than in many classification problems?",
            "answer": "Because the system only observes interactions on exposed items, ranking order matters, and the model's own behavior shapes the future data it gets to learn from.",
            "difficulty": "deep"
          }
        ]
      },
      {
        "title": "Deep Dive Questions: Chapter 8",
        "topic": "sequence-models",
        "items": [
          {
            "id": "sequence-models-deep-01",
            "prompt": "Why is it useful to think of an unrolled RNN as a deep network over time?",
            "answer": "Because it makes the gradient problem easier to see: long sequences create long paths for error signals, which is exactly why vanishing and exploding gradients appear.",
            "difficulty": "deep"
          },
          {
            "id": "sequence-models-deep-02",
            "prompt": "Why does teacher forcing help during training but create a mismatch at inference time?",
            "answer": "Because during training the decoder sees the true previous token, but during inference it must condition on its own predictions, which may include mistakes.",
            "difficulty": "deep"
          },
          {
            "id": "sequence-models-deep-03",
            "prompt": "Why can Transformers be trained more efficiently on modern hardware than RNNs?",
            "answer": "Because attention-based layers allow much more parallel computation during training instead of strict token-by-token recurrence.",
            "difficulty": "deep"
          },
          {
            "id": "sequence-models-deep-04",
            "prompt": "Why are multiple attention heads useful rather than redundant?",
            "answer": "Because different heads can learn different relevance patterns or relational views of the same sequence in parallel.",
            "difficulty": "deep"
          },
          {
            "id": "sequence-models-deep-05",
            "prompt": "Why does positional information still matter in a Transformer?",
            "answer": "Because attention alone does not inherently encode token order, so positional signals are needed to distinguish sequences with the same tokens in different arrangements.",
            "difficulty": "deep"
          }
        ]
      },
      {
        "title": "Deep Dive Questions: Chapter 9",
        "topic": "generative-ai",
        "items": [
          {
            "id": "generative-ai-deep-01",
            "prompt": "Why does decoding matter if the model already outputs probabilities?",
            "answer": "Because probabilities are not yet final text. The decoding rule decides how those probabilities are turned into an actual token sequence, which strongly affects diversity and coherence.",
            "difficulty": "deep"
          },
          {
            "id": "generative-ai-deep-02",
            "prompt": "Why is instruction tuning different from pretraining?",
            "answer": "Pretraining teaches broad next-token modeling from general corpora, while instruction tuning specifically teaches the model to respond helpfully to task-like prompts.",
            "difficulty": "deep"
          },
          {
            "id": "generative-ai-deep-03",
            "prompt": "Why does RLHF improve user experience without guaranteeing truth?",
            "answer": "Because it optimizes toward outputs preferred by human raters, which often improves tone and helpfulness but is not the same as direct factual verification.",
            "difficulty": "deep"
          },
          {
            "id": "generative-ai-deep-04",
            "prompt": "Why is KV cache a system optimization rather than a new learning objective?",
            "answer": "Because it speeds up autoregressive inference by reusing prior attention computations rather than changing how the model was trained.",
            "difficulty": "deep"
          },
          {
            "id": "generative-ai-deep-05",
            "prompt": "Why are diffusion models often slower than autoregressive text generation feels conceptually?",
            "answer": "Because image generation typically requires many iterative denoising steps, whereas text generation emits one token at a time from a directly trained autoregressive model.",
            "difficulty": "deep"
          }
        ]
      }
    ],
    "mixedEssay": [
      "Compare K-means, hierarchical clustering, PCA, and t-SNE in one coherent answer.",
      "Explain how neural networks are trained and why overfitting happens.",
      "Compare content-based recommendation, collaborative filtering, and matrix factorization.",
      "Explain why LSTM was introduced and why Transformer later became dominant.",
      "Explain the full path from pretraining to instruction tuning to RLHF.",
      "Compare LoRA and RAG as solutions for making an LLM better.",
      "Explain why diffusion is powerful for image generation but still has system-level costs."
    ]
  },
  "cramCards": [
    {
      "title": "# Cram Sheet",
      "html": "<p>Use this in the final 24-48 hours.</p>",
      "searchText": "Use this in the final 24-48 hours."
    },
    {
      "title": "1. Unsupervised Learning",
      "html": "<ul class=\"md-list\"><li>Unsupervised means no labels.</li><li>K-means:</li><li style=\"margin-left:1.25rem\">choose \\(k\\)</li><li style=\"margin-left:1.25rem\">assign to nearest centroid</li><li style=\"margin-left:1.25rem\">recompute mean</li><li style=\"margin-left:1.25rem\">repeat</li><li>Normalize before distance-based clustering.</li><li>Elbow method is heuristic, not exact truth.</li><li>Hierarchical clustering:</li><li style=\"margin-left:1.25rem\">merge closest clusters step by step</li><li style=\"margin-left:1.25rem\">inspect dendrogram height</li><li>PCA:</li><li style=\"margin-left:1.25rem\">linear projection to maximum-variance axes</li><li style=\"margin-left:1.25rem\">not clustering</li><li>t-SNE:</li><li style=\"margin-left:1.25rem\">good for local visualization</li><li style=\"margin-left:1.25rem\">bad for strong global geometric claims</li></ul>",
      "searchText": "Unsupervised means no labels. K-means: choose \\(k\\) assign to nearest centroid recompute mean repeat Normalize before distance-based clustering. Elbow method is heuristic, not exact truth. Hierarchical clustering: merge closest clusters step by step inspect dendrogram height PCA: linear projection to maximum-variance axes not clustering t-SNE: good for local visualization bad for strong global geometric claims"
    },
    {
      "title": "2. Neural Networks",
      "html": "<ul class=\"md-list\"><li>Neural network = stacked linear layers plus nonlinear activations.</li><li>No nonlinearity means still just linear.</li><li>ReLU is common hidden activation.</li><li>Classification:</li><li style=\"margin-left:1.25rem\">softmax + cross-entropy</li><li>Regression:</li><li style=\"margin-left:1.25rem\">linear output + MSE</li><li>Gradient descent updates parameters using negative gradient direction.</li><li>Backprop = efficient chain rule.</li><li>Overfitting:</li><li style=\"margin-left:1.25rem\">training good, validation worse</li><li>Dropout:</li><li style=\"margin-left:1.25rem\">turns off random neurons during training</li><li>CNNs:</li><li style=\"margin-left:1.25rem\">local filters</li><li style=\"margin-left:1.25rem\">parameter sharing</li><li style=\"margin-left:1.25rem\">better for images</li><li>Conv output size:</li><li style=\"margin-left:1.25rem\">\\(\\left\\lfloor \\frac{n + 2p - f}{s} \\right\\rfloor + 1\\)</li><li>Transfer learning:</li><li style=\"margin-left:1.25rem\">reuse pretrained features</li></ul>",
      "searchText": "Neural network = stacked linear layers plus nonlinear activations. No nonlinearity means still just linear. ReLU is common hidden activation. Classification: softmax + cross-entropy Regression: linear output + MSE Gradient descent updates parameters using negative gradient direction. Backprop = efficient chain rule. Overfitting: training good, validation worse Dropout: turns off random neurons during training CNNs: local filters parameter sharing better for images Conv output size: \\(\\left\\lfloor \\frac{n + 2p - f}{s} \\right\\rfloor + 1\\) Transfer learning: reuse pretrained features"
    },
    {
      "title": "3. Recommender Systems",
      "html": "<ul class=\"md-list\"><li>Content-based:</li><li style=\"margin-left:1.25rem\">recommend similar items using item features</li><li>Collaborative filtering:</li><li style=\"margin-left:1.25rem\">recommend from group behavior</li><li>Matrix factorization:</li><li style=\"margin-left:1.25rem\">learn user and item latent vectors</li><li>Cold start:</li><li style=\"margin-left:1.25rem\">new user or new item</li><li>Ranking metrics matter more than plain accuracy:</li><li style=\"margin-left:1.25rem\">precision</li><li style=\"margin-left:1.25rem\">recall</li><li style=\"margin-left:1.25rem\">MAP</li><li style=\"margin-left:1.25rem\">hit rate</li><li style=\"margin-left:1.25rem\">nDCG</li><li style=\"margin-left:1.25rem\">MRR</li><li>Two-stage pipeline:</li><li style=\"margin-left:1.25rem\">candidate generation</li><li style=\"margin-left:1.25rem\">reranking</li></ul>",
      "searchText": "Content-based: recommend similar items using item features Collaborative filtering: recommend from group behavior Matrix factorization: learn user and item latent vectors Cold start: new user or new item Ranking metrics matter more than plain accuracy: precision recall MAP hit rate nDCG MRR Two-stage pipeline: candidate generation reranking"
    },
    {
      "title": "4. Sequence Models",
      "html": "<ul class=\"md-list\"><li>Sequence problems care about order.</li><li>Plain RNNs:</li><li style=\"margin-left:1.25rem\">can forget long-range information</li><li style=\"margin-left:1.25rem\">suffer vanishing and exploding gradients</li><li>LSTM:</li><li style=\"margin-left:1.25rem\">forget gate</li><li style=\"margin-left:1.25rem\">input gate</li><li style=\"margin-left:1.25rem\">output gate</li><li style=\"margin-left:1.25rem\">cell state</li><li>Seq2seq:</li><li style=\"margin-left:1.25rem\">encoder + decoder</li><li>Teacher forcing:</li><li style=\"margin-left:1.25rem\">use true previous token during training</li><li>Attention:</li><li style=\"margin-left:1.25rem\">focus on relevant parts of input</li><li>Transformer:</li><li style=\"margin-left:1.25rem\">self-attention</li><li style=\"margin-left:1.25rem\">Query, Key, Value</li><li style=\"margin-left:1.25rem\">multi-head attention</li><li style=\"margin-left:1.25rem\">more parallel than RNNs</li></ul>",
      "searchText": "Sequence problems care about order. Plain RNNs: can forget long-range information suffer vanishing and exploding gradients LSTM: forget gate input gate output gate cell state Seq2seq: encoder + decoder Teacher forcing: use true previous token during training Attention: focus on relevant parts of input Transformer: self-attention Query, Key, Value multi-head attention more parallel than RNNs"
    },
    {
      "title": "5. Generative AI",
      "html": "<ul class=\"md-list\"><li>Generative AI creates new content.</li><li>LLMs are autoregressive:</li><li style=\"margin-left:1.25rem\">predict next token from previous context</li><li>Tokens matter.</li><li>Tokenization examples:</li><li style=\"margin-left:1.25rem\">BPE</li><li style=\"margin-left:1.25rem\">WordPiece</li><li style=\"margin-left:1.25rem\">SentencePiece</li><li>Decoding:</li><li style=\"margin-left:1.25rem\">greedy</li><li style=\"margin-left:1.25rem\">top-k</li><li style=\"margin-left:1.25rem\">top-p</li><li style=\"margin-left:1.25rem\">temperature</li><li>In-context learning:</li><li style=\"margin-left:1.25rem\">examples in prompt</li><li>Instruction tuning:</li><li style=\"margin-left:1.25rem\">supervised finetuning for following instructions</li><li>RLHF:</li><li style=\"margin-left:1.25rem\">align outputs to human preferences</li><li>BLEU is limited.</li><li>BERTScore and COMET are more semantic / learned.</li><li>LoRA:</li><li style=\"margin-left:1.25rem\">efficient tuning for behavior/capability</li><li>RAG:</li><li style=\"margin-left:1.25rem\">retrieve documents at inference time</li><li style=\"margin-left:1.25rem\">better for new facts</li><li>KV cache:</li><li style=\"margin-left:1.25rem\">reuse old keys and values</li><li>Guardrails:</li><li style=\"margin-left:1.25rem\">try to reduce unsafe outputs</li><li>Diffusion:</li><li style=\"margin-left:1.25rem\">forward = add noise</li><li style=\"margin-left:1.25rem\">reverse = denoise</li></ul>",
      "searchText": "Generative AI creates new content. LLMs are autoregressive: predict next token from previous context Tokens matter. Tokenization examples: BPE WordPiece SentencePiece Decoding: greedy top-k top-p temperature In-context learning: examples in prompt Instruction tuning: supervised finetuning for following instructions RLHF: align outputs to human preferences BLEU is limited. BERTScore and COMET are more semantic / learned. LoRA: efficient tuning for behavior/capability RAG: retrieve documents at inference time better for new facts KV cache: reuse old keys and values Guardrails: try to reduce unsafe outputs Diffusion: forward = add noise reverse = denoise"
    },
    {
      "title": "6. The Most Important Comparisons",
      "html": "<ul class=\"md-list\"><li>K-means vs hierarchical clustering</li><li>PCA vs t-SNE</li><li>classification vs regression losses</li><li>MLP vs CNN</li><li>RNN vs LSTM</li><li>LSTM vs Transformer</li><li>content-based vs collaborative filtering</li><li>LoRA vs RAG</li><li>greedy vs top-p</li></ul>",
      "searchText": "K-means vs hierarchical clustering PCA vs t-SNE classification vs regression losses MLP vs CNN RNN vs LSTM LSTM vs Transformer content-based vs collaborative filtering LoRA vs RAG greedy vs top-p"
    },
    {
      "title": "7. The Most Common Traps",
      "html": "<ul class=\"md-list\"><li>forgetting normalization in clustering</li><li>calling PCA a clustering method</li><li>mixing up softmax and linear output</li><li>confusing validation and test roles</li><li>saying RAG changes model weights</li><li>saying BLEU equals true quality</li><li>saying Transformers are just bigger RNNs</li></ul>",
      "searchText": "forgetting normalization in clustering calling PCA a clustering method mixing up softmax and linear output confusing validation and test roles saying RAG changes model weights saying BLEU equals true quality saying Transformers are just bigger RNNs"
    },
    {
      "title": "8. Last-Minute Verbal Check",
      "html": "<p>Make sure you can explain these from memory:</p>\n<ul class=\"md-list\"><li>Why does K-means need normalization?</li><li>Why does nonlinearity matter?</li><li>Why is MSE used for rainfall prediction?</li><li>Why are CNNs better for images?</li><li>Why does LSTM help long-term dependencies?</li><li>Why did Transformers become dominant?</li><li>Why is RAG better than LoRA for fresh facts?</li><li>Why is diffusion strong but slow?</li></ul>",
      "searchText": "Make sure you can explain these from memory: Why does K-means need normalization? Why does nonlinearity matter? Why is MSE used for rainfall prediction? Why are CNNs better for images? Why does LSTM help long-term dependencies? Why did Transformers become dominant? Why is RAG better than LoRA for fresh facts? Why is diffusion strong but slow?"
    }
  ],
  "flashcards": [
    {
      "front": "What is the difference between supervised and unsupervised learning?",
      "back": "Unsupervised learning has no labels and tries to discover hidden structure.",
      "topic": "unsupervised-learning",
      "kind": "workbook"
    },
    {
      "front": "Why does normalization matter so much for K-means?",
      "back": "Because distance gets dominated by large-scale features if data is not normalized.",
      "topic": "unsupervised-learning",
      "kind": "workbook"
    },
    {
      "front": "Explain K-means step by step.",
      "back": "Initialize centroids, assign points to nearest centroid, recompute means, repeat.",
      "topic": "unsupervised-learning",
      "kind": "workbook"
    },
    {
      "front": "Why does inertia always decrease when `k` increases?",
      "back": "More clusters always reduce within-cluster spread.",
      "topic": "unsupervised-learning",
      "kind": "workbook"
    },
    {
      "front": "Why is the elbow method only a heuristic?",
      "back": "Because the elbow may be weak or ambiguous and does not define a mathematically unique best `k`.",
      "topic": "unsupervised-learning",
      "kind": "workbook"
    },
    {
      "front": "What does a dendrogram show?",
      "back": "The sequence and height of hierarchical merges.",
      "topic": "unsupervised-learning",
      "kind": "workbook"
    },
    {
      "front": "Compare Ward linkage and single linkage.",
      "back": "Ward prefers compact low-variance merges; single linkage uses minimum pair distance and can chain clusters.",
      "topic": "unsupervised-learning",
      "kind": "workbook"
    },
    {
      "front": "What is PCA geometrically?",
      "back": "PCA rotates the data to directions of maximum variance.",
      "topic": "unsupervised-learning",
      "kind": "workbook"
    },
    {
      "front": "Why is PCA not a clustering algorithm?",
      "back": "It projects data to new axes but does not assign cluster labels.",
      "topic": "unsupervised-learning",
      "kind": "workbook"
    },
    {
      "front": "Why should t-SNE plots be interpreted carefully?",
      "back": "Because local neighborhoods may be preserved while global distances and cluster spacing can mislead.",
      "topic": "unsupervised-learning",
      "kind": "workbook"
    },
    {
      "front": "Why is nonlinearity necessary in neural networks?",
      "back": "Without nonlinearity, stacked linear layers still behave like one linear layer.",
      "topic": "neural-networks-foundations",
      "kind": "workbook"
    },
    {
      "front": "When do you use cross-entropy? When do you use MSE?",
      "back": "Cross-entropy for classification, MSE for regression.",
      "topic": "neural-networks-foundations",
      "kind": "workbook"
    },
    {
      "front": "Why is a linear output appropriate for rainfall prediction?",
      "back": "Because rainfall is a real-valued target and should not be artificially bounded.",
      "topic": "neural-networks-foundations",
      "kind": "workbook"
    },
    {
      "front": "What is backpropagation?",
      "back": "Efficient chain-rule computation of gradients through the network.",
      "topic": "neural-networks-foundations",
      "kind": "workbook"
    },
    {
      "front": "What does the learning rate control?",
      "back": "The step size of optimization updates.",
      "topic": "neural-networks-foundations",
      "kind": "workbook"
    },
    {
      "front": "How do you tell overfitting from underfitting?",
      "back": "Underfitting means both train and validation are poor; overfitting means train is good but validation degrades.",
      "topic": "neural-networks-foundations",
      "kind": "workbook"
    },
    {
      "front": "What does dropout do?",
      "back": "Randomly disables units during training to reduce co-adaptation and improve generalization.",
      "topic": "neural-networks-foundations",
      "kind": "workbook"
    },
    {
      "front": "Why are CNNs better than MLPs for images?",
      "back": "CNNs exploit spatial locality and parameter sharing.",
      "topic": "neural-networks-foundations",
      "kind": "workbook"
    },
    {
      "front": "Compute parameters for a dense layer from 75 inputs to 200 outputs.",
      "back": "`75 * 200 + 200 = 15200`",
      "topic": "neural-networks-foundations",
      "kind": "workbook"
    },
    {
      "front": "Why does transfer learning help on small datasets?",
      "back": "Because pretrained features give a better starting point and usually converge faster with better accuracy.",
      "topic": "neural-networks-foundations",
      "kind": "workbook"
    },
    {
      "front": "What is the difference between content-based and collaborative filtering?",
      "back": "Content-based uses item features; collaborative filtering uses behavior patterns across users and items.",
      "topic": "recommendation-systems",
      "kind": "workbook"
    },
    {
      "front": "What is the cold start problem?",
      "back": "Difficulty recommending for new users or new items with little history.",
      "topic": "recommendation-systems",
      "kind": "workbook"
    },
    {
      "front": "What is matrix factorization trying to learn?",
      "back": "Low-dimensional latent vectors for users and items.",
      "topic": "recommendation-systems",
      "kind": "workbook"
    },
    {
      "front": "Why is cosine similarity useful in content-based recommendation?",
      "back": "It compares profile direction and works well for vector similarity.",
      "topic": "recommendation-systems",
      "kind": "workbook"
    },
    {
      "front": "Why are ranking metrics more useful than plain accuracy here?",
      "back": "Because what matters is whether good items appear high in the ranked list.",
      "topic": "recommendation-systems",
      "kind": "workbook"
    },
    {
      "front": "What does hit rate measure?",
      "back": "Whether at least one relevant item appears in the recommendation list.",
      "topic": "recommendation-systems",
      "kind": "workbook"
    },
    {
      "front": "What does MRR care about?",
      "back": "The position of the first relevant result.",
      "topic": "recommendation-systems",
      "kind": "workbook"
    },
    {
      "front": "What is the purpose of candidate generation in a two-stage pipeline?",
      "back": "To quickly narrow a huge item set into a smaller plausible subset before expensive reranking.",
      "topic": "recommendation-systems",
      "kind": "workbook"
    },
    {
      "front": "Why are some tasks sequence tasks?",
      "back": "Because order changes meaning.",
      "topic": "sequence-models",
      "kind": "workbook"
    },
    {
      "front": "Why do plain RNNs struggle with long-range dependencies?",
      "back": "Because gradients can vanish or explode over many time steps.",
      "topic": "sequence-models",
      "kind": "workbook"
    },
    {
      "front": "What problem does LSTM solve?",
      "back": "It improves long-range memory through gated cell-state updates.",
      "topic": "sequence-models",
      "kind": "workbook"
    },
    {
      "front": "What does the forget gate do?",
      "back": "It decides what old information to discard.",
      "topic": "sequence-models",
      "kind": "workbook"
    },
    {
      "front": "What is teacher forcing?",
      "back": "Feeding the true previous token during decoder training.",
      "topic": "sequence-models",
      "kind": "workbook"
    },
    {
      "front": "Why was attention introduced in seq2seq?",
      "back": "To let the model focus on relevant input parts instead of compressing everything into one fixed vector.",
      "topic": "sequence-models",
      "kind": "workbook"
    },
    {
      "front": "What do Query, Key, and Value mean conceptually?",
      "back": "Query asks what to look for, Key says what is available, Value carries the content to aggregate.",
      "topic": "sequence-models",
      "kind": "workbook"
    },
    {
      "front": "Why are Transformers easier to parallelize than RNNs?",
      "back": "Because they do not rely on strict step-by-step recurrence during training.",
      "topic": "sequence-models",
      "kind": "workbook"
    },
    {
      "front": "Why is multi-head attention useful?",
      "back": "Because different heads can capture different relationships at the same time.",
      "topic": "sequence-models",
      "kind": "workbook"
    },
    {
      "front": "Predictive AI vs generative AI?",
      "back": "Predictive AI predicts labels or values; generative AI creates new content.",
      "topic": "generative-ai",
      "kind": "workbook"
    },
    {
      "front": "What is an autoregressive language model?",
      "back": "A model that generates text token by token using previous context.",
      "topic": "generative-ai",
      "kind": "workbook"
    },
    {
      "front": "Greedy decoding vs top-p sampling?",
      "back": "Greedy takes the highest-probability token each step; top-p samples from the smallest token set whose cumulative probability exceeds threshold `p`.",
      "topic": "generative-ai",
      "kind": "workbook"
    },
    {
      "front": "Why does tokenization matter?",
      "back": "It determines how text is split and affects vocabulary, efficiency, and multilingual behavior.",
      "topic": "generative-ai",
      "kind": "workbook"
    },
    {
      "front": "What is in-context learning?",
      "back": "Learning from examples given directly in the prompt without updating weights.",
      "topic": "generative-ai",
      "kind": "workbook"
    },
    {
      "front": "What is instruction tuning?",
      "back": "Supervised finetuning on instruction-following examples.",
      "topic": "generative-ai",
      "kind": "workbook"
    },
    {
      "front": "What is RLHF trying to improve?",
      "back": "Alignment with human preferences and more helpful instruction-following behavior.",
      "topic": "generative-ai",
      "kind": "workbook"
    },
    {
      "front": "Why is BLEU limited?",
      "back": "It rewards surface overlap and may miss semantic equivalence.",
      "topic": "generative-ai",
      "kind": "workbook"
    },
    {
      "front": "LoRA vs RAG?",
      "back": "LoRA adapts behavior with small trainable updates; RAG retrieves external knowledge at inference time.",
      "topic": "generative-ai",
      "kind": "workbook"
    },
    {
      "front": "What does KV cache do?",
      "back": "It reuses previous attention keys and values to reduce recomputation in autoregressive decoding.",
      "topic": "generative-ai",
      "kind": "workbook"
    },
    {
      "front": "Why are guardrails needed?",
      "back": "Because LLMs can output harmful, biased, or unsafe content.",
      "topic": "generative-ai",
      "kind": "workbook"
    },
    {
      "front": "What is the forward process in diffusion?",
      "back": "Gradually add noise to clean data.",
      "topic": "generative-ai",
      "kind": "workbook"
    },
    {
      "front": "What is the reverse process in diffusion?",
      "back": "Learn to denoise step by step from noise back to data.",
      "topic": "generative-ai",
      "kind": "workbook"
    },
    {
      "front": "Why can an unsupervised method produce a useful answer even though there is no label to compare against?",
      "back": "Because usefulness can come from revealing structure, compression, or interpretable organization in the data even without a single ground-truth target label.",
      "topic": "unsupervised-learning",
      "kind": "workbook"
    },
    {
      "front": "Why does K-means prefer compact clusters instead of arbitrary shapes?",
      "back": "Because its objective is based on squared distance to a centroid, so clusters are summarized by one mean point and curved or disconnected shapes are represented poorly.",
      "topic": "unsupervised-learning",
      "kind": "workbook"
    },
    {
      "front": "What does a dendrogram give you that K-means does not?",
      "back": "A dendrogram gives the full merge history across scales, so you can inspect structure at multiple cut levels rather than committing to one flat partition only.",
      "topic": "unsupervised-learning",
      "kind": "workbook"
    },
    {
      "front": "Why might PCA help before clustering even though PCA itself does not cluster?",
      "back": "Because PCA can reduce noise or redundant dimensions and create a cleaner lower-dimensional representation for a later clustering method.",
      "topic": "unsupervised-learning",
      "kind": "workbook"
    },
    {
      "front": "Why is it dangerous to compare large empty spaces between t-SNE clusters too literally?",
      "back": "Because t-SNE is optimized to preserve local neighborhoods, not exact global geometry, so large inter-cluster gaps in the plot can exaggerate separation.",
      "topic": "unsupervised-learning",
      "kind": "workbook"
    },
    {
      "front": "Why is a hidden layer called hidden rather than magical?",
      "back": "Because it is simply an internal representation layer whose activations are not the final outputs. It is learned, but it still follows explicit algebraic operations.",
      "topic": "neural-networks-foundations",
      "kind": "workbook"
    },
    {
      "front": "What does backpropagation actually compute?",
      "back": "It efficiently computes how changing each parameter would change the loss, using the chain rule through the network's layered structure.",
      "topic": "neural-networks-foundations",
      "kind": "workbook"
    },
    {
      "front": "Why is low training loss not enough to claim success?",
      "back": "Because the real goal is generalization. A model can memorize training data and still perform poorly on validation or test data.",
      "topic": "neural-networks-foundations",
      "kind": "workbook"
    },
    {
      "front": "Why can learning-rate scheduling help even if the architecture stays the same?",
      "back": "Because optimization behavior changes during training. Larger steps help early movement, while smaller steps often help late refinement.",
      "topic": "neural-networks-foundations",
      "kind": "workbook"
    },
    {
      "front": "Why is dropout considered regularization instead of ordinary architecture?",
      "back": "Because its main role is to reduce over-reliance on specific units and improve generalization rather than to change the function class in a deterministic way.",
      "topic": "neural-networks-foundations",
      "kind": "workbook"
    },
    {
      "front": "Why does parameter sharing help both learning and efficiency?",
      "back": "Because the same filter can detect the same kind of pattern anywhere in the image, which reduces parameters and encourages reuse of meaningful local features.",
      "topic": "convolutional-networks",
      "kind": "workbook"
    },
    {
      "front": "Why is a 1 x 1 convolution useful even though it has almost no spatial extent?",
      "back": "Because it mixes information across channels and can change channel dimension, acting like a learned projection at each spatial location.",
      "topic": "convolutional-networks",
      "kind": "workbook"
    },
    {
      "front": "What problem did ResNet mainly solve?",
      "back": "It mainly improved optimization of very deep networks by allowing identity shortcuts and better gradient flow through residual connections.",
      "topic": "convolutional-networks",
      "kind": "workbook"
    },
    {
      "front": "Why is a CNN more natural than a dense network for a 5 x 5 x 3 weather grid?",
      "back": "Because nearby cells have spatial relationships, and a CNN can exploit local structure and shared filters instead of flattening away that geometry.",
      "topic": "convolutional-networks",
      "kind": "workbook"
    },
    {
      "front": "Why is pooling not the only way to shrink spatial size?",
      "back": "Because strided convolutions can also reduce spatial dimensions while still learning the downsampling transformation.",
      "topic": "convolutional-networks",
      "kind": "workbook"
    },
    {
      "front": "Why can content-based recommendation help with brand-new items better than pure collaborative filtering?",
      "back": "Because a new item can be represented from its known features immediately, while collaborative methods need interaction history before they know where that item belongs in behavior space.",
      "topic": "recommendation-systems",
      "kind": "workbook"
    },
    {
      "front": "Why do large systems use candidate generation before ranking?",
      "back": "Because scoring an enormous catalog with a heavy model for every request is too expensive, so a fast stage first narrows the catalog to a plausible smaller set.",
      "topic": "recommendation-systems",
      "kind": "workbook"
    },
    {
      "front": "What is the danger of optimizing only click-through rate?",
      "back": "It can favor short-term engagement while ignoring diversity, novelty, satisfaction, or long-term user value.",
      "topic": "recommendation-systems",
      "kind": "workbook"
    },
    {
      "front": "Why do embeddings help recommendation beyond hand-built metadata?",
      "back": "Because embeddings can capture hidden structure and interaction patterns that are not explicitly described by manual item fields.",
      "topic": "recommendation-systems",
      "kind": "workbook"
    },
    {
      "front": "Why is evaluation harder in recommendation than in many classification problems?",
      "back": "Because the system only observes interactions on exposed items, ranking order matters, and the model's own behavior shapes the future data it gets to learn from.",
      "topic": "recommendation-systems",
      "kind": "workbook"
    },
    {
      "front": "Why is it useful to think of an unrolled RNN as a deep network over time?",
      "back": "Because it makes the gradient problem easier to see: long sequences create long paths for error signals, which is exactly why vanishing and exploding gradients appear.",
      "topic": "sequence-models",
      "kind": "workbook"
    },
    {
      "front": "Why does teacher forcing help during training but create a mismatch at inference time?",
      "back": "Because during training the decoder sees the true previous token, but during inference it must condition on its own predictions, which may include mistakes.",
      "topic": "sequence-models",
      "kind": "workbook"
    },
    {
      "front": "Why can Transformers be trained more efficiently on modern hardware than RNNs?",
      "back": "Because attention-based layers allow much more parallel computation during training instead of strict token-by-token recurrence.",
      "topic": "sequence-models",
      "kind": "workbook"
    },
    {
      "front": "Why are multiple attention heads useful rather than redundant?",
      "back": "Because different heads can learn different relevance patterns or relational views of the same sequence in parallel.",
      "topic": "sequence-models",
      "kind": "workbook"
    },
    {
      "front": "Why does positional information still matter in a Transformer?",
      "back": "Because attention alone does not inherently encode token order, so positional signals are needed to distinguish sequences with the same tokens in different arrangements.",
      "topic": "sequence-models",
      "kind": "workbook"
    },
    {
      "front": "Why does decoding matter if the model already outputs probabilities?",
      "back": "Because probabilities are not yet final text. The decoding rule decides how those probabilities are turned into an actual token sequence, which strongly affects diversity and coherence.",
      "topic": "generative-ai",
      "kind": "workbook"
    },
    {
      "front": "Why is instruction tuning different from pretraining?",
      "back": "Pretraining teaches broad next-token modeling from general corpora, while instruction tuning specifically teaches the model to respond helpfully to task-like prompts.",
      "topic": "generative-ai",
      "kind": "workbook"
    },
    {
      "front": "Why does RLHF improve user experience without guaranteeing truth?",
      "back": "Because it optimizes toward outputs preferred by human raters, which often improves tone and helpfulness but is not the same as direct factual verification.",
      "topic": "generative-ai",
      "kind": "workbook"
    },
    {
      "front": "Why is KV cache a system optimization rather than a new learning objective?",
      "back": "Because it speeds up autoregressive inference by reusing prior attention computations rather than changing how the model was trained.",
      "topic": "generative-ai",
      "kind": "workbook"
    },
    {
      "front": "Why are diffusion models often slower than autoregressive text generation feels conceptually?",
      "back": "Because image generation typically requires many iterative denoising steps, whereas text generation emits one token at a time from a directly trained autoregressive model.",
      "topic": "generative-ai",
      "kind": "workbook"
    },
    {
      "front": "K-means vs hierarchical clustering",
      "back": "K-means gives a flat partition with chosen k and centroid-based compact clusters, while hierarchical clustering gives a merge tree and lets you inspect structure at several cut levels.",
      "topic": "unsupervised-learning",
      "kind": "comparison"
    },
    {
      "front": "PCA vs t-SNE",
      "back": "PCA is linear, variance-based, and useful for compression or preprocessing. t-SNE is nonlinear, neighborhood-preserving, and mainly for visualization.",
      "topic": "unsupervised-learning",
      "kind": "comparison"
    },
    {
      "front": "Classification loss vs regression loss",
      "back": "Cross-entropy is standard when predicting class probabilities. MSE is standard when predicting continuous numeric targets.",
      "topic": "neural-networks-foundations",
      "kind": "comparison"
    },
    {
      "front": "MLP vs CNN",
      "back": "An MLP treats the input as an unordered vector. A CNN encodes locality and parameter sharing, making it far better for images and grids.",
      "topic": "convolutional-networks",
      "kind": "comparison"
    },
    {
      "front": "RNN vs LSTM",
      "back": "A plain RNN carries one evolving hidden state and struggles with long-range gradients. LSTM adds gated memory so useful information is easier to preserve.",
      "topic": "sequence-models",
      "kind": "comparison"
    },
    {
      "front": "LSTM vs Transformer",
      "back": "LSTM improves memory in recurrent sequence processing, while Transformer uses attention as the main computation and scales better for large modern language tasks.",
      "topic": "sequence-models",
      "kind": "comparison"
    },
    {
      "front": "Content-based vs collaborative filtering",
      "back": "Content-based recommendation relies on item features. Collaborative filtering relies on patterns of user-item behavior across the population.",
      "topic": "recommendation-systems",
      "kind": "comparison"
    },
    {
      "front": "LoRA vs RAG",
      "back": "LoRA changes model behavior through cheap trainable adapters. RAG injects retrieved documents at inference time and is usually better for fresh or source-grounded facts.",
      "topic": "generative-ai",
      "kind": "comparison"
    },
    {
      "front": "Greedy decoding vs top-p sampling",
      "back": "Greedy always takes the highest-probability token. Top-p samples from the smallest token set whose cumulative probability exceeds p, trading some certainty for diversity.",
      "topic": "generative-ai",
      "kind": "comparison"
    },
    {
      "front": "Agglomerative clustering",
      "back": "A hierarchical clustering method that starts with each point as its own cluster and repeatedly merges the closest pair.",
      "topic": "unsupervised-learning",
      "kind": "glossary"
    },
    {
      "front": "Centroid",
      "back": "The mean of the points assigned to a cluster in K-means.",
      "topic": "unsupervised-learning",
      "kind": "glossary"
    },
    {
      "front": "Dendrogram",
      "back": "A tree-like diagram showing the order and height of hierarchical merges.",
      "topic": "unsupervised-learning",
      "kind": "glossary"
    },
    {
      "front": "Inertia",
      "back": "The within-cluster sum of squared distances minimized by K-means.",
      "topic": "unsupervised-learning",
      "kind": "glossary"
    },
    {
      "front": "Principal component",
      "back": "A direction in feature space that captures as much variance as possible subject to orthogonality constraints.",
      "topic": "unsupervised-learning",
      "kind": "glossary"
    },
    {
      "front": "t-SNE",
      "back": "A nonlinear visualization method that preserves local neighborhoods better than global geometry.",
      "topic": "unsupervised-learning",
      "kind": "glossary"
    },
    {
      "front": "Activation function",
      "back": "A nonlinearity applied after an affine transformation so stacked layers can represent nonlinear structure.",
      "topic": "neural-networks-foundations",
      "kind": "glossary"
    },
    {
      "front": "Backpropagation",
      "back": "Efficient chain-rule computation of gradients through a layered network.",
      "topic": "neural-networks-foundations",
      "kind": "glossary"
    },
    {
      "front": "Cross-entropy",
      "back": "A loss that penalizes assigning low probability to the correct class and is standard for classification.",
      "topic": "neural-networks-foundations",
      "kind": "glossary"
    },
    {
      "front": "Dropout",
      "back": "A regularization method that randomly zeros some units during training to reduce co-adaptation.",
      "topic": "neural-networks-foundations",
      "kind": "glossary"
    },
    {
      "front": "Learning rate",
      "back": "The step size used when updating parameters with gradient-based optimization.",
      "topic": "neural-networks-foundations",
      "kind": "glossary"
    },
    {
      "front": "ReLU",
      "back": "The rectified linear unit max(0, x), a common hidden-layer activation in modern deep learning.",
      "topic": "neural-networks-foundations",
      "kind": "glossary"
    },
    {
      "front": "Batch normalization",
      "back": "A normalization layer that stabilizes hidden activations and often makes deep networks easier to optimize.",
      "topic": "convolutional-networks",
      "kind": "glossary"
    },
    {
      "front": "Depthwise separable convolution",
      "back": "A factorized convolution that separates spatial filtering from channel mixing to reduce cost.",
      "topic": "convolutional-networks",
      "kind": "glossary"
    },
    {
      "front": "Receptive field",
      "back": "The region of the original input that can influence a given unit's activation.",
      "topic": "convolutional-networks",
      "kind": "glossary"
    },
    {
      "front": "Residual connection",
      "back": "A shortcut path that lets a block learn a refinement relative to its input, helping deep optimization.",
      "topic": "convolutional-networks",
      "kind": "glossary"
    },
    {
      "front": "Transfer learning",
      "back": "Reusing a model pretrained on a large source task as the starting point for a new target task.",
      "topic": "convolutional-networks",
      "kind": "glossary"
    },
    {
      "front": "Candidate generation",
      "back": "The fast retrieval stage that narrows a huge recommendation catalog into a plausible smaller set.",
      "topic": "recommendation-systems",
      "kind": "glossary"
    },
    {
      "front": "Collaborative filtering",
      "back": "Recommendation based on user-item interaction patterns rather than only explicit item features.",
      "topic": "recommendation-systems",
      "kind": "glossary"
    },
    {
      "front": "Cold start",
      "back": "The difficulty of recommending for new users or new items with little interaction history.",
      "topic": "recommendation-systems",
      "kind": "glossary"
    },
    {
      "front": "Cosine similarity",
      "back": "A similarity measure based on vector angle that is common in content-based recommendation and text features.",
      "topic": "recommendation-systems",
      "kind": "glossary"
    },
    {
      "front": "Matrix factorization",
      "back": "A latent-factor model that learns low-dimensional user and item vectors whose alignment predicts preference.",
      "topic": "recommendation-systems",
      "kind": "glossary"
    },
    {
      "front": "MRR",
      "back": "Mean Reciprocal Rank, a metric that emphasizes how early the first relevant result appears.",
      "topic": "recommendation-systems",
      "kind": "glossary"
    },
    {
      "front": "nDCG",
      "back": "Normalized Discounted Cumulative Gain, a ranking metric that rewards placing relevant items near the top.",
      "topic": "recommendation-systems",
      "kind": "glossary"
    },
    {
      "front": "Attention",
      "back": "A mechanism that learns where to look by weighting other positions according to contextual relevance.",
      "topic": "sequence-models",
      "kind": "glossary"
    },
    {
      "front": "Encoder-decoder",
      "back": "A sequence architecture in which one module reads the input sequence and another generates the output sequence.",
      "topic": "sequence-models",
      "kind": "glossary"
    },
    {
      "front": "Exploding gradient",
      "back": "A gradient that grows too large across many time steps or layers, destabilizing training.",
      "topic": "sequence-models",
      "kind": "glossary"
    },
    {
      "front": "LSTM",
      "back": "A gated recurrent architecture that controls memory with forget, input, and output gates.",
      "topic": "sequence-models",
      "kind": "glossary"
    },
    {
      "front": "Teacher forcing",
      "back": "Training a decoder by feeding the true previous token rather than the model's own previous prediction.",
      "topic": "sequence-models",
      "kind": "glossary"
    },
    {
      "front": "Transformer",
      "back": "An architecture that uses attention as the main sequence-processing mechanism and scales well to large tasks.",
      "topic": "sequence-models",
      "kind": "glossary"
    },
    {
      "front": "Autoregressive model",
      "back": "A model that generates a sequence step by step by conditioning each token on the previous context.",
      "topic": "generative-ai",
      "kind": "glossary"
    },
    {
      "front": "BLEU",
      "back": "A classic overlap-based text generation metric that can miss semantic equivalence.",
      "topic": "generative-ai",
      "kind": "glossary"
    },
    {
      "front": "Diffusion model",
      "back": "A generative model that learns to reverse a gradual noising process.",
      "topic": "generative-ai",
      "kind": "glossary"
    },
    {
      "front": "In-context learning",
      "back": "Task adaptation from examples placed inside the prompt without updating model weights.",
      "topic": "generative-ai",
      "kind": "glossary"
    },
    {
      "front": "Instruction tuning",
      "back": "Supervised fine-tuning on instruction-response pairs so a model behaves more helpfully as an assistant.",
      "topic": "generative-ai",
      "kind": "glossary"
    },
    {
      "front": "KV cache",
      "back": "Stored attention keys and values from earlier tokens that reduce recomputation during autoregressive decoding.",
      "topic": "generative-ai",
      "kind": "glossary"
    },
    {
      "front": "LoRA",
      "back": "Low-Rank Adaptation, a parameter-efficient way to fine-tune very large models.",
      "topic": "generative-ai",
      "kind": "glossary"
    },
    {
      "front": "RAG",
      "back": "Retrieval-Augmented Generation, which supplies external documents at inference time for grounding or freshness.",
      "topic": "generative-ai",
      "kind": "glossary"
    },
    {
      "front": "RLHF",
      "back": "Reinforcement Learning from Human Feedback, an alignment pipeline that optimizes outputs toward human preferences.",
      "topic": "generative-ai",
      "kind": "glossary"
    },
    {
      "front": "Tokenization",
      "back": "The process of splitting text into tokens such as words, subwords, punctuation, or special units.",
      "topic": "generative-ai",
      "kind": "glossary"
    },
    {
      "front": "Unsupervised: Euclidean distance",
      "back": "This measures straight-line separation between two points in feature space. If one feature has a much larger scale than the others, it dominates this distance and can distort the geometry the algorithm sees.",
      "topic": "unsupervised-learning",
      "kind": "equation"
    },
    {
      "front": "Unsupervised: K-means objective",
      "back": "K-means tries to keep every point close to the centroid of the cluster it belongs to. This is why K-means prefers compact, roughly round clusters and can struggle with stretched or curved ones.",
      "topic": "unsupervised-learning",
      "kind": "equation"
    },
    {
      "front": "Unsupervised: Covariance viewpoint for PCA",
      "back": "PCA studies the covariance structure of centered data and finds directions of maximum variance. You can think of PCA as rotating the coordinate system so the most informative directions come first.",
      "topic": "unsupervised-learning",
      "kind": "equation"
    },
    {
      "front": "NN Foundations: Affine layer",
      "back": "A dense layer first computes a weighted sum plus a bias. By itself this is only an affine transformation. The extra expressive power comes from what happens after it.",
      "topic": "neural-networks-foundations",
      "kind": "equation"
    },
    {
      "front": "NN Foundations: Activation step",
      "back": "The activation applies a nonlinearity to the pre-activation vector. Without this step, several layers in a row would still collapse into one linear transformation.",
      "topic": "neural-networks-foundations",
      "kind": "equation"
    },
    {
      "front": "NN Foundations: Gradient descent update",
      "back": "Parameters move in the direction that locally reduces the loss. The learning rate \\(\\eta\\) controls how aggressive the step is. Too small is slow; too large can bounce or diverge.",
      "topic": "neural-networks-foundations",
      "kind": "equation"
    },
    {
      "front": "NN Foundations: Mean squared error",
      "back": "MSE averages squared prediction error for regression targets. Large mistakes are punished more heavily than small mistakes, which is useful when numeric error size matters.",
      "topic": "neural-networks-foundations",
      "kind": "equation"
    },
    {
      "front": "CNNs: Convolution output size",
      "back": "This gives the output length of one spatial dimension after convolution. Padding grows the effective input, larger filters consume more space, and stride samples fewer positions.",
      "topic": "convolutional-networks",
      "kind": "equation"
    },
    {
      "front": "CNNs: Convolution parameter count",
      "back": "This counts weights and biases in a standard 2D convolution layer. The key difference from a dense layer is that the same filter weights are reused across spatial locations.",
      "topic": "convolutional-networks",
      "kind": "equation"
    },
    {
      "front": "CNNs: Residual block idea",
      "back": "A residual block learns a correction on top of an identity path. This helps very deep networks refine representations instead of rebuilding them from scratch every layer.",
      "topic": "convolutional-networks",
      "kind": "equation"
    },
    {
      "front": "Recommendation: Bias baseline",
      "back": "A strong baseline prediction includes the global mean plus user and item biases. Some users systematically rate high or low, and some items are broadly popular or unpopular even before latent taste factors enter.",
      "topic": "recommendation-systems",
      "kind": "equation"
    },
    {
      "front": "Recommendation: Latent factor model",
      "back": "The interaction between user and item embeddings estimates how well they fit in latent taste space. The dot product becomes large when the user vector aligns well with the item's hidden factors.",
      "topic": "recommendation-systems",
      "kind": "equation"
    },
    {
      "front": "Recommendation: Precision at K",
      "back": "This tells us how concentrated the top of the ranking is with useful items. Recommendation quality depends heavily on what appears near the top because users rarely inspect the entire list.",
      "topic": "recommendation-systems",
      "kind": "equation"
    },
    {
      "front": "Sequence Models: RNN state update",
      "back": "A recurrent model updates its hidden state from the current input and the previous state. The hidden state is trying to summarize the relevant past, but in a plain RNN that memory path is fragile over long ranges.",
      "topic": "sequence-models",
      "kind": "equation"
    },
    {
      "front": "Sequence Models: LSTM memory update",
      "back": "The cell state keeps part of the old memory and writes selected new content. This is why LSTM can preserve important information more stably than a plain recurrent update.",
      "topic": "sequence-models",
      "kind": "equation"
    },
    {
      "front": "Sequence Models: Scaled dot-product attention",
      "back": "Attention scores how strongly a query should use each key, then mixes the values using those normalized weights. It is a learned relevance lookup: matching decides where to look, and values provide the content to aggregate.",
      "topic": "sequence-models",
      "kind": "equation"
    },
    {
      "front": "Generative AI: Autoregressive factorization",
      "back": "A full sequence probability is decomposed into next-token predictions conditioned on previous context. This is why a language model can generate long outputs from one repeated local skill: predicting what should come next.",
      "topic": "generative-ai",
      "kind": "equation"
    },
    {
      "front": "Generative AI: Softmax with temperature intuition",
      "back": "Temperature rescales logits before softmax, changing how sharp or flat the sampling distribution becomes. Lower temperature makes the model more conservative. Higher temperature makes it more diverse but also more prone to drift.",
      "topic": "generative-ai",
      "kind": "equation"
    },
    {
      "front": "Generative AI: Diffusion story",
      "back": "The forward process gradually corrupts clean data with noise, and the learned reverse process removes it step by step. Diffusion works by solving many small denoising tasks instead of one giant jump from randomness to a finished image.",
      "topic": "generative-ai",
      "kind": "equation"
    }
  ],
  "compareDecks": [
    {
      "prompt": "K-means vs hierarchical clustering",
      "answer": "K-means gives a flat partition with chosen k and centroid-based compact clusters, while hierarchical clustering gives a merge tree and lets you inspect structure at several cut levels.",
      "topic": "unsupervised-learning"
    },
    {
      "prompt": "PCA vs t-SNE",
      "answer": "PCA is linear, variance-based, and useful for compression or preprocessing. t-SNE is nonlinear, neighborhood-preserving, and mainly for visualization.",
      "topic": "unsupervised-learning"
    },
    {
      "prompt": "Classification loss vs regression loss",
      "answer": "Cross-entropy is standard when predicting class probabilities. MSE is standard when predicting continuous numeric targets.",
      "topic": "neural-networks-foundations"
    },
    {
      "prompt": "MLP vs CNN",
      "answer": "An MLP treats the input as an unordered vector. A CNN encodes locality and parameter sharing, making it far better for images and grids.",
      "topic": "convolutional-networks"
    },
    {
      "prompt": "RNN vs LSTM",
      "answer": "A plain RNN carries one evolving hidden state and struggles with long-range gradients. LSTM adds gated memory so useful information is easier to preserve.",
      "topic": "sequence-models"
    },
    {
      "prompt": "LSTM vs Transformer",
      "answer": "LSTM improves memory in recurrent sequence processing, while Transformer uses attention as the main computation and scales better for large modern language tasks.",
      "topic": "sequence-models"
    },
    {
      "prompt": "Content-based vs collaborative filtering",
      "answer": "Content-based recommendation relies on item features. Collaborative filtering relies on patterns of user-item behavior across the population.",
      "topic": "recommendation-systems"
    },
    {
      "prompt": "LoRA vs RAG",
      "answer": "LoRA changes model behavior through cheap trainable adapters. RAG injects retrieved documents at inference time and is usually better for fresh or source-grounded facts.",
      "topic": "generative-ai"
    },
    {
      "prompt": "Greedy decoding vs top-p sampling",
      "answer": "Greedy always takes the highest-probability token. Top-p samples from the smallest token set whose cumulative probability exceeds p, trading some certainty for diversity.",
      "topic": "generative-ai"
    }
  ],
  "glossary": [
    {
      "term": "Agglomerative clustering",
      "definition": "A hierarchical clustering method that starts with each point as its own cluster and repeatedly merges the closest pair.",
      "topic": "unsupervised-learning"
    },
    {
      "term": "Centroid",
      "definition": "The mean of the points assigned to a cluster in K-means.",
      "topic": "unsupervised-learning"
    },
    {
      "term": "Dendrogram",
      "definition": "A tree-like diagram showing the order and height of hierarchical merges.",
      "topic": "unsupervised-learning"
    },
    {
      "term": "Inertia",
      "definition": "The within-cluster sum of squared distances minimized by K-means.",
      "topic": "unsupervised-learning"
    },
    {
      "term": "Principal component",
      "definition": "A direction in feature space that captures as much variance as possible subject to orthogonality constraints.",
      "topic": "unsupervised-learning"
    },
    {
      "term": "t-SNE",
      "definition": "A nonlinear visualization method that preserves local neighborhoods better than global geometry.",
      "topic": "unsupervised-learning"
    },
    {
      "term": "Activation function",
      "definition": "A nonlinearity applied after an affine transformation so stacked layers can represent nonlinear structure.",
      "topic": "neural-networks-foundations"
    },
    {
      "term": "Backpropagation",
      "definition": "Efficient chain-rule computation of gradients through a layered network.",
      "topic": "neural-networks-foundations"
    },
    {
      "term": "Cross-entropy",
      "definition": "A loss that penalizes assigning low probability to the correct class and is standard for classification.",
      "topic": "neural-networks-foundations"
    },
    {
      "term": "Dropout",
      "definition": "A regularization method that randomly zeros some units during training to reduce co-adaptation.",
      "topic": "neural-networks-foundations"
    },
    {
      "term": "Learning rate",
      "definition": "The step size used when updating parameters with gradient-based optimization.",
      "topic": "neural-networks-foundations"
    },
    {
      "term": "ReLU",
      "definition": "The rectified linear unit max(0, x), a common hidden-layer activation in modern deep learning.",
      "topic": "neural-networks-foundations"
    },
    {
      "term": "Batch normalization",
      "definition": "A normalization layer that stabilizes hidden activations and often makes deep networks easier to optimize.",
      "topic": "convolutional-networks"
    },
    {
      "term": "Depthwise separable convolution",
      "definition": "A factorized convolution that separates spatial filtering from channel mixing to reduce cost.",
      "topic": "convolutional-networks"
    },
    {
      "term": "Receptive field",
      "definition": "The region of the original input that can influence a given unit's activation.",
      "topic": "convolutional-networks"
    },
    {
      "term": "Residual connection",
      "definition": "A shortcut path that lets a block learn a refinement relative to its input, helping deep optimization.",
      "topic": "convolutional-networks"
    },
    {
      "term": "Transfer learning",
      "definition": "Reusing a model pretrained on a large source task as the starting point for a new target task.",
      "topic": "convolutional-networks"
    },
    {
      "term": "Candidate generation",
      "definition": "The fast retrieval stage that narrows a huge recommendation catalog into a plausible smaller set.",
      "topic": "recommendation-systems"
    },
    {
      "term": "Collaborative filtering",
      "definition": "Recommendation based on user-item interaction patterns rather than only explicit item features.",
      "topic": "recommendation-systems"
    },
    {
      "term": "Cold start",
      "definition": "The difficulty of recommending for new users or new items with little interaction history.",
      "topic": "recommendation-systems"
    },
    {
      "term": "Cosine similarity",
      "definition": "A similarity measure based on vector angle that is common in content-based recommendation and text features.",
      "topic": "recommendation-systems"
    },
    {
      "term": "Matrix factorization",
      "definition": "A latent-factor model that learns low-dimensional user and item vectors whose alignment predicts preference.",
      "topic": "recommendation-systems"
    },
    {
      "term": "MRR",
      "definition": "Mean Reciprocal Rank, a metric that emphasizes how early the first relevant result appears.",
      "topic": "recommendation-systems"
    },
    {
      "term": "nDCG",
      "definition": "Normalized Discounted Cumulative Gain, a ranking metric that rewards placing relevant items near the top.",
      "topic": "recommendation-systems"
    },
    {
      "term": "Attention",
      "definition": "A mechanism that learns where to look by weighting other positions according to contextual relevance.",
      "topic": "sequence-models"
    },
    {
      "term": "Encoder-decoder",
      "definition": "A sequence architecture in which one module reads the input sequence and another generates the output sequence.",
      "topic": "sequence-models"
    },
    {
      "term": "Exploding gradient",
      "definition": "A gradient that grows too large across many time steps or layers, destabilizing training.",
      "topic": "sequence-models"
    },
    {
      "term": "LSTM",
      "definition": "A gated recurrent architecture that controls memory with forget, input, and output gates.",
      "topic": "sequence-models"
    },
    {
      "term": "Teacher forcing",
      "definition": "Training a decoder by feeding the true previous token rather than the model's own previous prediction.",
      "topic": "sequence-models"
    },
    {
      "term": "Transformer",
      "definition": "An architecture that uses attention as the main sequence-processing mechanism and scales well to large tasks.",
      "topic": "sequence-models"
    },
    {
      "term": "Autoregressive model",
      "definition": "A model that generates a sequence step by step by conditioning each token on the previous context.",
      "topic": "generative-ai"
    },
    {
      "term": "BLEU",
      "definition": "A classic overlap-based text generation metric that can miss semantic equivalence.",
      "topic": "generative-ai"
    },
    {
      "term": "Diffusion model",
      "definition": "A generative model that learns to reverse a gradual noising process.",
      "topic": "generative-ai"
    },
    {
      "term": "In-context learning",
      "definition": "Task adaptation from examples placed inside the prompt without updating model weights.",
      "topic": "generative-ai"
    },
    {
      "term": "Instruction tuning",
      "definition": "Supervised fine-tuning on instruction-response pairs so a model behaves more helpfully as an assistant.",
      "topic": "generative-ai"
    },
    {
      "term": "KV cache",
      "definition": "Stored attention keys and values from earlier tokens that reduce recomputation during autoregressive decoding.",
      "topic": "generative-ai"
    },
    {
      "term": "LoRA",
      "definition": "Low-Rank Adaptation, a parameter-efficient way to fine-tune very large models.",
      "topic": "generative-ai"
    },
    {
      "term": "RAG",
      "definition": "Retrieval-Augmented Generation, which supplies external documents at inference time for grounding or freshness.",
      "topic": "generative-ai"
    },
    {
      "term": "RLHF",
      "definition": "Reinforcement Learning from Human Feedback, an alignment pipeline that optimizes outputs toward human preferences.",
      "topic": "generative-ai"
    },
    {
      "term": "Tokenization",
      "definition": "The process of splitting text into tokens such as words, subwords, punctuation, or special units.",
      "topic": "generative-ai"
    }
  ],
  "studyPath": [
    {
      "title": "Phase 1: Build intuition",
      "description": "Start with the overview cards and chapter introductions so each topic feels familiar before you push into details.",
      "actions": [
        "Read the chapter intro and the first three sections of each topic.",
        "Use the glossary whenever a term feels slippery.",
        "Answer the warm-up questions out loud before moving on."
      ]
    },
    {
      "title": "Phase 2: Deep reading",
      "description": "Work section by section through the long-form documents. Focus on why each method exists, not only its definition.",
      "actions": [
        "Use the Reader view and mark sections as studied.",
        "Pause after every major method and explain it in your own words.",
        "Check the exam traps panel before leaving each topic."
      ]
    },
    {
      "title": "Phase 3: Active recall",
      "description": "Switch from consuming content to retrieving it from memory.",
      "actions": [
        "Use Flashcards and Random Recall mode daily.",
        "Take the topic quizzes without opening the answer first.",
        "Use the comparison deck to practice explaining differences clearly."
      ]
    },
    {
      "title": "Phase 4: Exam rehearsal",
      "description": "Practice pressure, not just knowledge.",
      "actions": [
        "Run Random Exam Mode with mixed topics.",
        "Do the interactive labs to test formulas and intuition.",
        "Use the cram sheet only after you have already attempted recall."
      ]
    }
  ],
  "searchIndex": [
    {
      "kind": "chapter",
      "topic": "unsupervised-learning",
      "title": "4 Unsupervised Learning",
      "body": "Unsupervised learning studies data without using explicit target labels. In supervised learning, the training data tells us what the correct answer is for each example. In unsupervised learning, the data gives us only the observations themselves. We are asked to find structure, organization, regularity, or lower-dimensional patterns hidden inside that data. This makes unsupervised learning intellectually attractive because it often feels closer to scientific discovery than to ordinary classification. At the same time, it is more ambiguous, because there is often no single perfect answer to compare against. In this chapter, the main topics are clustering and dimensionality reduction. The specific methods emphasized by the course are K-means clustering, hierarchical agglomerative clustering, Principal Component Analysis (PCA), and t-distributed Stochastic Neighbor Embedding (t-SNE). The lecture slides and homework use these methods for practical data analysis, but to understand them deeply it is useful to step back and study the ideas beneath them: similarity, distance, geometry, variance, and representation. Clustering and dimensionality reduction answer different questions: clusters group nearby points, while PCA rotates the coordinate system to keep the most informative directions. The broad goal of unsupervised learning is to discover useful structure in a dataset. &quot;Useful structure&quot; can mean several different things. Sometimes we want to divide points into groups, as in customer segmentation or image segmentation. Sometimes we want to compress many variables into a few summary variables, as in PCA. Sometimes we want to visualize high-dimensional data in a way that helps a human analyst understand it. Sometimes we want to learn latent representations that later become inputs to a supervised model. A practical way to think about unsupervised learning is this: the data has internal organization even before labels are attached, and unsupervised methods try to make that organization visible. Students often confuse clustering and dimensionality reduction because both are studied in the same chapter and both often end with colorful plots. However, they solve different problems. Clustering asks, &quot;Which points belong together?&quot; It produces group assignments or a merge structure. Dimensionality reduction asks, &quot;How can I describe the same points with fewer coordinates?&quot; It produces a new representation of the same data, usually in fewer dimensions. These tasks often work together. For example, one may cluster data first and then use PCA to visualize the clusters. Or one may reduce dimension before clustering to remove noise and improve numerical behavior. But conceptually they are not the same thing. A strong exam answer should be able to explain this distinction clearly. Most unsupervised methods rely on some notion of similarity or distance. If two points are close in feature space, many clustering methods will prefer to place them in the same cluster. If a direction in feature space captures strong variation, PCA will consider it important. If local neighborhoods are preserved, t-SNE will consider the visualization successful. The most common distance used in this course is Euclidean distance. If \\(x\\) and \\(y\\) are two data vectors, their Euclidean distance is: \\[d(x, y) = \\sqrt{\\sum_i (x_i - y_i)^2}\\] This formula looks simple, but it has important consequences. Distance is not merely a geometric quantity; it depends on the representation of the data. If we change the feature scaling, the geometry changes. If we add noisy or irrelevant dimensions, the geometry changes. If two features carry the same information in different units, the geometry may become misleading unless the data is normalized. Suppose a dataset has two features. The first feature ranges roughly from 0 to 1. The second ranges from 0 to 1,000,000. If we compute Euclidean distance directly, then the second feature almost completely dominates the distance. The first feature may be highly informative, but numerically it becomes almost invisible. This is why normalization is central in clustering. The homework on clustering makes this concrete by comparing raw and normalized datasets and showing that cluster quality and even the chosen number of clusters may change. A good mental rule is that whenever a method depends on distance, feature scale must be examined carefully before trusting the output. Normalization can be done in different ways. Standardization using z-scores makes each feature have mean 0 and variance 1. Min-max scaling maps features into a fixed range such as [0, 1] . The exact choice depends on context, but the principle is the same: do not let arbitrary units distort the geometry of the space. As the number of dimensions grows, distance behaves less intuitively. High-dimensional spaces have a tendency to make many points look similarly far from one another. This phenomenon is one part of what is often called the curse of dimensionality. In such settings, nearest-neighbor relationships can become noisy, intuition from two-dimensional geometry breaks down, and methods that rely strongly on distance may become unstable. This is one reason dimensionality reduction methods are useful even before visualization. By compressing data into a smaller and more meaningful representation, they may improve both interpretation and downstream modeling. Clustering is the task of dividing data points into groups called clusters. Informally, points in the same cluster should be more similar to one another than to points in different clusters. The challenge is that the phrase &quot;more similar&quot; depends on a modeling assumption. Some algorithms assume clusters are compact and spherical. Others are more flexible. Some methods emphasize density, others emphasize variance, and still others emphasize connectivity. In the final-exam scope, the most important clustering methods are K-means and hierarchical agglomerative clustering. K-means is one of the simplest and most widely used clustering algorithms. It assumes that the data can be partitioned into \\(k\\) clusters, where \\(k\\) is chosen in advance. Each cluster is represented by a centroid, which is simply the mean of the points assigned to that cluster. The algorithm proceeds by alternating between two steps: assign each point to the nearest centroid recompute each centroid as the mean of the points assigned to it This repeated assign-then-average procedure is often called Lloyd&#x27;s algorithm. The scikit-learn documentation explicitly describes KMeans as &quot;K-Means clustering&quot; and notes that it produces cluster centers, labels, and inertia values. 4.7.1 The Objective Function K-means is not just a heuristic; it is optimizing a specific objective. The objective is the within-cluster sum of squared distances: \\[\\sum_i \\lVert x_i - \\mu_{c_i} \\rVert^2\\] Here \\(x_i\\) is a data point, \\(c_i\\) is the cluster assigned to that point, and mu_{c_i} is the centroid of that cluster. The algorithm tries to make each point close to its own cluster center. This objective explains why K-means tends to prefer compact clusters. If a cluster is stretched out, curved, or has multiple disconnected parts, one centroid may not summarize it well. 4.7.2 Why the Mean Appears The centroid is the mean because, under squared Euclidean distance, the mean is the point that minimizes the total squared distance to all assigned samples. This is a deep and elegant fact. It means the averaging step is not arbitrary; it is exactly the correct update for the chosen objective. 4.7.3 Initialization K-means can converge to different local minima depending on how the initial centroids are chosen. The scikit-learn documentation notes several initialization strategies, including k-means++ , which is designed to pick better initial centers and often speeds up convergence. It also recommends multiple restarts because K-means can fall into local minima. This is an important practical point. If two students run K-means and obtain slightly different answers, this does not necessarily mean one of them made a mistake. The initialization itself may have changed the outcome. 4.7.4 Convergence Each iteration of K-means does not increase the objective, so the algorithm will eventually stop. However, it does not guarantee the globally best solution. It guarantees only convergence to a local optimum under the chosen initialization. The scikit-learn documentation also notes that the average complexity is fast in practice, which helps explain why K-means remains one of the most popular clustering methods despite its limitations. 4.7.5 A Worked Example Suppose we have six points in two dimensions: (1,2), (1,4), (1,0), (10,2), (10,4), (10,0) If we choose \\(k = 2\\), then one natural clustering is the left group and the right group. The centroid of the left group is (1,2) and the centroid of the right group is (10,2) . This example appears in the KMeans documentation and is useful because the groups are very clean. But exam questions may give messier examples. In those cases, you should still think in the same way: which centroid is closest, and what is the mean of the assigned points? 4.7.6 Strengths of K-Means K-means is easy to understand, fast, and often works well on data with compact, roughly spherical clusters. It is a strong baseline and a common first method to try. 4.7.7 Weaknesses of K-Means K-means is sensitive to outliers because the centroid is the mean. It is sensitive to feature scale because it relies on Euclidean distance. It requires \\(k\\) in advance. It may converge to a local minimum. It also assumes a cluster shape that is often too simple for real data. The scikit-learn documentation explicitly includes examples on K-means assumptions and common problems. That is a useful reminder that the algorithm should never be treated as universally reliable. The lecture repeatedly uses the elbow method. To apply it, we run K-means for multiple values of \\(k\\) and plot inertia as a function of \\(k\\). Since inertia always decreases as \\(k\\) grows, we do not simply pick the smallest inertia. Instead, we look for the point where additional clusters stop giving large improvement. This bend in the curve is called the elbow. The elbow method is a heuristic. Some datasets show a clear elbow, while others do not. In the latter case, the correct intellectual response is not to pretend certainty. A better answer is to say that the evidence for a particular \\(k\\) is weak and should be supported by additional reasoning. Another internal evaluation measure is the silhouette score. Silhouette compares how close a point is to its own cluster relative to neighboring clusters. A higher score suggests better separation. Like inertia, it is informative but not absolute. Hierarchical clustering preserves merge history in a dendrogram, while t-SNE builds a neighborhood-preserving visualization whose global spacing should be interpreted carefully. Hierarchical agglomerative clustering takes a different approach. Instead of specifying centroids and moving them, the method begins with each data point as its own cluster. It then repeatedly merges the closest pair of clusters until everything becomes one large cluster. The result is not only a final grouping but also a complete history of how the merges happened. This is one of the greatest advantages of hierarchical clustering: it gives a multiscale view of structure rather than a single flat partition. The merge history of hierarchical clustering is shown using a dendrogram. Each merge has a height. Lower merges indicate that the clusters were very similar when they were joined. Higher merges indicate that the algorithm had to join more dissimilar groups. When interpreting a dendrogram, we often look for a large vertical jump. Cutting the tree below that jump can produce a plausible number of clusters. But again, this is a heuristic. The dendrogram is a tool for reasoning, not a proof that one number of clusters is uniquely correct. To merge clusters, the algorithm needs a definition of distance between clusters. This is called linkage. Single linkage uses the smallest pairwise distance between points from the two clusters. It can create chaining effects, where one close bridge causes long thin structures to merge. Complete linkage uses the largest pairwise distance. This tends to create tighter clusters. Average linkage uses the average distance between all pairs across the two clusters. Ward linkage minimizes the increase in within-cluster variance when clusters are merged. The scikit-learn clustering guide explicitly notes that Ward hierarchical clustering is similar in spirit to the K-means objective because it is variance-oriented. This is an important connection: Ward linkage favors compact clusters much as K-means does. The scikit-learn clustering guide also warns that certain connectivity constraints and linkage choices can create a &quot;rich getting richer&quot; effect, especially in agglomerative clustering. This is a subtle but useful reminder that even hierarchical methods are not neutral; their design choices influence what structures become visible. K-means is usually faster, simpler, and more directly tied to centroid-based clustering. Hierarchical clustering is often richer for exploratory analysis because it gives a full merge tree and does not require the number of clusters up front. However, hierarchical methods may be computationally heavier, and their result can depend strongly on the chosen linkage. If an exam asks which is better, the safest high-quality answer is to compare assumptions, output type, and use case rather than making an absolute judgment. Principal Component Analysis is a dimensionality reduction method. It does not cluster points. Instead, it creates new axes called principal components so that the data can be represented more compactly. The scikit-learn decomposition guide describes PCA as decomposing a multivariate dataset into successive orthogonal components that explain a maximum amount of variance. This is an excellent formal summary and worth remembering. Imagine a cloud of points in two dimensions that forms a long diagonal ellipse. The original axes may be horizontal and vertical, but the data really varies most along the diagonal direction. PCA rotates the coordinate system so that the first axis points along the direction of greatest variance. This first axis is the first principal component, or PC1. The second principal component, PC2, is orthogonal to PC1 and captures the largest remaining variance. In higher dimensions, the process continues in the same way. At a slightly deeper mathematical level, PCA can be understood through the covariance matrix of the centered data. The eigenvectors of that covariance matrix define the principal directions, and the eigenvalues tell us how much variance is explained along each direction. This is why PCA is not just a visualization trick. It is a precise geometric procedure for identifying important axes of variation. In practice, PCA is often computed using Singular Value Decomposition, or SVD. The scikit-learn PCA documentation explicitly states that PCA performs linear dimensionality reduction using SVD of the centered data. This is useful because SVD is numerically stable and computationally effective. The important conceptual message is that PCA finds a lower-dimensional representation that preserves variance as much as possible in a linear sense. Each principal component explains some amount of variance. The explained variance ratio tells us what fraction of the total variance is captured by each component. If the first two components explain most of the variance, then projecting to two dimensions may preserve a large amount of the information in the data. This is why PCA is often used before plotting. A 13-dimensional dataset cannot be directly visualized by a human, but a two-dimensional PCA projection may still reveal much of its broad structure. PCA does not use class labels. PCA does not discover clusters directly. PCA does not preserve arbitrary nonlinear manifolds. PCA finds linear directions of high variance. This is enough to be very useful, but it is essential not to overclaim what PCA is doing. A very common mistake is to look at a PCA plot with visually separate groups and then say, &quot;PCA clustered the data.&quot; That is incorrect. PCA may have made separation visible, but the grouping itself is not created by PCA. The scikit-learn documentation notes that PCA centers the data but does not scale each feature automatically. It also offers a whitening option. Whitening makes the transformed components have unit variance, which can help downstream algorithms that assume isotropic input. This is especially relevant because the documentation explicitly mentions that whitening can be useful before K-means. This is a beautiful connection between dimensionality reduction and clustering. PCA is not only for visualization; it can sometimes improve the numerical behavior of later clustering steps. t-SNE is a nonlinear dimensionality reduction method mainly used for visualization. The original JMLR paper &quot;Visualizing Data using t-SNE&quot; presents it as a method for giving each high-dimensional point a location in a low-dimensional map so that local similarities are preserved. The important word here is local. t-SNE is built to preserve neighborhood relationships more than global geometry. If two points are near each other in the original high-dimensional space, t-SNE tries hard to place them near each other in the low-dimensional plot. t-SNE often produces visually striking plots in which apparent clusters seem to separate beautifully. This is one reason the method became so popular in exploratory analysis. It can reveal local structure that PCA does not show clearly. However, this same visual success can mislead students. A t-SNE plot is not a literal map of global geometry. The distances between large clusters may not carry direct meaning. The relative size of clusters may be misleading. Empty space between groups does not always imply strong true separation in the original space. t-SNE has a parameter called perplexity, which roughly controls the effective neighborhood size used when defining local similarities. Small perplexity emphasizes very local structure. Larger perplexity takes a broader view. This helps explain why different t-SNE plots of the same dataset may look different. The algorithm is not just plotting fixed geometry; it is balancing local neighborhood relationships under a nonlinear objective. PCA is linear, variance-based, and relatively easy to interpret mathematically. t-SNE is nonlinear, neighborhood-preserving, and mainly intended for visualization. PCA is often useful for preprocessing, compression, or downstream modeling. t-SNE is primarily useful for human inspection. A good exam answer should not merely say that t-SNE is &quot;better&quot; because it gives prettier pictures. The correct answer is that it serves a different purpose and is especially good at visualizing local structure. When analyzing an unlabeled dataset in the spirit of this course, a sensible workflow is: inspect the features and their scales normalize when appropriate try a simple clustering method such as K-means evaluate cluster quality using inertia, silhouette, or visual reasoning use hierarchical clustering if merge structure is important use PCA for dimension reduction and broad geometric interpretation use t-SNE only as a visualization aid and interpret it carefully This workflow is valuable because it reflects how the lecture, the notebook, and practical machine learning interact. The exam is likely to reward this kind of structured reasoning. Students often assume that the smallest inertia gives the best K-means solution. That is false because inertia always decreases as \\(k\\) increases. Students may also say that PCA clusters the data. That is false because PCA only transforms the coordinate system. Another common mistake is to trust t-SNE too literally, as though it preserved all distances exactly. It does not. Finally, students sometimes ignore normalization even though the course materials repeatedly show that scale can dominate clustering outcomes. Unsupervised learning seeks structure without labels. In the final-exam scope, the key tools are K-means, hierarchical agglomerative clustering, PCA, and t-SNE. K-means partitions data using centroids and minimizes within-cluster squared distance. Hierarchical clustering builds a merge tree summarized by a dendrogram. PCA finds orthogonal directions of maximum variance using linear algebra, while t-SNE produces nonlinear visualizations that preserve local neighborhoods. The central lessons of the chapter are that geometry matters, scale matters, assumptions matter, and interpretation matters. scikit-learn clustering user guide: https://scikit-learn.org/stable/modules/clustering.html scikit-learn KMeans documentation: https://scikit-learn.org/1.5/modules/generated/sklearn.cluster.KMeans.html scikit-learn PCA documentation and decomposition guide: https://scikit-learn.org/1.5/modules/decomposition.html scikit-learn TSNE documentation: https://scikit-learn.org/stable/modules/generated/sklearn.manifold.TSNE.html van der Maaten, L. and Hinton, G. &quot;Visualizing Data using t-SNE&quot;, JMLR 2008: https://www.jmlr.org/papers/v9/vandermaaten08a.html Unsupervised learning is what we do when the data exists but no one hands us the answers. We are trying to notice shape, neighborhoods, compression, and hidden structure before labels tell us what to care about. Imagine a cloud of points floating in space. Clustering asks whether the cloud naturally breaks into neighborhoods. PCA asks whether the cloud is really stretched mostly along a few directions. t-SNE asks how to draw the cloud so nearby points still look nearby to a human. Later deep-learning methods also learn hidden structure, but they often do it implicitly through representation learning instead of explicit clustering or PCA alone. I can explain why clustering and dimensionality reduction are different tasks. I can say exactly why normalization can change K-means results. I can explain the elbow method without pretending it gives exact truth. I can explain why PCA is linear and why t-SNE is mainly for visualization. Euclidean distance This measures straight-line separation between two points in feature space. If one feature has a much larger scale than the others, it dominates this distance and can distort the geometry the algorithm sees. K-means objective K-means tries to keep every point close to the centroid of the cluster it belongs to. This is why K-means prefers compact, roughly round clusters and can struggle with stretched or curved ones. Covariance viewpoint for PCA PCA studies the covariance structure of centered data and finds directions of maximum variance. You can think of PCA as rotating the coordinate system so the most informative directions come first. Why normalization changes clustering Suppose feature A ranges from 0 to 1 and feature B ranges from 0 to 1,000,000. If we use Euclidean distance directly, feature B almost completely controls which points look close. K-means does not know which feature is semantically more important. It only sees geometry. So if the units are wildly different, the algorithm may cluster mainly by whichever feature has the largest numeric scale. Standardization rescales the problem so both features can influence the geometry more fairly. Why PCA is not a clustering algorithm A PCA plot may show visible groups, and students often conclude that PCA found those clusters. What PCA really did was rotate and project the data into variance-maximizing directions. If groups become visible after that projection, PCA helped reveal structure, but it did not assign labels or decide memberships the way K-means or hierarchical clustering does. Why can an unsupervised method produce a useful answer even though there is no label to compare against? Because usefulness can come from revealing structure, compression, or interpretable organization in the data even without a single ground-truth target label. Why does K-means prefer compact clusters instead of arbitrary shapes? Because its objective is based on squared distance to a centroid, so clusters are summarized by one mean point and curved or disconnected shapes are represented poorly. What does a dendrogram give you that K-means does not? A dendrogram gives the full merge history across scales, so you can inspect structure at multiple cut levels rather than committing to one flat partition only. Why might PCA help before clustering even though PCA itself does not cluster? Because PCA can reduce noise or redundant dimensions and create a cleaner lower-dimensional representation for a later clustering method. Why is it dangerous to compare large empty spaces between t-SNE clusters too literally? Because t-SNE is optimized to preserve local neighborhoods, not exact global geometry, so large inter-cluster gaps in the plot can exaggerate separation.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.1 What Unsupervised Learning Tries to Discover",
      "body": "The broad goal of unsupervised learning is to discover useful structure in a dataset. &quot;Useful structure&quot; can mean several different things. Sometimes we want to divide points into groups, as in customer segmentation or image segmentation. Sometimes we want to compress many variables into a few summary variables, as in PCA. Sometimes we want to visualize high-dimensional data in a way that helps a human analyst understand it. Sometimes we want to learn latent representations that later become inputs to a supervised model. A practical way to think about unsupervised learning is this: the data has internal organization even before labels are attached, and unsupervised methods try to make that organization visible.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-01-what-unsupervised-learning-tries-to-discover"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.2 Clustering and Dimensionality Reduction Are Different Tasks",
      "body": "Students often confuse clustering and dimensionality reduction because both are studied in the same chapter and both often end with colorful plots. However, they solve different problems. Clustering asks, &quot;Which points belong together?&quot; It produces group assignments or a merge structure. Dimensionality reduction asks, &quot;How can I describe the same points with fewer coordinates?&quot; It produces a new representation of the same data, usually in fewer dimensions. These tasks often work together. For example, one may cluster data first and then use PCA to visualize the clusters. Or one may reduce dimension before clustering to remove noise and improve numerical behavior. But conceptually they are not the same thing. A strong exam answer should be able to explain this distinction clearly.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-02-clustering-and-dimensionality-reduction-are-different-tasks"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.3 Similarity, Distance, and the Geometry of Data",
      "body": "Most unsupervised methods rely on some notion of similarity or distance. If two points are close in feature space, many clustering methods will prefer to place them in the same cluster. If a direction in feature space captures strong variation, PCA will consider it important. If local neighborhoods are preserved, t-SNE will consider the visualization successful. The most common distance used in this course is Euclidean distance. If \\(x\\) and \\(y\\) are two data vectors, their Euclidean distance is: \\[d(x, y) = \\sqrt{\\sum_i (x_i - y_i)^2}\\] This formula looks simple, but it has important consequences. Distance is not merely a geometric quantity; it depends on the representation of the data. If we change the feature scaling, the geometry changes. If we add noisy or irrelevant dimensions, the geometry changes. If two features carry the same information in different units, the geometry may become misleading unless the data is normalized.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-03-similarity-distance-and-the-geometry-of-data"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.4 Why Normalization Matters",
      "body": "Suppose a dataset has two features. The first feature ranges roughly from 0 to 1. The second ranges from 0 to 1,000,000. If we compute Euclidean distance directly, then the second feature almost completely dominates the distance. The first feature may be highly informative, but numerically it becomes almost invisible. This is why normalization is central in clustering. The homework on clustering makes this concrete by comparing raw and normalized datasets and showing that cluster quality and even the chosen number of clusters may change. A good mental rule is that whenever a method depends on distance, feature scale must be examined carefully before trusting the output. Normalization can be done in different ways. Standardization using z-scores makes each feature have mean 0 and variance 1. Min-max scaling maps features into a fixed range such as [0, 1] . The exact choice depends on context, but the principle is the same: do not let arbitrary units distort the geometry of the space.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-04-why-normalization-matters"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.5 The Curse of Dimensionality",
      "body": "As the number of dimensions grows, distance behaves less intuitively. High-dimensional spaces have a tendency to make many points look similarly far from one another. This phenomenon is one part of what is often called the curse of dimensionality. In such settings, nearest-neighbor relationships can become noisy, intuition from two-dimensional geometry breaks down, and methods that rely strongly on distance may become unstable. This is one reason dimensionality reduction methods are useful even before visualization. By compressing data into a smaller and more meaningful representation, they may improve both interpretation and downstream modeling.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-05-the-curse-of-dimensionality"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.6 Clustering",
      "body": "Clustering is the task of dividing data points into groups called clusters. Informally, points in the same cluster should be more similar to one another than to points in different clusters. The challenge is that the phrase &quot;more similar&quot; depends on a modeling assumption. Some algorithms assume clusters are compact and spherical. Others are more flexible. Some methods emphasize density, others emphasize variance, and still others emphasize connectivity. In the final-exam scope, the most important clustering methods are K-means and hierarchical agglomerative clustering.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-06-clustering"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.7 K-Means Clustering",
      "body": "K-means is one of the simplest and most widely used clustering algorithms. It assumes that the data can be partitioned into \\(k\\) clusters, where \\(k\\) is chosen in advance. Each cluster is represented by a centroid, which is simply the mean of the points assigned to that cluster. The algorithm proceeds by alternating between two steps: assign each point to the nearest centroid recompute each centroid as the mean of the points assigned to it This repeated assign-then-average procedure is often called Lloyd&#x27;s algorithm. The scikit-learn documentation explicitly describes KMeans as &quot;K-Means clustering&quot; and notes that it produces cluster centers, labels, and inertia values. 4.7.1 The Objective Function K-means is not just a heuristic; it is optimizing a specific objective. The objective is the within-cluster sum of squared distances: \\[\\sum_i \\lVert x_i - \\mu_{c_i} \\rVert^2\\] Here \\(x_i\\) is a data point, \\(c_i\\) is the cluster assigned to that point, and mu_{c_i} is the centroid of that cluster. The algorithm tries to make each point close to its own cluster center. This objective explains why K-means tends to prefer compact clusters. If a cluster is stretched out, curved, or has multiple disconnected parts, one centroid may not summarize it well. 4.7.2 Why the Mean Appears The centroid is the mean because, under squared Euclidean distance, the mean is the point that minimizes the total squared distance to all assigned samples. This is a deep and elegant fact. It means the averaging step is not arbitrary; it is exactly the correct update for the chosen objective. 4.7.3 Initialization K-means can converge to different local minima depending on how the initial centroids are chosen. The scikit-learn documentation notes several initialization strategies, including k-means++ , which is designed to pick better initial centers and often speeds up convergence. It also recommends multiple restarts because K-means can fall into local minima. This is an important practical point. If two students run K-means and obtain slightly different answers, this does not necessarily mean one of them made a mistake. The initialization itself may have changed the outcome. 4.7.4 Convergence Each iteration of K-means does not increase the objective, so the algorithm will eventually stop. However, it does not guarantee the globally best solution. It guarantees only convergence to a local optimum under the chosen initialization. The scikit-learn documentation also notes that the average complexity is fast in practice, which helps explain why K-means remains one of the most popular clustering methods despite its limitations. 4.7.5 A Worked Example Suppose we have six points in two dimensions: (1,2), (1,4), (1,0), (10,2), (10,4), (10,0) If we choose \\(k = 2\\), then one natural clustering is the left group and the right group. The centroid of the left group is (1,2) and the centroid of the right group is (10,2) . This example appears in the KMeans documentation and is useful because the groups are very clean. But exam questions may give messier examples. In those cases, you should still think in the same way: which centroid is closest, and what is the mean of the assigned points? 4.7.6 Strengths of K-Means K-means is easy to understand, fast, and often works well on data with compact, roughly spherical clusters. It is a strong baseline and a common first method to try. 4.7.7 Weaknesses of K-Means K-means is sensitive to outliers because the centroid is the mean. It is sensitive to feature scale because it relies on Euclidean distance. It requires \\(k\\) in advance. It may converge to a local minimum. It also assumes a cluster shape that is often too simple for real data. The scikit-learn documentation explicitly includes examples on K-means assumptions and common problems. That is a useful reminder that the algorithm should never be treated as universally reliable.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-07-k-means-clustering"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.8 Choosing the Number of Clusters",
      "body": "The lecture repeatedly uses the elbow method. To apply it, we run K-means for multiple values of \\(k\\) and plot inertia as a function of \\(k\\). Since inertia always decreases as \\(k\\) grows, we do not simply pick the smallest inertia. Instead, we look for the point where additional clusters stop giving large improvement. This bend in the curve is called the elbow. The elbow method is a heuristic. Some datasets show a clear elbow, while others do not. In the latter case, the correct intellectual response is not to pretend certainty. A better answer is to say that the evidence for a particular \\(k\\) is weak and should be supported by additional reasoning. Another internal evaluation measure is the silhouette score. Silhouette compares how close a point is to its own cluster relative to neighboring clusters. A higher score suggests better separation. Like inertia, it is informative but not absolute. Hierarchical clustering preserves merge history in a dendrogram, while t-SNE builds a neighborhood-preserving visualization whose global spacing should be interpreted carefully.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-08-choosing-the-number-of-clusters"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.9 Hierarchical Agglomerative Clustering",
      "body": "Hierarchical agglomerative clustering takes a different approach. Instead of specifying centroids and moving them, the method begins with each data point as its own cluster. It then repeatedly merges the closest pair of clusters until everything becomes one large cluster. The result is not only a final grouping but also a complete history of how the merges happened. This is one of the greatest advantages of hierarchical clustering: it gives a multiscale view of structure rather than a single flat partition.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-09-hierarchical-agglomerative-clustering"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.10 The Dendrogram",
      "body": "The merge history of hierarchical clustering is shown using a dendrogram. Each merge has a height. Lower merges indicate that the clusters were very similar when they were joined. Higher merges indicate that the algorithm had to join more dissimilar groups. When interpreting a dendrogram, we often look for a large vertical jump. Cutting the tree below that jump can produce a plausible number of clusters. But again, this is a heuristic. The dendrogram is a tool for reasoning, not a proof that one number of clusters is uniquely correct.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-10-the-dendrogram"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.11 Linkage Criteria",
      "body": "To merge clusters, the algorithm needs a definition of distance between clusters. This is called linkage. Single linkage uses the smallest pairwise distance between points from the two clusters. It can create chaining effects, where one close bridge causes long thin structures to merge. Complete linkage uses the largest pairwise distance. This tends to create tighter clusters. Average linkage uses the average distance between all pairs across the two clusters. Ward linkage minimizes the increase in within-cluster variance when clusters are merged. The scikit-learn clustering guide explicitly notes that Ward hierarchical clustering is similar in spirit to the K-means objective because it is variance-oriented. This is an important connection: Ward linkage favors compact clusters much as K-means does. The scikit-learn clustering guide also warns that certain connectivity constraints and linkage choices can create a &quot;rich getting richer&quot; effect, especially in agglomerative clustering. This is a subtle but useful reminder that even hierarchical methods are not neutral; their design choices influence what structures become visible.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-11-linkage-criteria"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.12 K-Means and Hierarchical Clustering Compared",
      "body": "K-means is usually faster, simpler, and more directly tied to centroid-based clustering. Hierarchical clustering is often richer for exploratory analysis because it gives a full merge tree and does not require the number of clusters up front. However, hierarchical methods may be computationally heavier, and their result can depend strongly on the chosen linkage. If an exam asks which is better, the safest high-quality answer is to compare assumptions, output type, and use case rather than making an absolute judgment.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-12-k-means-and-hierarchical-clustering-compared"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.13 Principal Component Analysis",
      "body": "Principal Component Analysis is a dimensionality reduction method. It does not cluster points. Instead, it creates new axes called principal components so that the data can be represented more compactly. The scikit-learn decomposition guide describes PCA as decomposing a multivariate dataset into successive orthogonal components that explain a maximum amount of variance. This is an excellent formal summary and worth remembering.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-13-principal-component-analysis"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.14 The Geometry of PCA",
      "body": "Imagine a cloud of points in two dimensions that forms a long diagonal ellipse. The original axes may be horizontal and vertical, but the data really varies most along the diagonal direction. PCA rotates the coordinate system so that the first axis points along the direction of greatest variance. This first axis is the first principal component, or PC1. The second principal component, PC2, is orthogonal to PC1 and captures the largest remaining variance. In higher dimensions, the process continues in the same way.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-14-the-geometry-of-pca"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.15 PCA Through Covariance and Eigenvectors",
      "body": "At a slightly deeper mathematical level, PCA can be understood through the covariance matrix of the centered data. The eigenvectors of that covariance matrix define the principal directions, and the eigenvalues tell us how much variance is explained along each direction. This is why PCA is not just a visualization trick. It is a precise geometric procedure for identifying important axes of variation.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-15-pca-through-covariance-and-eigenvectors"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.16 PCA Through Singular Value Decomposition",
      "body": "In practice, PCA is often computed using Singular Value Decomposition, or SVD. The scikit-learn PCA documentation explicitly states that PCA performs linear dimensionality reduction using SVD of the centered data. This is useful because SVD is numerically stable and computationally effective. The important conceptual message is that PCA finds a lower-dimensional representation that preserves variance as much as possible in a linear sense.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-16-pca-through-singular-value-decomposition"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.17 Explained Variance",
      "body": "Each principal component explains some amount of variance. The explained variance ratio tells us what fraction of the total variance is captured by each component. If the first two components explain most of the variance, then projecting to two dimensions may preserve a large amount of the information in the data. This is why PCA is often used before plotting. A 13-dimensional dataset cannot be directly visualized by a human, but a two-dimensional PCA projection may still reveal much of its broad structure.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-17-explained-variance"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.18 What PCA Does Not Do",
      "body": "PCA does not use class labels. PCA does not discover clusters directly. PCA does not preserve arbitrary nonlinear manifolds. PCA finds linear directions of high variance. This is enough to be very useful, but it is essential not to overclaim what PCA is doing. A very common mistake is to look at a PCA plot with visually separate groups and then say, &quot;PCA clustered the data.&quot; That is incorrect. PCA may have made separation visible, but the grouping itself is not created by PCA.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-18-what-pca-does-not-do"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.19 Whitening and Preprocessing",
      "body": "The scikit-learn documentation notes that PCA centers the data but does not scale each feature automatically. It also offers a whitening option. Whitening makes the transformed components have unit variance, which can help downstream algorithms that assume isotropic input. This is especially relevant because the documentation explicitly mentions that whitening can be useful before K-means. This is a beautiful connection between dimensionality reduction and clustering. PCA is not only for visualization; it can sometimes improve the numerical behavior of later clustering steps.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-19-whitening-and-preprocessing"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.20 t-Distributed Stochastic Neighbor Embedding",
      "body": "t-SNE is a nonlinear dimensionality reduction method mainly used for visualization. The original JMLR paper &quot;Visualizing Data using t-SNE&quot; presents it as a method for giving each high-dimensional point a location in a low-dimensional map so that local similarities are preserved. The important word here is local. t-SNE is built to preserve neighborhood relationships more than global geometry. If two points are near each other in the original high-dimensional space, t-SNE tries hard to place them near each other in the low-dimensional plot.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-20-t-distributed-stochastic-neighbor-embedding"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.21 Why t-SNE Often Looks Impressive",
      "body": "t-SNE often produces visually striking plots in which apparent clusters seem to separate beautifully. This is one reason the method became so popular in exploratory analysis. It can reveal local structure that PCA does not show clearly. However, this same visual success can mislead students. A t-SNE plot is not a literal map of global geometry. The distances between large clusters may not carry direct meaning. The relative size of clusters may be misleading. Empty space between groups does not always imply strong true separation in the original space.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-21-why-t-sne-often-looks-impressive"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.22 Perplexity and Local Scale",
      "body": "t-SNE has a parameter called perplexity, which roughly controls the effective neighborhood size used when defining local similarities. Small perplexity emphasizes very local structure. Larger perplexity takes a broader view. This helps explain why different t-SNE plots of the same dataset may look different. The algorithm is not just plotting fixed geometry; it is balancing local neighborhood relationships under a nonlinear objective.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-22-perplexity-and-local-scale"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.23 PCA and t-SNE Compared",
      "body": "PCA is linear, variance-based, and relatively easy to interpret mathematically. t-SNE is nonlinear, neighborhood-preserving, and mainly intended for visualization. PCA is often useful for preprocessing, compression, or downstream modeling. t-SNE is primarily useful for human inspection. A good exam answer should not merely say that t-SNE is &quot;better&quot; because it gives prettier pictures. The correct answer is that it serves a different purpose and is especially good at visualizing local structure.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-23-pca-and-t-sne-compared"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.24 A Practical Workflow for the Final",
      "body": "When analyzing an unlabeled dataset in the spirit of this course, a sensible workflow is: inspect the features and their scales normalize when appropriate try a simple clustering method such as K-means evaluate cluster quality using inertia, silhouette, or visual reasoning use hierarchical clustering if merge structure is important use PCA for dimension reduction and broad geometric interpretation use t-SNE only as a visualization aid and interpret it carefully This workflow is valuable because it reflects how the lecture, the notebook, and practical machine learning interact. The exam is likely to reward this kind of structured reasoning.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-24-a-practical-workflow-for-the-final"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.25 Common Misunderstandings",
      "body": "Students often assume that the smallest inertia gives the best K-means solution. That is false because inertia always decreases as \\(k\\) increases. Students may also say that PCA clusters the data. That is false because PCA only transforms the coordinate system. Another common mistake is to trust t-SNE too literally, as though it preserved all distances exactly. It does not. Finally, students sometimes ignore normalization even though the course materials repeatedly show that scale can dominate clustering outcomes.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-25-common-misunderstandings"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.26 Summary",
      "body": "Unsupervised learning seeks structure without labels. In the final-exam scope, the key tools are K-means, hierarchical agglomerative clustering, PCA, and t-SNE. K-means partitions data using centroids and minimizes within-cluster squared distance. Hierarchical clustering builds a merge tree summarized by a dendrogram. PCA finds orthogonal directions of maximum variance using linear algebra, while t-SNE produces nonlinear visualizations that preserve local neighborhoods. The central lessons of the chapter are that geometry matters, scale matters, assumptions matter, and interpretation matters.",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-26-summary"
      }
    },
    {
      "kind": "section",
      "topic": "unsupervised-learning",
      "title": "Unsupervised: 4.27 Primary References Used to Expand This Chapter",
      "body": "scikit-learn clustering user guide: https://scikit-learn.org/stable/modules/clustering.html scikit-learn KMeans documentation: https://scikit-learn.org/1.5/modules/generated/sklearn.cluster.KMeans.html scikit-learn PCA documentation and decomposition guide: https://scikit-learn.org/1.5/modules/decomposition.html scikit-learn TSNE documentation: https://scikit-learn.org/stable/modules/generated/sklearn.manifold.TSNE.html van der Maaten, L. and Hinton, G. &quot;Visualizing Data using t-SNE&quot;, JMLR 2008: https://www.jmlr.org/papers/v9/vandermaaten08a.html",
      "target": {
        "view": "reader",
        "topic": "unsupervised-learning",
        "section": "unsupervised-learning-27-primary-references-used-to-expand-this-chapter"
      }
    },
    {
      "kind": "chapter",
      "topic": "neural-networks-foundations",
      "title": "5 Neural Networks 1",
      "body": "Neural networks became important because many real-world tasks cannot be solved well by simple linear models. A linear classifier can separate classes only with a linear boundary. But many useful problems require complicated nonlinear boundaries or complicated functional relationships between inputs and outputs. The first neural-network chapter in this course establishes the foundation needed to understand deep learning: layers, activations, output design, loss functions, optimization, backpropagation, overfitting, and regularization. This chapter is essential because all later topics, including convolutional networks, sequence models, and generative AI, inherit these basic ideas. Neural-network training is a repeated loop: take a mini-batch, run a forward pass, compute a loss, backpropagate gradients, and update the weights. A neuron in a feedforward network computes a weighted sum of its inputs and then applies an activation function. In a simple linear model, the output may be written as: \\[y = w^T x + b\\] where \\(x\\) is the input vector, \\(w\\) is the weight vector, and \\(b\\) is a bias term. This is already useful, but it is only linear. A neural network stacks many such transformations. If the network has hidden layers, then the output of one layer becomes the input to the next. The network therefore composes simple functions into a more complicated function. This compositional structure is one of the main reasons deep learning is powerful. If a layer receives an input vector \\(x\\), then a standard dense layer computes: \\[z = Wx + b\\] where \\(W\\) is a matrix and \\(b\\) is a bias vector. Then the layer applies an activation function: \\[a = f(z)\\] The vector \\(z\\) is sometimes called the pre-activation, and \\(a\\) is the post-activation. This pattern repeats from layer to layer until the final output is produced. The use of matrix notation is not cosmetic. It makes clear that a whole layer is just a learnable affine transformation followed by a nonlinearity. If we stack several layers but use no nonlinear activation functions, then the network collapses mathematically into a single linear transformation. That means depth alone would provide no extra expressive power. This is one of the most important conceptual points in neural networks. Nonlinear activations are what allow deep networks to represent curved boundaries, interaction effects, and hierarchical feature composition. Without nonlinearity, a deep network is only a complicated way to write a linear model. The lecture introduces several activation functions. The sigmoid function maps values into the interval from 0 to 1. It was historically popular but can saturate, producing very small gradients when inputs become large in magnitude. The tanh function maps values into the interval from -1 to 1 and is centered around zero, which can help optimization somewhat, but it still suffers from saturation. The Rectified Linear Unit, or ReLU, computes \\(\\max(0, x)\\). ReLU has become a practical default in many hidden layers because it is simple, efficient, and avoids some of the saturation behavior of sigmoid and tanh. ReLU is not perfect, but its simplicity and effectiveness made it one of the defining nonlinearities of modern deep learning. A single neuron with a threshold-like decision effectively creates a hyperplane that splits feature space into two sides. A network with hidden layers can combine many such splits to create more complex decision regions. This is why the lecture emphasizes that stacked neurons create more complicated decision boundaries than a single linear separator. Conceptually, one may think of each hidden layer as transforming the representation into a new space where the final separation becomes easier. The output layer must match the type of prediction problem. This is not a minor design detail; it is a core modeling decision. For multi-class classification, we usually want the outputs to behave like probabilities over classes. Softmax is therefore natural. For regression, we want real-valued outputs. A linear output layer is appropriate because it does not artificially restrict the range. The precipitation nowcasting homework makes this point explicit. Rainfall amount is a continuous real-valued target, so it should not be forced through a sigmoid or clipped by a ReLU at the final layer. A linear output is the correct choice. Softmax converts raw scores, sometimes called logits, into a probability-like distribution: \\[p_i = \\frac{\\exp(z_i)}{\\sum_j \\exp(z_j)}\\] Each output is between 0 and 1, and the outputs sum to 1. This makes softmax suitable when the model must distribute belief across multiple exclusive classes. The PyTorch CrossEntropyLoss documentation states that this criterion computes the cross-entropy loss between input logits and target and is useful for training classification problems with \\(C\\) classes. It also notes that the input should contain unnormalized logits, which is an important practical detail. The loss function tells the learning algorithm what it means to make a mistake. For classification, the course emphasizes cross-entropy. Cross-entropy heavily penalizes the model when it assigns low probability to the correct class. It is closely tied to probabilistic modeling and works naturally with softmax-style outputs. For regression, the course emphasizes Mean Squared Error, or MSE. The PyTorch documentation describes MSELoss as measuring the mean squared error, or squared L2 norm, between each element of the input and target. Because the error is squared, large mistakes are penalized more strongly than small ones. The most important exam rule is therefore straightforward: use cross-entropy for classification and MSE for regression unless a special context suggests otherwise. The nowcasting homework contains a useful reasoning example. Rainfall prediction is a regression problem. MSE is appropriate because rainfall is a continuous target, and the loss gives smooth gradients for optimization. It also naturally penalizes large numerical errors more strongly than small ones. This is not just a homework-specific fact. It is an example of model-likelihood matching: the type of target should guide the type of output and the type of loss. Training a neural network means choosing weights and biases so that the loss becomes small on the training data. This is an optimization problem over a high-dimensional parameter space. The loss landscape is usually nonconvex, so the optimization does not have the tidy geometry of an ordinary convex least-squares problem. Nevertheless, gradient-based methods work well in practice. The reason is not that the problem becomes mathematically simple, but that modern architectures, data regimes, and optimization heuristics make gradient descent workable at scale. Gradient descent updates parameters in the negative direction of the loss gradient: \\[\\theta \\leftarrow \\theta - \\eta \\nabla L\\] The parameter eta is the learning rate. If the learning rate is too small, the optimization moves slowly. If it is too large, the optimization may overshoot good regions or diverge. Much of practical deep learning consists of learning how to control this tradeoff. The lecture spends time on intuition for the gradient because students must understand that the gradient points in the direction of steepest increase, so moving in the negative gradient direction reduces the loss locally. Backpropagation is the algorithm that computes gradients efficiently in a layered network. It is an application of the chain rule from calculus. The network first performs a forward pass to compute intermediate values, the output, and the loss. It then performs a backward pass to compute how changing each parameter would change the loss. This means backpropagation is not a different training objective. It is the computational machinery that makes gradient-based learning possible in deep networks. Using the entire training set for every update can be expensive. Instead, it is common to use small subsets of the training data called mini-batches. This leads to stochastic or mini-batch gradient descent. Each update becomes noisier, but also much cheaper. In practice this is often beneficial because it works efficiently on hardware accelerators and can help optimization move through complex landscapes. The phrase &quot;SGD&quot; is therefore often used broadly to refer to gradient-based optimization using mini-batches rather than full-dataset updates. A single fixed learning rate is often not ideal throughout training. Early in learning, larger steps can help the model move quickly toward a good region. Later in training, smaller steps can help refine the solution. This is why learning-rate scheduling or annealing is common. The nowcasting notebook includes ReduceLROnPlateau , which lowers the learning rate when validation progress stalls. This is a practical example of how optimization is not just about choosing an architecture but also about controlling the training dynamics. The starting values of the parameters matter. Poor initialization can lead to gradients that vanish, explode, or move very slowly. Good initialization helps maintain healthy signal propagation through the network. The lecture notes mention practical initialization advice, such as He initialization for ReLU-style networks. This is another example of a theme that appears throughout deep learning: even if the mathematical model is correct, the training behavior can still fail if the numerical setup is poor. Generalization depends on validation behavior, not training loss alone: train and validation curves reveal overfitting, while regularization methods try to reduce brittle memorization. Underfitting occurs when the model is not expressive enough, not trained long enough, or not optimized well enough to capture the relevant structure. In underfitting, both training and validation performance remain poor. Overfitting occurs when the model fits the training data too specifically and fails to generalize. In overfitting, training loss becomes low while validation performance stops improving or gets worse. Students often say that overfitting means &quot;low training loss.&quot; That is not precise enough. Overfitting means low training loss together with poor generalization. The training set is used to fit the model parameters. The validation set is used to monitor progress and choose settings such as architecture, regularization, and learning rate. The test set is reserved for final evaluation. This separation matters because if the test set is used repeatedly during development, it stops being an honest estimate of generalization. The course repeatedly emphasizes this distinction, and it is a common source of lost points when students answer carelessly. Regularization refers to techniques that improve generalization by discouraging overly brittle or overly complex solutions. L1 regularization adds a penalty based on the sum of absolute weight values. It encourages sparsity. L2 regularization adds a penalty based on the sum of squared weight values. It discourages extremely large weights and is one of the most common forms of weight penalty in practical training. Dropout is a particularly important technique. The original dropout paper in JMLR describes it as a method for addressing overfitting by randomly dropping units and their connections during training. The PyTorch Dropout documentation similarly explains that during training it randomly zeroes some input elements with probability \\(p\\), making it an effective technique for regularization and preventing co-adaptation of neurons. The intuition is that if units cannot rely on always being present, the network must learn more distributed and robust representations. Although not always separated as a formal theorem in introductory lectures, one of the most effective practical regularizers is simply stopping training when validation performance ceases to improve. This idea appears naturally when one monitors training and validation curves across epochs. If training loss keeps falling but validation loss starts rising, the model is probably learning training-specific quirks rather than general structure. That is the moment to reduce capacity, regularize more, or stop training. The lecture surveys several optimizers beyond plain gradient descent. Momentum adds a velocity term so that optimization can move more effectively through shallow or noisy directions. Nesterov momentum modifies this idea with a look-ahead perspective. RMSprop adjusts steps based on gradient magnitude. Adam combines adaptive step sizing with momentum-like estimates and became a widely used practical default. AdamW modifies Adam so that weight decay is handled more cleanly. A useful exam-level conclusion is that optimization behavior depends not only on the learning rate but also on the optimizer design. In practice, Adam and AdamW are often strong first choices, but understanding SGD and momentum remains fundamental. The homework includes a useful parameter-counting exercise. If a fully connected layer maps 75 inputs to 200 outputs, then the number of weights is \\(75 \\cdot 200 = 15000\\). The number of biases is 200. Therefore the total number of parameters is 15200. This matters because a neural network is not magic; it is a concrete parameterized function. Counting parameters helps the student appreciate model capacity and the cost of adding layers or neurons. The precipitation nowcasting notebook shows how the abstract ideas become concrete engineering decisions. The task is regression, so the output layer is linear and the loss is MSE. Data must be loaded carefully using dataset and dataloader abstractions. Training history must be monitored. Learning rates must be scheduled. Overfitting must be addressed with dropout, normalization, or better optimization. The most important practical lesson is that model quality emerges from many aligned choices. A model may fail because the loss is wrong, the output layer is wrong, the learning rate is unstable, the data is not normalized, or the training is overfitting. Deep learning requires reasoning across all of these layers at once. Students often confuse sigmoid and softmax, or treat them as interchangeable. They are not. Another frequent mistake is to use bounded activations at the final layer of a regression model without justification. Others may forget bias terms when counting parameters, or talk about overfitting without mentioning validation performance. A more subtle mistake is to imagine that backpropagation is a mysterious separate phenomenon rather than simply the chain rule applied efficiently. The first neural-network chapter provides the conceptual foundation for deep learning. A neural network is a composition of affine transformations and nonlinear activations. Nonlinearity is essential. Output design must match task type. Cross-entropy is natural for classification; MSE is natural for regression. Training is an optimization process driven by gradients and backpropagation. Validation reveals generalization quality. Regularization, initialization, and optimizer choice all strongly affect outcomes. These ideas are the core language of modern machine learning. PyTorch CrossEntropyLoss documentation: https://docs.pytorch.org/docs/stable/generated/torch.nn.CrossEntropyLoss.html PyTorch MSELoss documentation: https://docs.pytorch.org/docs/stable/generated/torch.nn.MSELoss.html PyTorch Dropout documentation: https://docs.pytorch.org/docs/stable/generated/torch.nn.Dropout.html Srivastava et al. &quot;Dropout: A Simple Way to Prevent Neural Networks from Overfitting&quot;, JMLR 2014: https://jmlr.csail.mit.edu/beta/papers/v15/srivastava14a.html A neural network is a stack of learnable transformations. Each layer reshapes the representation a little, and nonlinear activations prevent the whole system from collapsing back into one simple linear rule. Think of each hidden layer as a translator that rewrites the input into a more useful internal language. Training is the repeated process of adjusting those translators so the final output makes fewer mistakes. CNNs, sequence models, and generative AI all inherit this foundation. Once you understand activations, losses, optimization, and generalization, later architectures become variations on these themes. I can explain why stacked linear layers still behave linearly. I can match classification to softmax and cross-entropy, and regression to linear output and MSE. I can describe the forward pass and backward pass in plain language. I can distinguish underfitting, overfitting, validation, and test sets clearly. Affine layer A dense layer first computes a weighted sum plus a bias. By itself this is only an affine transformation. The extra expressive power comes from what happens after it. Activation step The activation applies a nonlinearity to the pre-activation vector. Without this step, several layers in a row would still collapse into one linear transformation. Gradient descent update Parameters move in the direction that locally reduces the loss. The learning rate \\(\\eta\\) controls how aggressive the step is. Too small is slow; too large can bounce or diverge. Mean squared error MSE averages squared prediction error for regression targets. Large mistakes are punished more heavily than small mistakes, which is useful when numeric error size matters. Why nonlinearity is the turning point Suppose you stack two layers but remove the activation function between them. Then the first layer computes \\(W_1x + b_1\\) and the second computes \\(W_2(W_1x + b_1) + b_2\\). Algebraically this is still just one affine transformation. So depth only starts to matter when nonlinear activations break that collapse. Why rainfall prediction should keep a linear output Rainfall amount is continuous, and you may want the model to output values larger than 1 or even near zero without clipping. A sigmoid would squash outputs into \\([0, 1]\\), and a ReLU could create unintended behavior at the final layer. A linear output plus MSE matches the structure of a continuous regression target much better. Why is a hidden layer called hidden rather than magical? Because it is simply an internal representation layer whose activations are not the final outputs. It is learned, but it still follows explicit algebraic operations. What does backpropagation actually compute? It efficiently computes how changing each parameter would change the loss, using the chain rule through the network's layered structure. Why is low training loss not enough to claim success? Because the real goal is generalization. A model can memorize training data and still perform poorly on validation or test data. Why can learning-rate scheduling help even if the architecture stays the same? Because optimization behavior changes during training. Larger steps help early movement, while smaller steps often help late refinement. Why is dropout considered regularization instead of ordinary architecture? Because its main role is to reduce over-reliance on specific units and improve generalization rather than to change the function class in a deterministic way.",
      "target": {
        "view": "reader",
        "topic": "neural-networks-foundations"
      }
    },
    {
      "kind": "section",
      "topic": "neural-networks-foundations",
      "title": "NN Foundations: 5.1 From the Perceptron to the Deep Network",
      "body": "A neuron in a feedforward network computes a weighted sum of its inputs and then applies an activation function. In a simple linear model, the output may be written as: \\[y = w^T x + b\\] where \\(x\\) is the input vector, \\(w\\) is the weight vector, and \\(b\\) is a bias term. This is already useful, but it is only linear. A neural network stacks many such transformations. If the network has hidden layers, then the output of one layer becomes the input to the next. The network therefore composes simple functions into a more complicated function. This compositional structure is one of the main reasons deep learning is powerful.",
      "target": {
        "view": "reader",
        "topic": "neural-networks-foundations",
        "section": "neural-networks-foundations-01-from-the-perceptron-to-the-deep-network"
      }
    },
    {
      "kind": "section",
      "topic": "neural-networks-foundations",
      "title": "NN Foundations: 5.2 Matrix Notation and Layer Computation",
      "body": "If a layer receives an input vector \\(x\\), then a standard dense layer computes: \\[z = Wx + b\\] where \\(W\\) is a matrix and \\(b\\) is a bias vector. Then the layer applies an activation function: \\[a = f(z)\\] The vector \\(z\\) is sometimes called the pre-activation, and \\(a\\) is the post-activation. This pattern repeats from layer to layer until the final output is produced. The use of matrix notation is not cosmetic. It makes clear that a whole layer is just a learnable affine transformation followed by a nonlinearity.",
      "target": {
        "view": "reader",
        "topic": "neural-networks-foundations",
        "section": "neural-networks-foundations-02-matrix-notation-and-layer-computation"
      }
    },
    {
      "kind": "section",
      "topic": "neural-networks-foundations",
      "title": "NN Foundations: 5.3 Why Nonlinearity Is Necessary",
      "body": "If we stack several layers but use no nonlinear activation functions, then the network collapses mathematically into a single linear transformation. That means depth alone would provide no extra expressive power. This is one of the most important conceptual points in neural networks. Nonlinear activations are what allow deep networks to represent curved boundaries, interaction effects, and hierarchical feature composition. Without nonlinearity, a deep network is only a complicated way to write a linear model.",
      "target": {
        "view": "reader",
        "topic": "neural-networks-foundations",
        "section": "neural-networks-foundations-03-why-nonlinearity-is-necessary"
      }
    },
    {
      "kind": "section",
      "topic": "neural-networks-foundations",
      "title": "NN Foundations: 5.4 Activation Functions",
      "body": "The lecture introduces several activation functions. The sigmoid function maps values into the interval from 0 to 1. It was historically popular but can saturate, producing very small gradients when inputs become large in magnitude. The tanh function maps values into the interval from -1 to 1 and is centered around zero, which can help optimization somewhat, but it still suffers from saturation. The Rectified Linear Unit, or ReLU, computes \\(\\max(0, x)\\). ReLU has become a practical default in many hidden layers because it is simple, efficient, and avoids some of the saturation behavior of sigmoid and tanh. ReLU is not perfect, but its simplicity and effectiveness made it one of the defining nonlinearities of modern deep learning.",
      "target": {
        "view": "reader",
        "topic": "neural-networks-foundations",
        "section": "neural-networks-foundations-04-activation-functions"
      }
    },
    {
      "kind": "section",
      "topic": "neural-networks-foundations",
      "title": "NN Foundations: 5.5 Linear Decision Boundaries and Feature Space",
      "body": "A single neuron with a threshold-like decision effectively creates a hyperplane that splits feature space into two sides. A network with hidden layers can combine many such splits to create more complex decision regions. This is why the lecture emphasizes that stacked neurons create more complicated decision boundaries than a single linear separator. Conceptually, one may think of each hidden layer as transforming the representation into a new space where the final separation becomes easier.",
      "target": {
        "view": "reader",
        "topic": "neural-networks-foundations",
        "section": "neural-networks-foundations-05-linear-decision-boundaries-and-feature-space"
      }
    },
    {
      "kind": "section",
      "topic": "neural-networks-foundations",
      "title": "NN Foundations: 5.6 Output Layers Depend on the Task",
      "body": "The output layer must match the type of prediction problem. This is not a minor design detail; it is a core modeling decision. For multi-class classification, we usually want the outputs to behave like probabilities over classes. Softmax is therefore natural. For regression, we want real-valued outputs. A linear output layer is appropriate because it does not artificially restrict the range. The precipitation nowcasting homework makes this point explicit. Rainfall amount is a continuous real-valued target, so it should not be forced through a sigmoid or clipped by a ReLU at the final layer. A linear output is the correct choice.",
      "target": {
        "view": "reader",
        "topic": "neural-networks-foundations",
        "section": "neural-networks-foundations-06-output-layers-depend-on-the-task"
      }
    },
    {
      "kind": "section",
      "topic": "neural-networks-foundations",
      "title": "NN Foundations: 5.7 Softmax and Probabilistic Outputs",
      "body": "Softmax converts raw scores, sometimes called logits, into a probability-like distribution: \\[p_i = \\frac{\\exp(z_i)}{\\sum_j \\exp(z_j)}\\] Each output is between 0 and 1, and the outputs sum to 1. This makes softmax suitable when the model must distribute belief across multiple exclusive classes. The PyTorch CrossEntropyLoss documentation states that this criterion computes the cross-entropy loss between input logits and target and is useful for training classification problems with \\(C\\) classes. It also notes that the input should contain unnormalized logits, which is an important practical detail.",
      "target": {
        "view": "reader",
        "topic": "neural-networks-foundations",
        "section": "neural-networks-foundations-07-softmax-and-probabilistic-outputs"
      }
    },
    {
      "kind": "section",
      "topic": "neural-networks-foundations",
      "title": "NN Foundations: 5.8 Loss Functions",
      "body": "The loss function tells the learning algorithm what it means to make a mistake. For classification, the course emphasizes cross-entropy. Cross-entropy heavily penalizes the model when it assigns low probability to the correct class. It is closely tied to probabilistic modeling and works naturally with softmax-style outputs. For regression, the course emphasizes Mean Squared Error, or MSE. The PyTorch documentation describes MSELoss as measuring the mean squared error, or squared L2 norm, between each element of the input and target. Because the error is squared, large mistakes are penalized more strongly than small ones. The most important exam rule is therefore straightforward: use cross-entropy for classification and MSE for regression unless a special context suggests otherwise.",
      "target": {
        "view": "reader",
        "topic": "neural-networks-foundations",
        "section": "neural-networks-foundations-08-loss-functions"
      }
    },
    {
      "kind": "section",
      "topic": "neural-networks-foundations",
      "title": "NN Foundations: 5.9 Why MSE Is Reasonable for Continuous Targets",
      "body": "The nowcasting homework contains a useful reasoning example. Rainfall prediction is a regression problem. MSE is appropriate because rainfall is a continuous target, and the loss gives smooth gradients for optimization. It also naturally penalizes large numerical errors more strongly than small ones. This is not just a homework-specific fact. It is an example of model-likelihood matching: the type of target should guide the type of output and the type of loss.",
      "target": {
        "view": "reader",
        "topic": "neural-networks-foundations",
        "section": "neural-networks-foundations-09-why-mse-is-reasonable-for-continuous-targets"
      }
    },
    {
      "kind": "section",
      "topic": "neural-networks-foundations",
      "title": "NN Foundations: 5.10 Optimization as Loss Minimization",
      "body": "Training a neural network means choosing weights and biases so that the loss becomes small on the training data. This is an optimization problem over a high-dimensional parameter space. The loss landscape is usually nonconvex, so the optimization does not have the tidy geometry of an ordinary convex least-squares problem. Nevertheless, gradient-based methods work well in practice. The reason is not that the problem becomes mathematically simple, but that modern architectures, data regimes, and optimization heuristics make gradient descent workable at scale.",
      "target": {
        "view": "reader",
        "topic": "neural-networks-foundations",
        "section": "neural-networks-foundations-10-optimization-as-loss-minimization"
      }
    },
    {
      "kind": "section",
      "topic": "neural-networks-foundations",
      "title": "NN Foundations: 5.11 Gradient Descent",
      "body": "Gradient descent updates parameters in the negative direction of the loss gradient: \\[\\theta \\leftarrow \\theta - \\eta \\nabla L\\] The parameter eta is the learning rate. If the learning rate is too small, the optimization moves slowly. If it is too large, the optimization may overshoot good regions or diverge. Much of practical deep learning consists of learning how to control this tradeoff. The lecture spends time on intuition for the gradient because students must understand that the gradient points in the direction of steepest increase, so moving in the negative gradient direction reduces the loss locally.",
      "target": {
        "view": "reader",
        "topic": "neural-networks-foundations",
        "section": "neural-networks-foundations-11-gradient-descent"
      }
    },
    {
      "kind": "section",
      "topic": "neural-networks-foundations",
      "title": "NN Foundations: 5.12 Backpropagation",
      "body": "Backpropagation is the algorithm that computes gradients efficiently in a layered network. It is an application of the chain rule from calculus. The network first performs a forward pass to compute intermediate values, the output, and the loss. It then performs a backward pass to compute how changing each parameter would change the loss. This means backpropagation is not a different training objective. It is the computational machinery that makes gradient-based learning possible in deep networks.",
      "target": {
        "view": "reader",
        "topic": "neural-networks-foundations",
        "section": "neural-networks-foundations-12-backpropagation"
      }
    },
    {
      "kind": "section",
      "topic": "neural-networks-foundations",
      "title": "NN Foundations: 5.13 Mini-Batches and Stochastic Gradient Descent",
      "body": "Using the entire training set for every update can be expensive. Instead, it is common to use small subsets of the training data called mini-batches. This leads to stochastic or mini-batch gradient descent. Each update becomes noisier, but also much cheaper. In practice this is often beneficial because it works efficiently on hardware accelerators and can help optimization move through complex landscapes. The phrase &quot;SGD&quot; is therefore often used broadly to refer to gradient-based optimization using mini-batches rather than full-dataset updates.",
      "target": {
        "view": "reader",
        "topic": "neural-networks-foundations",
        "section": "neural-networks-foundations-13-mini-batches-and-stochastic-gradient-descent"
      }
    },
    {
      "kind": "section",
      "topic": "neural-networks-foundations",
      "title": "NN Foundations: 5.14 Learning Rate Scheduling",
      "body": "A single fixed learning rate is often not ideal throughout training. Early in learning, larger steps can help the model move quickly toward a good region. Later in training, smaller steps can help refine the solution. This is why learning-rate scheduling or annealing is common. The nowcasting notebook includes ReduceLROnPlateau , which lowers the learning rate when validation progress stalls. This is a practical example of how optimization is not just about choosing an architecture but also about controlling the training dynamics.",
      "target": {
        "view": "reader",
        "topic": "neural-networks-foundations",
        "section": "neural-networks-foundations-14-learning-rate-scheduling"
      }
    },
    {
      "kind": "section",
      "topic": "neural-networks-foundations",
      "title": "NN Foundations: 5.15 Initialization",
      "body": "The starting values of the parameters matter. Poor initialization can lead to gradients that vanish, explode, or move very slowly. Good initialization helps maintain healthy signal propagation through the network. The lecture notes mention practical initialization advice, such as He initialization for ReLU-style networks. This is another example of a theme that appears throughout deep learning: even if the mathematical model is correct, the training behavior can still fail if the numerical setup is poor. Generalization depends on validation behavior, not training loss alone: train and validation curves reveal overfitting, while regularization methods try to reduce brittle memorization.",
      "target": {
        "view": "reader",
        "topic": "neural-networks-foundations",
        "section": "neural-networks-foundations-15-initialization"
      }
    },
    {
      "kind": "section",
      "topic": "neural-networks-foundations",
      "title": "NN Foundations: 5.16 Underfitting and Overfitting",
      "body": "Underfitting occurs when the model is not expressive enough, not trained long enough, or not optimized well enough to capture the relevant structure. In underfitting, both training and validation performance remain poor. Overfitting occurs when the model fits the training data too specifically and fails to generalize. In overfitting, training loss becomes low while validation performance stops improving or gets worse. Students often say that overfitting means &quot;low training loss.&quot; That is not precise enough. Overfitting means low training loss together with poor generalization.",
      "target": {
        "view": "reader",
        "topic": "neural-networks-foundations",
        "section": "neural-networks-foundations-16-underfitting-and-overfitting"
      }
    },
    {
      "kind": "section",
      "topic": "neural-networks-foundations",
      "title": "NN Foundations: 5.17 The Validation Set and the Test Set",
      "body": "The training set is used to fit the model parameters. The validation set is used to monitor progress and choose settings such as architecture, regularization, and learning rate. The test set is reserved for final evaluation. This separation matters because if the test set is used repeatedly during development, it stops being an honest estimate of generalization. The course repeatedly emphasizes this distinction, and it is a common source of lost points when students answer carelessly.",
      "target": {
        "view": "reader",
        "topic": "neural-networks-foundations",
        "section": "neural-networks-foundations-17-the-validation-set-and-the-test-set"
      }
    },
    {
      "kind": "section",
      "topic": "neural-networks-foundations",
      "title": "NN Foundations: 5.18 Regularization",
      "body": "Regularization refers to techniques that improve generalization by discouraging overly brittle or overly complex solutions. L1 regularization adds a penalty based on the sum of absolute weight values. It encourages sparsity. L2 regularization adds a penalty based on the sum of squared weight values. It discourages extremely large weights and is one of the most common forms of weight penalty in practical training. Dropout is a particularly important technique. The original dropout paper in JMLR describes it as a method for addressing overfitting by randomly dropping units and their connections during training. The PyTorch Dropout documentation similarly explains that during training it randomly zeroes some input elements with probability \\(p\\), making it an effective technique for regularization and preventing co-adaptation of neurons. The intuition is that if units cannot rely on always being present, the network must learn more distributed and robust representations.",
      "target": {
        "view": "reader",
        "topic": "neural-networks-foundations",
        "section": "neural-networks-foundations-18-regularization"
      }
    },
    {
      "kind": "section",
      "topic": "neural-networks-foundations",
      "title": "NN Foundations: 5.19 Early Stopping and Monitoring",
      "body": "Although not always separated as a formal theorem in introductory lectures, one of the most effective practical regularizers is simply stopping training when validation performance ceases to improve. This idea appears naturally when one monitors training and validation curves across epochs. If training loss keeps falling but validation loss starts rising, the model is probably learning training-specific quirks rather than general structure. That is the moment to reduce capacity, regularize more, or stop training.",
      "target": {
        "view": "reader",
        "topic": "neural-networks-foundations",
        "section": "neural-networks-foundations-19-early-stopping-and-monitoring"
      }
    },
    {
      "kind": "section",
      "topic": "neural-networks-foundations",
      "title": "NN Foundations: 5.20 Common Optimizers",
      "body": "The lecture surveys several optimizers beyond plain gradient descent. Momentum adds a velocity term so that optimization can move more effectively through shallow or noisy directions. Nesterov momentum modifies this idea with a look-ahead perspective. RMSprop adjusts steps based on gradient magnitude. Adam combines adaptive step sizing with momentum-like estimates and became a widely used practical default. AdamW modifies Adam so that weight decay is handled more cleanly. A useful exam-level conclusion is that optimization behavior depends not only on the learning rate but also on the optimizer design. In practice, Adam and AdamW are often strong first choices, but understanding SGD and momentum remains fundamental.",
      "target": {
        "view": "reader",
        "topic": "neural-networks-foundations",
        "section": "neural-networks-foundations-20-common-optimizers"
      }
    },
    {
      "kind": "section",
      "topic": "neural-networks-foundations",
      "title": "NN Foundations: 5.21 Counting Parameters",
      "body": "The homework includes a useful parameter-counting exercise. If a fully connected layer maps 75 inputs to 200 outputs, then the number of weights is \\(75 \\cdot 200 = 15000\\). The number of biases is 200. Therefore the total number of parameters is 15200. This matters because a neural network is not magic; it is a concrete parameterized function. Counting parameters helps the student appreciate model capacity and the cost of adding layers or neurons.",
      "target": {
        "view": "reader",
        "topic": "neural-networks-foundations",
        "section": "neural-networks-foundations-21-counting-parameters"
      }
    },
    {
      "kind": "section",
      "topic": "neural-networks-foundations",
      "title": "NN Foundations: 5.22 What the Homework Teaches About Modeling",
      "body": "The precipitation nowcasting notebook shows how the abstract ideas become concrete engineering decisions. The task is regression, so the output layer is linear and the loss is MSE. Data must be loaded carefully using dataset and dataloader abstractions. Training history must be monitored. Learning rates must be scheduled. Overfitting must be addressed with dropout, normalization, or better optimization. The most important practical lesson is that model quality emerges from many aligned choices. A model may fail because the loss is wrong, the output layer is wrong, the learning rate is unstable, the data is not normalized, or the training is overfitting. Deep learning requires reasoning across all of these layers at once.",
      "target": {
        "view": "reader",
        "topic": "neural-networks-foundations",
        "section": "neural-networks-foundations-22-what-the-homework-teaches-about-modeling"
      }
    },
    {
      "kind": "section",
      "topic": "neural-networks-foundations",
      "title": "NN Foundations: 5.23 Common Misunderstandings",
      "body": "Students often confuse sigmoid and softmax, or treat them as interchangeable. They are not. Another frequent mistake is to use bounded activations at the final layer of a regression model without justification. Others may forget bias terms when counting parameters, or talk about overfitting without mentioning validation performance. A more subtle mistake is to imagine that backpropagation is a mysterious separate phenomenon rather than simply the chain rule applied efficiently.",
      "target": {
        "view": "reader",
        "topic": "neural-networks-foundations",
        "section": "neural-networks-foundations-23-common-misunderstandings"
      }
    },
    {
      "kind": "section",
      "topic": "neural-networks-foundations",
      "title": "NN Foundations: 5.24 Summary",
      "body": "The first neural-network chapter provides the conceptual foundation for deep learning. A neural network is a composition of affine transformations and nonlinear activations. Nonlinearity is essential. Output design must match task type. Cross-entropy is natural for classification; MSE is natural for regression. Training is an optimization process driven by gradients and backpropagation. Validation reveals generalization quality. Regularization, initialization, and optimizer choice all strongly affect outcomes. These ideas are the core language of modern machine learning.",
      "target": {
        "view": "reader",
        "topic": "neural-networks-foundations",
        "section": "neural-networks-foundations-24-summary"
      }
    },
    {
      "kind": "section",
      "topic": "neural-networks-foundations",
      "title": "NN Foundations: 5.25 Primary References Used to Expand This Chapter",
      "body": "PyTorch CrossEntropyLoss documentation: https://docs.pytorch.org/docs/stable/generated/torch.nn.CrossEntropyLoss.html PyTorch MSELoss documentation: https://docs.pytorch.org/docs/stable/generated/torch.nn.MSELoss.html PyTorch Dropout documentation: https://docs.pytorch.org/docs/stable/generated/torch.nn.Dropout.html Srivastava et al. &quot;Dropout: A Simple Way to Prevent Neural Networks from Overfitting&quot;, JMLR 2014: https://jmlr.csail.mit.edu/beta/papers/v15/srivastava14a.html",
      "target": {
        "view": "reader",
        "topic": "neural-networks-foundations",
        "section": "neural-networks-foundations-25-primary-references-used-to-expand-this-chapter"
      }
    },
    {
      "kind": "chapter",
      "topic": "convolutional-networks",
      "title": "6 Neural Networks 2",
      "body": "The first neural-network chapter explained the general language of deep learning: layers, activations, losses, gradients, optimization, and regularization. This second chapter asks a more focused question: how should we design networks when the input has spatial structure, especially image-like structure? That question matters because many real datasets are not just unordered vectors. Images, maps, weather grids, spectrograms, and many biomedical signals have nearby values that are strongly related. A model that ignores that structure will often need more parameters, more data, and more training time than a model that respects it. Convolutional neural networks, or CNNs, became successful because they encode the right inductive bias for this kind of data. They assume that local patterns matter, that the same kind of pattern may appear in multiple locations, and that useful representations should become increasingly abstract as we move deeper into the network. This chapter develops that idea carefully. We will begin with the motivation for convolutions, then study how convolutional layers actually work, how dimensions change through the network, why receptive fields matter, and how deeper architectures such as AlexNet, ResNet, MobileNet, and EfficientNet fit into the bigger story. We will also study transfer learning, which is one of the most practical and exam-relevant uses of modern deep learning. A convolutional network keeps image structure intact by sliding filters across local patches, building feature maps, pooling stronger signals, and finally producing class scores. Suppose we flatten a color image into one giant vector and feed it into a fully connected network. In principle, this can work. A fully connected network is expressive enough to approximate very complex functions. But the representation is wasteful. The problem is not that the network is incapable. The problem is that it has no built-in understanding of spatial structure. In an image: nearby pixels tend to be related edges, corners, and textures often matter more than isolated pixel values the same visual pattern can appear in different locations higher-level concepts such as eyes, wheels, or rooftops are built from smaller local patterns A fully connected layer treats pixel 1 and pixel 10000 as just two coordinates in a vector. It does not know that some pixels are neighbors or that a vertical edge on the left side and the same vertical edge on the right side should be detected by similar computations. This leads to three major inefficiencies: too many parameters weak inductive bias for spatial data poor reuse of learned local patterns Convolutional networks solve these problems by forcing the model to look locally, reuse filters across positions, and build deeper representations from simpler ones. Two ideas define CNNs. The first is local connectivity. Instead of connecting every neuron to every pixel, a neuron in a convolutional layer only sees a small patch of the input, such as a \\(3 \\times 3\\) or \\(5 \\times 5\\) region. This matches the idea that many useful visual features are local. The second is parameter sharing. The same learned filter is applied across many positions in the image. If a filter learns to detect a horizontal edge, it can detect that edge anywhere, not just in one fixed location. These two ideas drastically reduce parameter count. They also encourage a model to learn features that generalize across space. This is one of the most important conceptual differences between dense networks and CNNs. A dense network learns many position-specific interactions. A CNN learns reusable local feature detectors. In deep learning libraries, what is usually called convolution is technically cross-correlation, but the standard name remains convolutional layer. The PyTorch Conv2d documentation describes it as applying a 2D convolution over an input with shape (N, C_in, H, W) to produce an output with shape (N, C_out, H_out, W_out) . Here is the practical picture. We choose a small filter, also called a kernel, such as \\(3 \\times 3\\). That filter contains learned weights. We place it over a local patch of the input, multiply corresponding entries, sum them, optionally add a bias, and produce one output number. Then we slide the filter to another position and repeat the process. The output of one filter over all positions is called a feature map. If we use many filters, we get many feature maps. Each one can learn to respond to a different pattern: horizontal edges vertical edges color contrasts corner-like structures textures Later layers operate on these feature maps rather than raw pixels, allowing the network to build more abstract concepts from simpler ones. Real images usually have multiple channels, such as red, green, and blue. Therefore a convolutional filter is not just a small \\(f x f\\) patch. It spans all input channels. For an RGB image, a \\(3 \\times 3\\) filter really has shape \\(3 \\times 3 \\times 3\\). This means a filter is free to learn patterns that combine color and shape. One filter may respond strongly to bright horizontal transitions. Another may react to a particular color contrast. Another may capture texture. The number of output channels equals the number of filters we choose. If a layer has 64 filters, it produces 64 feature maps. Those maps become the input channels for the next layer. This explains why deeper CNNs often have increasing channel counts. As spatial resolution shrinks, the model can afford to represent more feature types. Three settings strongly affect how a convolution behaves. Stride controls how far the filter moves between positions. A stride of 1 means the filter moves one pixel at a time. A larger stride reduces spatial resolution more aggressively. Padding adds extra border values, often zeros, around the input. Padding helps preserve spatial size and allows edge pixels to participate more fully in computations. Dilation spaces out the filter elements. Instead of sampling adjacent positions only, the filter can view a wider area while keeping the same number of weights. These are not minor implementation details. They change what information each unit sees and how quickly the spatial size changes across layers. The PyTorch Conv2d documentation gives the general output-size formula. For one spatial dimension, the output length is \\[\\left\\lfloor \\frac{n + 2p - d(f - 1) - 1}{s} \\right\\rfloor + 1\\] where: \\(n\\) is input size \\(p\\) is padding \\(d\\) is dilation \\(f\\) is filter size \\(s\\) is stride If dilation is 1, this simplifies to the more familiar expression often used in lectures: \\[\\left\\lfloor \\frac{n + 2p - f}{s} \\right\\rfloor + 1\\] Students often lose easy points on exam questions here, so it is worth building intuition. If you increase padding, output size tends to grow. If you increase filter size while keeping everything else fixed, output size tends to shrink. If you increase stride, output size shrinks more quickly because you sample fewer positions. Suppose the input image is \\(32 \\times 32\\), the filter size is 5 , padding is 0 , and stride is 1 . Then the output size is \\[\\left\\lfloor \\frac{32 - 5}{1} \\right\\rfloor + 1 = 28\\] So each filter produces a \\(28 \\times 28\\) feature map. Now suppose we use padding 2 with the same setup: \\[\\left\\lfloor \\frac{32 + 4 - 5}{1} \\right\\rfloor + 1 = 32\\] Now the spatial size is preserved. This is why \\(3 \\times 3\\) filters with padding 1 are so common. They preserve spatial dimensions while still learning local structure. Counting parameters in CNNs is much easier than in dense layers once the pattern is clear. If a convolutional layer has: \\(C_in\\) input channels \\(C_out\\) output channels kernel size \\(f x f\\) then the number of weights is \\[C_{\\mathrm{out}} \\cdot C_{\\mathrm{in}} \\cdot f \\cdot f\\] and if each output channel has a bias term, add \\(C_out\\) more parameters. Example: input channels = 3 output channels = 16 kernel size = \\(3 \\times 3\\) Weights: \\[16 \\cdot 3 \\cdot 3 \\cdot 3 = 432\\] Biases: 16 Total: 448 Compare that with a fully connected layer from \\(32 \\times 32 \\times 3 = 3072\\) inputs to just 100 outputs: \\[3072 \\cdot 100 + 100 = 307300\\] This huge gap helps explain why CNNs are so much more suitable for image data. CNNs often reduce spatial resolution as depth increases. One classical way to do this is pooling. Max pooling replaces a local patch, such as \\(2 \\times 2\\), with its maximum value. Average pooling uses the average instead. Pooling helps in several ways: it reduces computation it increases the effective receptive field of later units it encourages some robustness to small translations it pushes the network toward more abstract representations Historically, pooling was a standard component of CNNs. In more modern architectures, strided convolutions are often used instead of or alongside pooling. The conceptual purpose is similar: reduce spatial resolution while preserving important information. The receptive field of a unit is the region of the original input that can influence that unit. In a shallow layer with a \\(3 \\times 3\\) filter, the receptive field may be only a tiny local patch. After several layers, however, a deeper unit depends indirectly on a much larger part of the image. This matters because recognition requires different scales of understanding. An early layer may detect: edges corners tiny textures A middle layer may detect: repeated motifs contours object parts A deeper layer may respond to: faces wheel-like structures whole object arrangements Receptive field is therefore one of the best concepts for understanding why depth helps. Depth allows small local operations to accumulate into broader contextual understanding. One of the central claims of deep learning is that representations become more abstract as depth increases. CNNs make this especially visible. At the pixel level, the data is low-level and hard to interpret semantically. After the first convolutional layers, the model may detect lines and textures. Later, it can represent larger combinations of those patterns. Eventually it may produce features aligned with object identity or scene structure. This is not magic. It is the result of repeated composition: convolution extracts local patterns nonlinearity reshapes the response normalization stabilizes training downsampling broadens the scale of representation By stacking these operations many times, the network constructs hierarchical features. A common CNN block contains: convolution optional normalization activation such as ReLU sometimes pooling The order may vary by architecture, but the guiding idea is stable: linear feature extraction, nonlinear transformation, and controlled propagation of information. ReLU became especially important because it helps gradients pass more effectively than older saturating nonlinearities such as sigmoid and tanh in many deep settings. This was one reason AlexNet was historically influential. Batch normalization was introduced by Ioffe and Szegedy in 2015. The original paper argued that deep networks are hard to train partly because the distribution of internal activations changes during training. Batch normalization normalizes activations using mini-batch statistics and then learns scale and shift parameters afterward. In practical terms, batch normalization often: stabilizes optimization allows larger learning rates reduces sensitivity to initialization provides some regularization effect The PyTorch BatchNorm2d module is the standard image-oriented version. In CNNs it is often applied per channel across a batch. Students should not memorize batch normalization as a slogan. The deeper point is that training very deep networks is not only about expressive power. It is also about maintaining numerically healthy signal flow. Another major practical idea in image learning is data augmentation. Instead of training only on the original examples, we create modified versions that preserve the label, such as: random crops horizontal flips small rotations color jitter random erasing This effectively enlarges the training distribution and teaches the model to ignore irrelevant variation. AlexNet famously combined architecture improvements with aggressive data augmentation and dropout. This is a useful reminder that breakthroughs often come from a system of ideas rather than one isolated trick. The architecture names in a deep-learning lecture are not trivia. They represent specific solutions to recurring design problems. 6.15.1 LeNet LeNet is an early classic CNN designed for handwritten digit recognition. Its importance is mostly conceptual. It showed that local filters and subsampling were natural tools for image recognition long before modern large-scale deep learning. 6.15.2 AlexNet AlexNet was the major 2012 breakthrough on ImageNet. The original paper by Krizhevsky, Sutskever, and Hinton combined several powerful ideas: deep convolutional structure ReLU activations dropout data augmentation large-scale GPU training AlexNet was not merely a bigger CNN. It demonstrated that deep learned features could dominate hand-engineered vision pipelines when scale and training technique aligned. 6.15.3 VGG VGG pushed the idea of using many small \\(3 \\times 3\\) convolutions stacked deeply. This showed that depth and repeated simple blocks could be very effective. The deeper lesson is that two \\(3 \\times 3\\) convolutions can achieve a larger effective receptive field than one shallow layer while adding more nonlinearities. That increases expressive power. 6.15.4 Inception and GoogLeNet Inception architectures explored multi-branch processing within the same block. Instead of forcing one filter size everywhere, the block uses multiple paths and combines them. This increased representational richness while managing computational cost. 6.15.5 ResNet ResNet addressed a central difficulty of deep networks: once depth becomes very large, optimization can deteriorate even when overfitting is not the main issue. Residual connections made it easier to train very deep models by letting layers learn refinements relative to an identity shortcut. 6.15.6 Xception and MobileNet These architectures pushed efficiency further by using depthwise separable convolutions. The motivation was to reduce computation without giving up too much representational power. 6.15.7 EfficientNet EfficientNet emphasized a different point: scaling a network well is not just making it deeper. Width, depth, and image resolution should be scaled in a balanced way. Taken together, these models show a progression: learn local visual features make training deeper networks possible improve efficiency scale architecture more systematically Depth increases the effective receptive field, and residual shortcuts help deep CNN blocks learn corrections instead of rebuilding the full representation from scratch. Residual connections are one of the most important concepts in modern deep learning. In an ordinary stack of layers, each block must learn a full transformation from input to output. In a residual block, the block learns a correction to an identity path: \\[\\mathrm{output} = F(x) + x\\] where F(x) is the learned residual mapping. Why does this help? If the best behavior for some layers is close to identity, forcing them to learn that from scratch can be difficult. The residual structure gives the identity path for free and asks the block to learn only what should change. This helps: gradient flow optimization of very deep networks reuse of earlier information A useful intuition is that residual blocks do not need to reinvent the representation at every layer. They can refine it gradually. Standard convolution mixes two kinds of structure at once: spatial structure within each channel interactions across channels Depthwise separable convolution splits this into two stages. First, a depthwise convolution applies a spatial filter independently to each channel. Then a pointwise \\(1 \\times 1\\) convolution mixes information across channels. This can greatly reduce computation and parameter count. MobileNet and Xception made this design especially influential. The main lesson is not that standard convolution is obsolete. It is that architectural efficiency often comes from factorizing a large operation into smaller structured ones. Students sometimes wonder what a \\(1 \\times 1\\) convolution could possibly do, since it does not look at a spatial neighborhood. Its job is not spatial aggregation. Its job is channel mixing. A \\(1 \\times 1\\) convolution can: increase or decrease channel dimension combine information across feature maps act as a learned linear projection at each spatial location This makes it extremely useful in Inception blocks, bottleneck residual blocks, and efficient architectures. Transfer learning is one of the most practical ideas in the entire course. Instead of training a deep network from random initialization for every new task, we start from a model pretrained on a large dataset such as ImageNet. Why is this powerful? Because many visual tasks share basic structure. The earliest layers of a pretrained model often learn edges, textures, and shape detectors that are useful across many domains. Transfer learning is especially helpful when: the target dataset is small the target task is related to the source task training compute is limited fast experimentation matters The PyTorch transfer-learning tutorial shows two common strategies that are also useful for exams. 6.19.1 Feature Extraction Freeze most or all pretrained layers and train only a new classifier head. This is fast and works well when the target dataset is small or the task is fairly close to the source domain. 6.19.2 Fine-Tuning Initialize from pretrained weights but allow some or all layers to keep learning on the new dataset. This usually gives stronger task adaptation but requires more care, more compute, and more data. There is no universal rule, but there are good heuristics. Freeze more layers when: the new dataset is small the new domain is similar to the source overfitting is a serious concern Fine-tune more layers when: the new dataset is large enough the target domain differs substantially the final performance matters more than speed A good answer on an exam should mention the tradeoff between reuse and adaptation. Freezing preserves generic knowledge and reduces training burden. Fine-tuning allows specialization but increases the risk of overfitting and instability. The weather or precipitation nowcasting assignment is a beautiful example of why architectural bias matters. The input is a \\(5 \\times 5 \\times 3\\) spatial grid. A dense network can flatten this into a vector, but doing so throws away the very spatial arrangement that likely matters most. A CNN instead treats the input as a tiny image-like object and learns local filters over it. This is exactly the kind of modeling judgment a good machine-learning practitioner must develop. The model should reflect the structure of the data. When the data has: spatial locality nearby interactions translation-like patterns a CNN is usually more natural than a plain multilayer perceptron. There are a few standard calculation types students should be ready for. 6.22.1 Output Shape Given image size, filter size, padding, stride, and dilation, compute the output dimensions. 6.22.2 Parameter Count Given input channels, output channels, and kernel size, compute the number of weights and biases. 6.22.3 Receptive Field Intuition Explain why deeper layers can capture more global structure even if every filter is small. 6.22.4 Architecture Choice Explain why CNNs are preferred over dense networks for images or grids. 6.22.5 Transfer Learning Strategy Explain when you would use frozen pretrained features versus full fine-tuning. These are excellent exam topics because they reveal whether the student understands the mechanics and the reasoning behind them. Students often make the following mistakes. thinking CNNs are just large fully connected networks assuming pooling is the only way to reduce spatial size memorizing architecture names without understanding their contribution claiming ResNet works because it is deeper, without mentioning residual connections and optimization saying transfer learning is useful only when the new task is identical to the old one treating \\(1 \\times 1\\) convolution as pointless because it does not span space Each of these misses the underlying design logic. CNNs are powerful because they encode the right assumptions for spatial data. They use local connectivity, shared filters, and hierarchical feature learning to turn pixels or grids into increasingly meaningful representations. Pooling and strided convolutions reduce spatial size. Receptive fields grow with depth. Batch normalization and residual connections make training deeper networks practical. Efficient architectures such as MobileNet and EfficientNet show that performance depends not only on accuracy but also on computation and scaling strategy. Transfer learning makes these models useful far beyond their original training task. If you remember one sentence from this chapter, remember this: convolutional architectures succeed not because they are mysterious, but because they express the geometry of the data much better than a generic fully connected network does. PyTorch Conv2d documentation: https://docs.pytorch.org/docs/stable/generated/torch.nn.modules.conv.Conv2d.html PyTorch BatchNorm2d documentation: https://docs.pytorch.org/docs/stable/generated/torch.nn.BatchNorm2d Ioffe, S. and Szegedy, C. &quot;Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift&quot; (ICML 2015): https://proceedings.mlr.press/v37/ioffe15.html Krizhevsky, A., Sutskever, I., and Hinton, G. &quot;ImageNet Classification with Deep Convolutional Neural Networks&quot; (NeurIPS 2012): https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks He, K., Zhang, X., Ren, S., and Sun, J. &quot;Deep Residual Learning for Image Recognition&quot; (CVPR 2016): https://openaccess.thecvf.com/content_cvpr_2016/html/He_Deep_Residual_Learning_CVPR_2016_paper.html Chollet, F. &quot;Xception: Deep Learning with Depthwise Separable Convolutions&quot; (CVPR 2017): https://openaccess.thecvf.com/content_cvpr_2017/html/Chollet_Xception_Deep_Learning_CVPR_2017_paper.html Howard, A. et al. &quot;MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications&quot; (2017): https://arxiv.org/abs/1704.04861 Tan, M. and Le, Q. &quot;EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks&quot; (ICML 2019): https://proceedings.mlr.press/v97/tan19a.html PyTorch transfer learning tutorial: https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html CNNs succeed because they stop pretending an image is just a long flat list of numbers. They respect locality, reuse filters across positions, and build higher-level features from lower-level ones. Think of a CNN as a hierarchy of feature detectors. Early filters notice edges and textures. Middle layers combine them into parts. Deeper layers combine parts into larger structures or categories. The same idea of architectural bias shows up again in sequence models and generative AI: the model works better when its structure matches the structure of the data. I can explain local connectivity and weight sharing. I can compute convolution output size from the formula. I can count convolutional parameters without mixing them up with dense-layer counts. I can explain why residual connections and transfer learning matter practically. Convolution output size This gives the output length of one spatial dimension after convolution. Padding grows the effective input, larger filters consume more space, and stride samples fewer positions. Convolution parameter count This counts weights and biases in a standard 2D convolution layer. The key difference from a dense layer is that the same filter weights are reused across spatial locations. Residual block idea A residual block learns a correction on top of an identity path. This helps very deep networks refine representations instead of rebuilding them from scratch every layer. Why a 3 x 3 filter can still build global understanding A single \\(3 \\times 3\\) filter only sees a tiny patch, so it may seem too local to recognize anything meaningful. That is true for one layer only. After several layers, each unit depends on outputs from earlier units, so its effective receptive field grows. Small local filters can therefore accumulate into larger-scale understanding through depth. Why transfer learning is so strong on small datasets You have a small medical-image dataset and cannot train a giant image model from scratch well. A pretrained model already knows many low-level visual patterns such as edges and textures. Reusing those features gives a much better starting point than random initialization, especially when your new dataset is small. Why does parameter sharing help both learning and efficiency? Because the same filter can detect the same kind of pattern anywhere in the image, which reduces parameters and encourages reuse of meaningful local features. Why is a 1 x 1 convolution useful even though it has almost no spatial extent? Because it mixes information across channels and can change channel dimension, acting like a learned projection at each spatial location. What problem did ResNet mainly solve? It mainly improved optimization of very deep networks by allowing identity shortcuts and better gradient flow through residual connections. Why is a CNN more natural than a dense network for a 5 x 5 x 3 weather grid? Because nearby cells have spatial relationships, and a CNN can exploit local structure and shared filters instead of flattening away that geometry. Why is pooling not the only way to shrink spatial size? Because strided convolutions can also reduce spatial dimensions while still learning the downsampling transformation.",
      "target": {
        "view": "reader",
        "topic": "convolutional-networks"
      }
    },
    {
      "kind": "section",
      "topic": "convolutional-networks",
      "title": "CNNs: 6.1 Why Fully Connected Networks Struggle on Images",
      "body": "Suppose we flatten a color image into one giant vector and feed it into a fully connected network. In principle, this can work. A fully connected network is expressive enough to approximate very complex functions. But the representation is wasteful. The problem is not that the network is incapable. The problem is that it has no built-in understanding of spatial structure. In an image: nearby pixels tend to be related edges, corners, and textures often matter more than isolated pixel values the same visual pattern can appear in different locations higher-level concepts such as eyes, wheels, or rooftops are built from smaller local patterns A fully connected layer treats pixel 1 and pixel 10000 as just two coordinates in a vector. It does not know that some pixels are neighbors or that a vertical edge on the left side and the same vertical edge on the right side should be detected by similar computations. This leads to three major inefficiencies: too many parameters weak inductive bias for spatial data poor reuse of learned local patterns Convolutional networks solve these problems by forcing the model to look locally, reuse filters across positions, and build deeper representations from simpler ones.",
      "target": {
        "view": "reader",
        "topic": "convolutional-networks",
        "section": "convolutional-networks-01-why-fully-connected-networks-struggle-on-images"
      }
    },
    {
      "kind": "section",
      "topic": "convolutional-networks",
      "title": "CNNs: 6.2 The Core CNN Bias: Locality and Weight Sharing",
      "body": "Two ideas define CNNs. The first is local connectivity. Instead of connecting every neuron to every pixel, a neuron in a convolutional layer only sees a small patch of the input, such as a \\(3 \\times 3\\) or \\(5 \\times 5\\) region. This matches the idea that many useful visual features are local. The second is parameter sharing. The same learned filter is applied across many positions in the image. If a filter learns to detect a horizontal edge, it can detect that edge anywhere, not just in one fixed location. These two ideas drastically reduce parameter count. They also encourage a model to learn features that generalize across space. This is one of the most important conceptual differences between dense networks and CNNs. A dense network learns many position-specific interactions. A CNN learns reusable local feature detectors.",
      "target": {
        "view": "reader",
        "topic": "convolutional-networks",
        "section": "convolutional-networks-02-the-core-cnn-bias-locality-and-weight-sharing"
      }
    },
    {
      "kind": "section",
      "topic": "convolutional-networks",
      "title": "CNNs: 6.3 What a Convolutional Layer Actually Computes",
      "body": "In deep learning libraries, what is usually called convolution is technically cross-correlation, but the standard name remains convolutional layer. The PyTorch Conv2d documentation describes it as applying a 2D convolution over an input with shape (N, C_in, H, W) to produce an output with shape (N, C_out, H_out, W_out) . Here is the practical picture. We choose a small filter, also called a kernel, such as \\(3 \\times 3\\). That filter contains learned weights. We place it over a local patch of the input, multiply corresponding entries, sum them, optionally add a bias, and produce one output number. Then we slide the filter to another position and repeat the process. The output of one filter over all positions is called a feature map. If we use many filters, we get many feature maps. Each one can learn to respond to a different pattern: horizontal edges vertical edges color contrasts corner-like structures textures Later layers operate on these feature maps rather than raw pixels, allowing the network to build more abstract concepts from simpler ones.",
      "target": {
        "view": "reader",
        "topic": "convolutional-networks",
        "section": "convolutional-networks-03-what-a-convolutional-layer-actually-computes"
      }
    },
    {
      "kind": "section",
      "topic": "convolutional-networks",
      "title": "CNNs: 6.4 Multiple Channels and Learned Features",
      "body": "Real images usually have multiple channels, such as red, green, and blue. Therefore a convolutional filter is not just a small \\(f x f\\) patch. It spans all input channels. For an RGB image, a \\(3 \\times 3\\) filter really has shape \\(3 \\times 3 \\times 3\\). This means a filter is free to learn patterns that combine color and shape. One filter may respond strongly to bright horizontal transitions. Another may react to a particular color contrast. Another may capture texture. The number of output channels equals the number of filters we choose. If a layer has 64 filters, it produces 64 feature maps. Those maps become the input channels for the next layer. This explains why deeper CNNs often have increasing channel counts. As spatial resolution shrinks, the model can afford to represent more feature types.",
      "target": {
        "view": "reader",
        "topic": "convolutional-networks",
        "section": "convolutional-networks-04-multiple-channels-and-learned-features"
      }
    },
    {
      "kind": "section",
      "topic": "convolutional-networks",
      "title": "CNNs: 6.5 Stride, Padding, and Dilation",
      "body": "Three settings strongly affect how a convolution behaves. Stride controls how far the filter moves between positions. A stride of 1 means the filter moves one pixel at a time. A larger stride reduces spatial resolution more aggressively. Padding adds extra border values, often zeros, around the input. Padding helps preserve spatial size and allows edge pixels to participate more fully in computations. Dilation spaces out the filter elements. Instead of sampling adjacent positions only, the filter can view a wider area while keeping the same number of weights. These are not minor implementation details. They change what information each unit sees and how quickly the spatial size changes across layers.",
      "target": {
        "view": "reader",
        "topic": "convolutional-networks",
        "section": "convolutional-networks-05-stride-padding-and-dilation"
      }
    },
    {
      "kind": "section",
      "topic": "convolutional-networks",
      "title": "CNNs: 6.6 Output Size Formula",
      "body": "The PyTorch Conv2d documentation gives the general output-size formula. For one spatial dimension, the output length is \\[\\left\\lfloor \\frac{n + 2p - d(f - 1) - 1}{s} \\right\\rfloor + 1\\] where: \\(n\\) is input size \\(p\\) is padding \\(d\\) is dilation \\(f\\) is filter size \\(s\\) is stride If dilation is 1, this simplifies to the more familiar expression often used in lectures: \\[\\left\\lfloor \\frac{n + 2p - f}{s} \\right\\rfloor + 1\\] Students often lose easy points on exam questions here, so it is worth building intuition. If you increase padding, output size tends to grow. If you increase filter size while keeping everything else fixed, output size tends to shrink. If you increase stride, output size shrinks more quickly because you sample fewer positions.",
      "target": {
        "view": "reader",
        "topic": "convolutional-networks",
        "section": "convolutional-networks-06-output-size-formula"
      }
    },
    {
      "kind": "section",
      "topic": "convolutional-networks",
      "title": "CNNs: 6.7 Worked Example of Convolution Dimensions",
      "body": "Suppose the input image is \\(32 \\times 32\\), the filter size is 5 , padding is 0 , and stride is 1 . Then the output size is \\[\\left\\lfloor \\frac{32 - 5}{1} \\right\\rfloor + 1 = 28\\] So each filter produces a \\(28 \\times 28\\) feature map. Now suppose we use padding 2 with the same setup: \\[\\left\\lfloor \\frac{32 + 4 - 5}{1} \\right\\rfloor + 1 = 32\\] Now the spatial size is preserved. This is why \\(3 \\times 3\\) filters with padding 1 are so common. They preserve spatial dimensions while still learning local structure.",
      "target": {
        "view": "reader",
        "topic": "convolutional-networks",
        "section": "convolutional-networks-07-worked-example-of-convolution-dimensions"
      }
    },
    {
      "kind": "section",
      "topic": "convolutional-networks",
      "title": "CNNs: 6.8 Parameter Counting in CNNs",
      "body": "Counting parameters in CNNs is much easier than in dense layers once the pattern is clear. If a convolutional layer has: \\(C_in\\) input channels \\(C_out\\) output channels kernel size \\(f x f\\) then the number of weights is \\[C_{\\mathrm{out}} \\cdot C_{\\mathrm{in}} \\cdot f \\cdot f\\] and if each output channel has a bias term, add \\(C_out\\) more parameters. Example: input channels = 3 output channels = 16 kernel size = \\(3 \\times 3\\) Weights: \\[16 \\cdot 3 \\cdot 3 \\cdot 3 = 432\\] Biases: 16 Total: 448 Compare that with a fully connected layer from \\(32 \\times 32 \\times 3 = 3072\\) inputs to just 100 outputs: \\[3072 \\cdot 100 + 100 = 307300\\] This huge gap helps explain why CNNs are so much more suitable for image data.",
      "target": {
        "view": "reader",
        "topic": "convolutional-networks",
        "section": "convolutional-networks-08-parameter-counting-in-cnns"
      }
    },
    {
      "kind": "section",
      "topic": "convolutional-networks",
      "title": "CNNs: 6.9 Pooling and Subsampling",
      "body": "CNNs often reduce spatial resolution as depth increases. One classical way to do this is pooling. Max pooling replaces a local patch, such as \\(2 \\times 2\\), with its maximum value. Average pooling uses the average instead. Pooling helps in several ways: it reduces computation it increases the effective receptive field of later units it encourages some robustness to small translations it pushes the network toward more abstract representations Historically, pooling was a standard component of CNNs. In more modern architectures, strided convolutions are often used instead of or alongside pooling. The conceptual purpose is similar: reduce spatial resolution while preserving important information.",
      "target": {
        "view": "reader",
        "topic": "convolutional-networks",
        "section": "convolutional-networks-09-pooling-and-subsampling"
      }
    },
    {
      "kind": "section",
      "topic": "convolutional-networks",
      "title": "CNNs: 6.10 Receptive Field",
      "body": "The receptive field of a unit is the region of the original input that can influence that unit. In a shallow layer with a \\(3 \\times 3\\) filter, the receptive field may be only a tiny local patch. After several layers, however, a deeper unit depends indirectly on a much larger part of the image. This matters because recognition requires different scales of understanding. An early layer may detect: edges corners tiny textures A middle layer may detect: repeated motifs contours object parts A deeper layer may respond to: faces wheel-like structures whole object arrangements Receptive field is therefore one of the best concepts for understanding why depth helps. Depth allows small local operations to accumulate into broader contextual understanding.",
      "target": {
        "view": "reader",
        "topic": "convolutional-networks",
        "section": "convolutional-networks-10-receptive-field"
      }
    },
    {
      "kind": "section",
      "topic": "convolutional-networks",
      "title": "CNNs: 6.11 Why CNNs Learn Hierarchies",
      "body": "One of the central claims of deep learning is that representations become more abstract as depth increases. CNNs make this especially visible. At the pixel level, the data is low-level and hard to interpret semantically. After the first convolutional layers, the model may detect lines and textures. Later, it can represent larger combinations of those patterns. Eventually it may produce features aligned with object identity or scene structure. This is not magic. It is the result of repeated composition: convolution extracts local patterns nonlinearity reshapes the response normalization stabilizes training downsampling broadens the scale of representation By stacking these operations many times, the network constructs hierarchical features.",
      "target": {
        "view": "reader",
        "topic": "convolutional-networks",
        "section": "convolutional-networks-11-why-cnns-learn-hierarchies"
      }
    },
    {
      "kind": "section",
      "topic": "convolutional-networks",
      "title": "CNNs: 6.12 The Standard CNN Block",
      "body": "A common CNN block contains: convolution optional normalization activation such as ReLU sometimes pooling The order may vary by architecture, but the guiding idea is stable: linear feature extraction, nonlinear transformation, and controlled propagation of information. ReLU became especially important because it helps gradients pass more effectively than older saturating nonlinearities such as sigmoid and tanh in many deep settings. This was one reason AlexNet was historically influential.",
      "target": {
        "view": "reader",
        "topic": "convolutional-networks",
        "section": "convolutional-networks-12-the-standard-cnn-block"
      }
    },
    {
      "kind": "section",
      "topic": "convolutional-networks",
      "title": "CNNs: 6.13 Batch Normalization",
      "body": "Batch normalization was introduced by Ioffe and Szegedy in 2015. The original paper argued that deep networks are hard to train partly because the distribution of internal activations changes during training. Batch normalization normalizes activations using mini-batch statistics and then learns scale and shift parameters afterward. In practical terms, batch normalization often: stabilizes optimization allows larger learning rates reduces sensitivity to initialization provides some regularization effect The PyTorch BatchNorm2d module is the standard image-oriented version. In CNNs it is often applied per channel across a batch. Students should not memorize batch normalization as a slogan. The deeper point is that training very deep networks is not only about expressive power. It is also about maintaining numerically healthy signal flow.",
      "target": {
        "view": "reader",
        "topic": "convolutional-networks",
        "section": "convolutional-networks-13-batch-normalization"
      }
    },
    {
      "kind": "section",
      "topic": "convolutional-networks",
      "title": "CNNs: 6.14 Data Augmentation",
      "body": "Another major practical idea in image learning is data augmentation. Instead of training only on the original examples, we create modified versions that preserve the label, such as: random crops horizontal flips small rotations color jitter random erasing This effectively enlarges the training distribution and teaches the model to ignore irrelevant variation. AlexNet famously combined architecture improvements with aggressive data augmentation and dropout. This is a useful reminder that breakthroughs often come from a system of ideas rather than one isolated trick.",
      "target": {
        "view": "reader",
        "topic": "convolutional-networks",
        "section": "convolutional-networks-14-data-augmentation"
      }
    },
    {
      "kind": "section",
      "topic": "convolutional-networks",
      "title": "CNNs: 6.15 Historical Milestones in CNN Design",
      "body": "The architecture names in a deep-learning lecture are not trivia. They represent specific solutions to recurring design problems. 6.15.1 LeNet LeNet is an early classic CNN designed for handwritten digit recognition. Its importance is mostly conceptual. It showed that local filters and subsampling were natural tools for image recognition long before modern large-scale deep learning. 6.15.2 AlexNet AlexNet was the major 2012 breakthrough on ImageNet. The original paper by Krizhevsky, Sutskever, and Hinton combined several powerful ideas: deep convolutional structure ReLU activations dropout data augmentation large-scale GPU training AlexNet was not merely a bigger CNN. It demonstrated that deep learned features could dominate hand-engineered vision pipelines when scale and training technique aligned. 6.15.3 VGG VGG pushed the idea of using many small \\(3 \\times 3\\) convolutions stacked deeply. This showed that depth and repeated simple blocks could be very effective. The deeper lesson is that two \\(3 \\times 3\\) convolutions can achieve a larger effective receptive field than one shallow layer while adding more nonlinearities. That increases expressive power. 6.15.4 Inception and GoogLeNet Inception architectures explored multi-branch processing within the same block. Instead of forcing one filter size everywhere, the block uses multiple paths and combines them. This increased representational richness while managing computational cost. 6.15.5 ResNet ResNet addressed a central difficulty of deep networks: once depth becomes very large, optimization can deteriorate even when overfitting is not the main issue. Residual connections made it easier to train very deep models by letting layers learn refinements relative to an identity shortcut. 6.15.6 Xception and MobileNet These architectures pushed efficiency further by using depthwise separable convolutions. The motivation was to reduce computation without giving up too much representational power. 6.15.7 EfficientNet EfficientNet emphasized a different point: scaling a network well is not just making it deeper. Width, depth, and image resolution should be scaled in a balanced way. Taken together, these models show a progression: learn local visual features make training deeper networks possible improve efficiency scale architecture more systematically Depth increases the effective receptive field, and residual shortcuts help deep CNN blocks learn corrections instead of rebuilding the full representation from scratch.",
      "target": {
        "view": "reader",
        "topic": "convolutional-networks",
        "section": "convolutional-networks-15-historical-milestones-in-cnn-design"
      }
    },
    {
      "kind": "section",
      "topic": "convolutional-networks",
      "title": "CNNs: 6.16 Residual Learning in Depth",
      "body": "Residual connections are one of the most important concepts in modern deep learning. In an ordinary stack of layers, each block must learn a full transformation from input to output. In a residual block, the block learns a correction to an identity path: \\[\\mathrm{output} = F(x) + x\\] where F(x) is the learned residual mapping. Why does this help? If the best behavior for some layers is close to identity, forcing them to learn that from scratch can be difficult. The residual structure gives the identity path for free and asks the block to learn only what should change. This helps: gradient flow optimization of very deep networks reuse of earlier information A useful intuition is that residual blocks do not need to reinvent the representation at every layer. They can refine it gradually.",
      "target": {
        "view": "reader",
        "topic": "convolutional-networks",
        "section": "convolutional-networks-16-residual-learning-in-depth"
      }
    },
    {
      "kind": "section",
      "topic": "convolutional-networks",
      "title": "CNNs: 6.17 Depthwise Separable Convolution",
      "body": "Standard convolution mixes two kinds of structure at once: spatial structure within each channel interactions across channels Depthwise separable convolution splits this into two stages. First, a depthwise convolution applies a spatial filter independently to each channel. Then a pointwise \\(1 \\times 1\\) convolution mixes information across channels. This can greatly reduce computation and parameter count. MobileNet and Xception made this design especially influential. The main lesson is not that standard convolution is obsolete. It is that architectural efficiency often comes from factorizing a large operation into smaller structured ones.",
      "target": {
        "view": "reader",
        "topic": "convolutional-networks",
        "section": "convolutional-networks-17-depthwise-separable-convolution"
      }
    },
    {
      "kind": "section",
      "topic": "convolutional-networks",
      "title": "CNNs: 6.18 `1 x 1` Convolutions",
      "body": "Students sometimes wonder what a \\(1 \\times 1\\) convolution could possibly do, since it does not look at a spatial neighborhood. Its job is not spatial aggregation. Its job is channel mixing. A \\(1 \\times 1\\) convolution can: increase or decrease channel dimension combine information across feature maps act as a learned linear projection at each spatial location This makes it extremely useful in Inception blocks, bottleneck residual blocks, and efficient architectures.",
      "target": {
        "view": "reader",
        "topic": "convolutional-networks",
        "section": "convolutional-networks-18-1-x-1-convolutions"
      }
    },
    {
      "kind": "section",
      "topic": "convolutional-networks",
      "title": "CNNs: 6.19 Transfer Learning",
      "body": "Transfer learning is one of the most practical ideas in the entire course. Instead of training a deep network from random initialization for every new task, we start from a model pretrained on a large dataset such as ImageNet. Why is this powerful? Because many visual tasks share basic structure. The earliest layers of a pretrained model often learn edges, textures, and shape detectors that are useful across many domains. Transfer learning is especially helpful when: the target dataset is small the target task is related to the source task training compute is limited fast experimentation matters The PyTorch transfer-learning tutorial shows two common strategies that are also useful for exams. 6.19.1 Feature Extraction Freeze most or all pretrained layers and train only a new classifier head. This is fast and works well when the target dataset is small or the task is fairly close to the source domain. 6.19.2 Fine-Tuning Initialize from pretrained weights but allow some or all layers to keep learning on the new dataset. This usually gives stronger task adaptation but requires more care, more compute, and more data.",
      "target": {
        "view": "reader",
        "topic": "convolutional-networks",
        "section": "convolutional-networks-19-transfer-learning"
      }
    },
    {
      "kind": "section",
      "topic": "convolutional-networks",
      "title": "CNNs: 6.20 When to Freeze and When to Fine-Tune",
      "body": "There is no universal rule, but there are good heuristics. Freeze more layers when: the new dataset is small the new domain is similar to the source overfitting is a serious concern Fine-tune more layers when: the new dataset is large enough the target domain differs substantially the final performance matters more than speed A good answer on an exam should mention the tradeoff between reuse and adaptation. Freezing preserves generic knowledge and reduces training burden. Fine-tuning allows specialization but increases the risk of overfitting and instability.",
      "target": {
        "view": "reader",
        "topic": "convolutional-networks",
        "section": "convolutional-networks-20-when-to-freeze-and-when-to-fine-tune"
      }
    },
    {
      "kind": "section",
      "topic": "convolutional-networks",
      "title": "CNNs: 6.21 CNNs in the Course Homework",
      "body": "The weather or precipitation nowcasting assignment is a beautiful example of why architectural bias matters. The input is a \\(5 \\times 5 \\times 3\\) spatial grid. A dense network can flatten this into a vector, but doing so throws away the very spatial arrangement that likely matters most. A CNN instead treats the input as a tiny image-like object and learns local filters over it. This is exactly the kind of modeling judgment a good machine-learning practitioner must develop. The model should reflect the structure of the data. When the data has: spatial locality nearby interactions translation-like patterns a CNN is usually more natural than a plain multilayer perceptron.",
      "target": {
        "view": "reader",
        "topic": "convolutional-networks",
        "section": "convolutional-networks-21-cnns-in-the-course-homework"
      }
    },
    {
      "kind": "section",
      "topic": "convolutional-networks",
      "title": "CNNs: 6.22 Common Exam Calculations",
      "body": "There are a few standard calculation types students should be ready for. 6.22.1 Output Shape Given image size, filter size, padding, stride, and dilation, compute the output dimensions. 6.22.2 Parameter Count Given input channels, output channels, and kernel size, compute the number of weights and biases. 6.22.3 Receptive Field Intuition Explain why deeper layers can capture more global structure even if every filter is small. 6.22.4 Architecture Choice Explain why CNNs are preferred over dense networks for images or grids. 6.22.5 Transfer Learning Strategy Explain when you would use frozen pretrained features versus full fine-tuning. These are excellent exam topics because they reveal whether the student understands the mechanics and the reasoning behind them.",
      "target": {
        "view": "reader",
        "topic": "convolutional-networks",
        "section": "convolutional-networks-22-common-exam-calculations"
      }
    },
    {
      "kind": "section",
      "topic": "convolutional-networks",
      "title": "CNNs: 6.23 Common Misunderstandings",
      "body": "Students often make the following mistakes. thinking CNNs are just large fully connected networks assuming pooling is the only way to reduce spatial size memorizing architecture names without understanding their contribution claiming ResNet works because it is deeper, without mentioning residual connections and optimization saying transfer learning is useful only when the new task is identical to the old one treating \\(1 \\times 1\\) convolution as pointless because it does not span space Each of these misses the underlying design logic.",
      "target": {
        "view": "reader",
        "topic": "convolutional-networks",
        "section": "convolutional-networks-23-common-misunderstandings"
      }
    },
    {
      "kind": "section",
      "topic": "convolutional-networks",
      "title": "CNNs: 6.24 Big Picture Summary",
      "body": "CNNs are powerful because they encode the right assumptions for spatial data. They use local connectivity, shared filters, and hierarchical feature learning to turn pixels or grids into increasingly meaningful representations. Pooling and strided convolutions reduce spatial size. Receptive fields grow with depth. Batch normalization and residual connections make training deeper networks practical. Efficient architectures such as MobileNet and EfficientNet show that performance depends not only on accuracy but also on computation and scaling strategy. Transfer learning makes these models useful far beyond their original training task. If you remember one sentence from this chapter, remember this: convolutional architectures succeed not because they are mysterious, but because they express the geometry of the data much better than a generic fully connected network does.",
      "target": {
        "view": "reader",
        "topic": "convolutional-networks",
        "section": "convolutional-networks-24-big-picture-summary"
      }
    },
    {
      "kind": "section",
      "topic": "convolutional-networks",
      "title": "CNNs: 6.25 Primary References Used to Expand This Chapter",
      "body": "PyTorch Conv2d documentation: https://docs.pytorch.org/docs/stable/generated/torch.nn.modules.conv.Conv2d.html PyTorch BatchNorm2d documentation: https://docs.pytorch.org/docs/stable/generated/torch.nn.BatchNorm2d Ioffe, S. and Szegedy, C. &quot;Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift&quot; (ICML 2015): https://proceedings.mlr.press/v37/ioffe15.html Krizhevsky, A., Sutskever, I., and Hinton, G. &quot;ImageNet Classification with Deep Convolutional Neural Networks&quot; (NeurIPS 2012): https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks He, K., Zhang, X., Ren, S., and Sun, J. &quot;Deep Residual Learning for Image Recognition&quot; (CVPR 2016): https://openaccess.thecvf.com/content_cvpr_2016/html/He_Deep_Residual_Learning_CVPR_2016_paper.html Chollet, F. &quot;Xception: Deep Learning with Depthwise Separable Convolutions&quot; (CVPR 2017): https://openaccess.thecvf.com/content_cvpr_2017/html/Chollet_Xception_Deep_Learning_CVPR_2017_paper.html Howard, A. et al. &quot;MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications&quot; (2017): https://arxiv.org/abs/1704.04861 Tan, M. and Le, Q. &quot;EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks&quot; (ICML 2019): https://proceedings.mlr.press/v97/tan19a.html PyTorch transfer learning tutorial: https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html",
      "target": {
        "view": "reader",
        "topic": "convolutional-networks",
        "section": "convolutional-networks-25-primary-references-used-to-expand-this-chapter"
      }
    },
    {
      "kind": "chapter",
      "topic": "recommendation-systems",
      "title": "7 Recommendation Systems",
      "body": "Recommendation systems are among the most important real-world applications of machine learning. Search engines rank documents. Online stores rank products. Video platforms rank videos. Music apps rank songs. Social platforms rank posts and people. In all of these cases, the core task is not merely to predict a label. It is to choose what to show, in what order, for whom, and under what constraints. This makes recommendation both practically powerful and conceptually subtle. It combines prediction, representation learning, ranking, decision-making, and user modeling. It also lives in a world of sparse and biased data: users only interact with a small fraction of the available catalog, and what they see is already shaped by the system itself. This chapter develops recommendation from the ground up. We begin with the basic framing of the problem, then examine content-based methods, collaborative filtering, matrix factorization, hybrid and industrial systems, and the metrics used to evaluate them. The goal is not to memorize a bag of algorithms, but to understand the logic of recommendation deeply enough that you can explain why each method exists and when it should be used. A real recommender is usually a pipeline: user signals and item data feed candidate generation, then a ranking model orders the shortlist and learns from later feedback. The first important point is that recommendation is usually a ranking problem, not a plain classification problem. Suppose a movie platform has 100000 titles. The system does not mainly need to answer &quot;Will the user like movie X?&quot; in isolation. What it really needs is a sorted list of which movies should be placed near the top. That changes the nature of the task: relative order matters top positions matter more than lower positions many items may be acceptable, but only a few can be shown the business goal may involve clicks, watch time, purchases, or long-term satisfaction This is why recommender systems often care more about ranking metrics than about ordinary classification accuracy. Recommendation systems can use many kinds of evidence. Explicit feedback includes: star ratings thumbs up or thumbs down direct likes saved favorites Implicit feedback includes: clicks dwell time watch time purchases skips browsing history repeated plays In many real systems, implicit feedback is far more abundant than explicit feedback. Users rarely rate everything they see, but they constantly generate interaction traces. The challenge is that implicit feedback is ambiguous. A click is not the same as love. A missing click does not prove dislike. The user may simply never have seen the item. A classical way to represent recommendation data is as a user-item matrix. rows are users columns are items entries are ratings or interactions Most entries are missing. This sparsity is not a small inconvenience. It is the central structural fact of recommendation. Even active users interact with only a tiny portion of the full catalog. This sparse setting immediately creates several problems: many user-item pairs are unobserved new users and new items have little history direct supervised labels are incomplete and biased patterns must be learned from limited overlap Recommendation methods differ partly in how they cope with this sparsity. Content-based recommendation focuses on item attributes. The idea is simple: if a user liked certain items, recommend other items that resemble them. To make this work, we need item representations. For a movie, those might include: genre director actors year keywords description text For a condo listing, they might include: location price range size number of bedrooms distance to transportation neighborhood features Once we represent each item as a feature vector, we can build a user profile from the items the user has liked or consumed. A simple version averages the feature vectors of previously liked items. A more advanced system may weight recent or strongly preferred items more heavily. In content-based systems, cosine similarity is one of the most common similarity measures. It compares vectors by angle rather than raw magnitude. This is useful because we often care more about the direction of preference than about the absolute size of the vector. If two item vectors point in similar directions, they share similar feature patterns even if one has larger raw values. Likewise, if a user profile points toward certain genres or themes, cosine similarity helps identify items aligned with that direction. Cosine similarity is especially natural for text-derived features such as TF-IDF vectors or dense semantic embeddings. Many recommendable items come with text: movie summaries product titles app descriptions job postings news headlines Two important representation families appear in the course. 7.6.1 TF-IDF TF-IDF stands for term frequency-inverse document frequency. It gives high weight to words that are frequent within one item description but not frequent across the whole corpus. This makes TF-IDF a strong baseline because it highlights distinctive words. If a condo description repeatedly mentions &quot;near BTS&quot; or a movie synopsis contains unusual topic words, TF-IDF can capture that. 7.6.2 Dense Embeddings Sentence or document embeddings go beyond exact word overlap. They try to map text with similar meaning into nearby vectors. This is valuable because users often care about semantic similarity, not only lexical similarity. Two movie summaries may use different wording but describe similar themes. The big conceptual lesson is that recommendation quality depends heavily on representation quality. Better item representations make content-based recommendation much stronger. Content-based recommendation has several strengths. it can recommend new items as soon as their features are known it is often easier to explain it can use rich metadata and text it works even when user overlap is small But it also has limitations. it depends on having meaningful item features it may over-specialize and recommend items too similar to what the user already consumed it may struggle to discover surprising cross-item taste patterns that are not obvious from metadata alone This is why content-based systems are powerful but rarely sufficient on their own at scale. Collaborative filtering takes a different approach. Instead of focusing mainly on item content, it learns from patterns of interaction across many users. The core intuition is: users who behaved similarly in the past may behave similarly in the future items consumed by similar groups of users may have similar recommendation value This lets the system discover latent taste structure even when no explicit content features are available. Collaborative filtering is one of the defining ideas of recommendation because it uses community behavior as a signal. It often captures preferences humans would struggle to encode manually. The most intuitive collaborative-filtering methods are neighborhood methods. In user-user collaborative filtering: find users similar to the target user look at what those users liked recommend those items In item-item collaborative filtering: find items similar to those the user already consumed recommend related items Item-item methods often work well in practice because item relationships can be more stable than user relationships. Amazon&#x27;s famous &quot;people who bought this also bought...&quot; idea is closely related to this logic. Neighborhood methods are useful to learn because they make collaborative filtering intuitive. They also show clearly that recommendation is built from similarity structure, not only from labels. Before learning a complex model, it is often useful to model simple effects. For ratings data, a strong classical baseline is: \\[\\hat{r}_{ui} = \\mu + b_u + b_i\\] where: mu is the global mean rating \\(b_u\\) is a user bias \\(b_i\\) is an item bias Why is this useful? Because some users systematically rate high or low, and some items are broadly popular or unpopular. A good recommender should not force latent factors to relearn these obvious effects from scratch. This leads naturally into matrix factorization with biases. Matrix factorization treats the sparse rating table as the product of user-taste vectors and item-trait vectors, so preference becomes an interaction in a lower-dimensional latent space. Matrix factorization is one of the most important ideas in modern recommendation. Koren, Bell, and Volinsky&#x27;s 2009 paper made this especially influential. The idea is to approximate the user-item matrix using low-dimensional latent vectors: each user gets an embedding \\(p_u\\) each item gets an embedding \\(q_i\\) The predicted preference is often modeled as \\[\\hat{r}_{ui} = \\mu + b_u + b_i + p_u^T q_i\\] The dot product measures how compatible the user and item are in latent space. This is powerful because the model can discover hidden dimensions of taste without requiring manual labels for them. One latent direction may correspond roughly to &quot;prefers action-heavy blockbusters.&quot; Another may correspond to &quot;likes slow serious dramas.&quot; Another may capture &quot;prefers old classics over recent releases.&quot; No human had to predefine those factors. They emerge from the interaction data. Why should a low-dimensional factorization work at all? Because user preferences are usually not arbitrary. They are driven by a smaller number of underlying tendencies or factors. If the full user-item matrix has structure, then a lower-rank approximation can capture a large share of that structure compactly. This is the same broad mathematical idea that appears in PCA: high-dimensional observations may be governed by lower-dimensional patterns. The difference is that matrix factorization in recommendation is optimized to explain user-item interactions rather than generic variance. One of the most important industrial realities is that many systems do not have explicit ratings at all. Instead, they have implicit data such as views, clicks, or purchases. Hu, Koren, and Volinsky&#x27;s 2008 work on implicit feedback is important here. Their key insight is that observed interactions indicate preference with varying confidence, while missing entries are not plain negative labels. This changes the learning problem. In implicit recommendation: observed actions often mean &quot;the user probably had some interest&quot; unobserved items may be unknown, irrelevant, or simply unseen confidence differs across interaction types This is why naive treatment of zeros as dislike is often misleading. Cold start is central to recommendation. 7.14.1 New User Cold Start A new user has little or no interaction history. Collaborative methods struggle because the system does not yet know where to place that user in taste space. 7.14.2 New Item Cold Start A new item has not yet accumulated interactions, so collaborative methods do not know which users it should match. Content-based signals help especially on the new-item side because the item can be recommended from its features before many interactions arrive. This is one of the strongest reasons hybrid systems are common. In practice, many high-performing recommenders combine multiple signals: content-based features collaborative signals user context sequence behavior popularity priors business rules Hybrid systems exist because no single method solves every part of the recommendation problem. Content-based methods help with explainability and new items. Collaborative methods help uncover latent community taste. Sequential models help reflect recent intent. Business heuristics help enforce platform goals and safety constraints. A mature recommender is usually a system, not a single formula. Google&#x27;s Wide and Deep paper gives a useful industrial framing. Recommendation often needs both memorization and generalization. Memorization means remembering specific feature interactions that historically worked well. For example, a particular user segment may love a specific kind of app. Generalization means using embeddings and dense representations to recommend plausible new combinations not seen often before. The wide part captures memorized sparse interactions. The deep part learns more general patterns. Together they address an important real-world tradeoff. This is a very good concept to remember for the final because it explains why deep models alone are not automatically sufficient. Large-scale recommenders rarely score every item in the catalog with a heavy model for every request. The catalog may contain millions of items. A common architecture is therefore two-stage: 7.17.1 Candidate Generation Retrieve a manageable set of plausible items from the full catalog. This stage values speed and recall. It should avoid missing good candidates. 7.17.2 Ranking or Re-Ranking Apply a stronger model to that smaller candidate set. This stage values fine ranking quality. It can use richer features because the candidate set is smaller. The YouTube recommendation paper by Covington, Adams, and Sargin explains this industrial split clearly. This design is one of the most important high-level patterns in recommendation engineering. User preferences are not static. What someone liked years ago may matter less than what they clicked five minutes ago. Recommendation often benefits from: recency session context time of day device context short-term sequence patterns A user who has watched several children&#x27;s videos in a row is in a different moment than a user whose long-term history contains one children&#x27;s video among many unrelated activities. This motivates sequence-aware recommendation and connects recommendation to sequence models studied elsewhere in the course. Because recommendation is a ranking problem, evaluation should emphasize ranked quality. Important metrics include: Precision@K Recall@K Hit Rate Average Precision Mean Average Precision Mean Reciprocal Rank nDCG These metrics answer slightly different questions. Precision@K asks: among the top \\(K\\) shown items, how many were relevant? Recall@K asks: of all relevant items, how many did we manage to surface in the top \\(K\\)? MRR focuses on how early the first relevant item appears. nDCG rewards ranking relevant items high while discounting lower positions. Students should not merely memorize names. They should understand that the top of the ranking matters much more than the bottom. Offline evaluation is useful, but it is not the whole story. A recommender may improve an offline metric yet fail to improve real user outcomes. Why? Because real systems operate in a feedback loop: the system decides what users see what users see affects what they click those clicks affect future training data Online success may be measured by: click-through rate watch time conversion retention satisfaction diversity of exposure An especially important caution is that missing interaction does not mean irrelevance. The user may never have seen the item. This selection bias makes offline recommendation evaluation fundamentally tricky. A recommender that only shows the safest similar items may get stuck in a narrow loop. This can reduce discovery and long-term satisfaction. Therefore practical systems often care not only about immediate relevance, but also about: diversity novelty serendipity coverage These ideas matter because recommendation is not just prediction. It shapes what the user experiences. Another deep issue is exploration versus exploitation. If a system always recommends what it already thinks is best, it may never gather evidence about other possibilities. But if it explores too aggressively, user experience may suffer. A good recommender balances: exploitation of what currently seems promising exploration to learn more about users and items Even if your course treats this only lightly, the idea is worth understanding because it explains why recommendation is tied to online decision-making. Typical exam questions on recommendation often ask you to: compare content-based and collaborative filtering explain cold start interpret cosine similarity describe matrix factorization intuitively explain why ranking metrics are preferred discuss why implicit feedback is difficult describe a two-stage recommender pipeline The strongest answers will not only define terms but also explain why each method exists. Students often make the following mistakes. treating recommendation as ordinary classification assuming missing interaction means dislike claiming collaborative filtering needs item metadata claiming content-based recommendation can solve everything if enough features are added forgetting that ranking position matters describing matrix factorization as merely compressing the matrix without explaining latent preference structure These mistakes usually happen when someone memorizes vocabulary without understanding the task structure. Recommendation systems predict and rank items for users under sparse, biased, and dynamic data conditions. Content-based methods use item features and profile similarity. Collaborative filtering uses interaction patterns across users and items. Matrix factorization learns latent user and item vectors that explain preference structure compactly. Hybrid systems combine content, collaboration, sequence, and business constraints. Real systems often use candidate generation followed by ranking. Evaluation must respect the fact that recommendation is a ranking problem embedded in a live feedback loop. If you remember one sentence from this chapter, remember this: a recommender is not just trying to predict what is good in general, but what should be shown next to this user, from this catalog, under this context, and in this order. Koren, Y., Bell, R., and Volinsky, C. &quot;Matrix Factorization Techniques for Recommender Systems&quot; (IEEE Computer 2009): https://www.chrisvolinsky.com/publications/17545-matrix-factorization-techniques-for-recommender-systems Hu, Y., Koren, Y., and Volinsky, C. &quot;Collaborative Filtering for Implicit Feedback Datasets&quot; (ICDM 2008): https://www.chrisvolinsky.com/publications/17546-collaborative-filtering-for-implicit-feedback-datasets Covington, P., Adams, J., and Sargin, E. &quot;Deep Neural Networks for YouTube Recommendations&quot; (RecSys 2016): https://research.google/pubs/pub45530 Cheng, H. et al. &quot;Wide &amp; Deep Learning for Recommender Systems&quot; (2016): https://research.google/pubs/pub45413 A recommender is trying to decide what to show next, to whom, and in what order. That makes it a ranking problem shaped by sparse data, behavior feedback, and changing user intent. Picture a huge user-item table with almost every cell missing. Recommendation is the art of filling in useful parts of that table or ranking promising items even when direct evidence is very sparse. Sequence models and generative systems later reuse many of the same ideas: embeddings, context, retrieval, ranking, and behavior prediction under uncertainty. I can explain why recommendation is ranking, not just classification. I can compare content-based, collaborative, and latent-factor approaches. I can explain new-user and new-item cold start clearly. I can explain why implicit feedback is useful but noisy. Bias baseline A strong baseline prediction includes the global mean plus user and item biases. Some users systematically rate high or low, and some items are broadly popular or unpopular even before latent taste factors enter. Latent factor model The interaction between user and item embeddings estimates how well they fit in latent taste space. The dot product becomes large when the user vector aligns well with the item's hidden factors. Precision at K This tells us how concentrated the top of the ranking is with useful items. Recommendation quality depends heavily on what appears near the top because users rarely inspect the entire list. Why collaborative filtering can discover hidden taste Two movies may look different by genre tags, but the same unusual set of users consistently loves both. A collaborative method can notice that shared behavior pattern even if the metadata never explicitly described the hidden connection. That is why collaborative filtering can uncover taste structure beyond surface item features. Why missing data is not the same as negative data A user did not click a video. That could mean the user disliked it, but it could also mean the user never saw it. Recommendation data is therefore biased by exposure, which makes implicit-feedback learning and evaluation more delicate than standard supervised labeling. Why can content-based recommendation help with brand-new items better than pure collaborative filtering? Because a new item can be represented from its known features immediately, while collaborative methods need interaction history before they know where that item belongs in behavior space. Why do large systems use candidate generation before ranking? Because scoring an enormous catalog with a heavy model for every request is too expensive, so a fast stage first narrows the catalog to a plausible smaller set. What is the danger of optimizing only click-through rate? It can favor short-term engagement while ignoring diversity, novelty, satisfaction, or long-term user value. Why do embeddings help recommendation beyond hand-built metadata? Because embeddings can capture hidden structure and interaction patterns that are not explicitly described by manual item fields. Why is evaluation harder in recommendation than in many classification problems? Because the system only observes interactions on exposed items, ranking order matters, and the model's own behavior shapes the future data it gets to learn from.",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems"
      }
    },
    {
      "kind": "section",
      "topic": "recommendation-systems",
      "title": "Recommendation: 7.1 Recommendation Is a Ranking Problem",
      "body": "The first important point is that recommendation is usually a ranking problem, not a plain classification problem. Suppose a movie platform has 100000 titles. The system does not mainly need to answer &quot;Will the user like movie X?&quot; in isolation. What it really needs is a sorted list of which movies should be placed near the top. That changes the nature of the task: relative order matters top positions matter more than lower positions many items may be acceptable, but only a few can be shown the business goal may involve clicks, watch time, purchases, or long-term satisfaction This is why recommender systems often care more about ranking metrics than about ordinary classification accuracy.",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems",
        "section": "recommendation-systems-01-recommendation-is-a-ranking-problem"
      }
    },
    {
      "kind": "section",
      "topic": "recommendation-systems",
      "title": "Recommendation: 7.2 What Data Does a Recommender Use?",
      "body": "Recommendation systems can use many kinds of evidence. Explicit feedback includes: star ratings thumbs up or thumbs down direct likes saved favorites Implicit feedback includes: clicks dwell time watch time purchases skips browsing history repeated plays In many real systems, implicit feedback is far more abundant than explicit feedback. Users rarely rate everything they see, but they constantly generate interaction traces. The challenge is that implicit feedback is ambiguous. A click is not the same as love. A missing click does not prove dislike. The user may simply never have seen the item.",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems",
        "section": "recommendation-systems-02-what-data-does-a-recommender-use"
      }
    },
    {
      "kind": "section",
      "topic": "recommendation-systems",
      "title": "Recommendation: 7.3 Users, Items, and the Sparse Matrix View",
      "body": "A classical way to represent recommendation data is as a user-item matrix. rows are users columns are items entries are ratings or interactions Most entries are missing. This sparsity is not a small inconvenience. It is the central structural fact of recommendation. Even active users interact with only a tiny portion of the full catalog. This sparse setting immediately creates several problems: many user-item pairs are unobserved new users and new items have little history direct supervised labels are incomplete and biased patterns must be learned from limited overlap Recommendation methods differ partly in how they cope with this sparsity.",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems",
        "section": "recommendation-systems-03-users-items-and-the-sparse-matrix-view"
      }
    },
    {
      "kind": "section",
      "topic": "recommendation-systems",
      "title": "Recommendation: 7.4 Content-Based Recommendation",
      "body": "Content-based recommendation focuses on item attributes. The idea is simple: if a user liked certain items, recommend other items that resemble them. To make this work, we need item representations. For a movie, those might include: genre director actors year keywords description text For a condo listing, they might include: location price range size number of bedrooms distance to transportation neighborhood features Once we represent each item as a feature vector, we can build a user profile from the items the user has liked or consumed. A simple version averages the feature vectors of previously liked items. A more advanced system may weight recent or strongly preferred items more heavily.",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems",
        "section": "recommendation-systems-04-content-based-recommendation"
      }
    },
    {
      "kind": "section",
      "topic": "recommendation-systems",
      "title": "Recommendation: 7.5 Why Cosine Similarity Appears So Often",
      "body": "In content-based systems, cosine similarity is one of the most common similarity measures. It compares vectors by angle rather than raw magnitude. This is useful because we often care more about the direction of preference than about the absolute size of the vector. If two item vectors point in similar directions, they share similar feature patterns even if one has larger raw values. Likewise, if a user profile points toward certain genres or themes, cosine similarity helps identify items aligned with that direction. Cosine similarity is especially natural for text-derived features such as TF-IDF vectors or dense semantic embeddings.",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems",
        "section": "recommendation-systems-05-why-cosine-similarity-appears-so-often"
      }
    },
    {
      "kind": "section",
      "topic": "recommendation-systems",
      "title": "Recommendation: 7.6 Text Features: TF-IDF and Embeddings",
      "body": "Many recommendable items come with text: movie summaries product titles app descriptions job postings news headlines Two important representation families appear in the course. 7.6.1 TF-IDF TF-IDF stands for term frequency-inverse document frequency. It gives high weight to words that are frequent within one item description but not frequent across the whole corpus. This makes TF-IDF a strong baseline because it highlights distinctive words. If a condo description repeatedly mentions &quot;near BTS&quot; or a movie synopsis contains unusual topic words, TF-IDF can capture that. 7.6.2 Dense Embeddings Sentence or document embeddings go beyond exact word overlap. They try to map text with similar meaning into nearby vectors. This is valuable because users often care about semantic similarity, not only lexical similarity. Two movie summaries may use different wording but describe similar themes. The big conceptual lesson is that recommendation quality depends heavily on representation quality. Better item representations make content-based recommendation much stronger.",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems",
        "section": "recommendation-systems-06-text-features-tf-idf-and-embeddings"
      }
    },
    {
      "kind": "section",
      "topic": "recommendation-systems",
      "title": "Recommendation: 7.7 Strengths and Weaknesses of Content-Based Methods",
      "body": "Content-based recommendation has several strengths. it can recommend new items as soon as their features are known it is often easier to explain it can use rich metadata and text it works even when user overlap is small But it also has limitations. it depends on having meaningful item features it may over-specialize and recommend items too similar to what the user already consumed it may struggle to discover surprising cross-item taste patterns that are not obvious from metadata alone This is why content-based systems are powerful but rarely sufficient on their own at scale.",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems",
        "section": "recommendation-systems-07-strengths-and-weaknesses-of-content-based-methods"
      }
    },
    {
      "kind": "section",
      "topic": "recommendation-systems",
      "title": "Recommendation: 7.8 Collaborative Filtering",
      "body": "Collaborative filtering takes a different approach. Instead of focusing mainly on item content, it learns from patterns of interaction across many users. The core intuition is: users who behaved similarly in the past may behave similarly in the future items consumed by similar groups of users may have similar recommendation value This lets the system discover latent taste structure even when no explicit content features are available. Collaborative filtering is one of the defining ideas of recommendation because it uses community behavior as a signal. It often captures preferences humans would struggle to encode manually.",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems",
        "section": "recommendation-systems-08-collaborative-filtering"
      }
    },
    {
      "kind": "section",
      "topic": "recommendation-systems",
      "title": "Recommendation: 7.9 User-User and Item-Item Neighborhood Methods",
      "body": "The most intuitive collaborative-filtering methods are neighborhood methods. In user-user collaborative filtering: find users similar to the target user look at what those users liked recommend those items In item-item collaborative filtering: find items similar to those the user already consumed recommend related items Item-item methods often work well in practice because item relationships can be more stable than user relationships. Amazon&#x27;s famous &quot;people who bought this also bought...&quot; idea is closely related to this logic. Neighborhood methods are useful to learn because they make collaborative filtering intuitive. They also show clearly that recommendation is built from similarity structure, not only from labels.",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems",
        "section": "recommendation-systems-09-user-user-and-item-item-neighborhood-methods"
      }
    },
    {
      "kind": "section",
      "topic": "recommendation-systems",
      "title": "Recommendation: 7.10 Baselines Matter More Than Students Expect",
      "body": "Before learning a complex model, it is often useful to model simple effects. For ratings data, a strong classical baseline is: \\[\\hat{r}_{ui} = \\mu + b_u + b_i\\] where: mu is the global mean rating \\(b_u\\) is a user bias \\(b_i\\) is an item bias Why is this useful? Because some users systematically rate high or low, and some items are broadly popular or unpopular. A good recommender should not force latent factors to relearn these obvious effects from scratch. This leads naturally into matrix factorization with biases. Matrix factorization treats the sparse rating table as the product of user-taste vectors and item-trait vectors, so preference becomes an interaction in a lower-dimensional latent space.",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems",
        "section": "recommendation-systems-10-baselines-matter-more-than-students-expect"
      }
    },
    {
      "kind": "section",
      "topic": "recommendation-systems",
      "title": "Recommendation: 7.11 Matrix Factorization",
      "body": "Matrix factorization is one of the most important ideas in modern recommendation. Koren, Bell, and Volinsky&#x27;s 2009 paper made this especially influential. The idea is to approximate the user-item matrix using low-dimensional latent vectors: each user gets an embedding \\(p_u\\) each item gets an embedding \\(q_i\\) The predicted preference is often modeled as \\[\\hat{r}_{ui} = \\mu + b_u + b_i + p_u^T q_i\\] The dot product measures how compatible the user and item are in latent space. This is powerful because the model can discover hidden dimensions of taste without requiring manual labels for them. One latent direction may correspond roughly to &quot;prefers action-heavy blockbusters.&quot; Another may correspond to &quot;likes slow serious dramas.&quot; Another may capture &quot;prefers old classics over recent releases.&quot; No human had to predefine those factors. They emerge from the interaction data.",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems",
        "section": "recommendation-systems-11-matrix-factorization"
      }
    },
    {
      "kind": "section",
      "topic": "recommendation-systems",
      "title": "Recommendation: 7.12 Why Low-Rank Structure Helps",
      "body": "Why should a low-dimensional factorization work at all? Because user preferences are usually not arbitrary. They are driven by a smaller number of underlying tendencies or factors. If the full user-item matrix has structure, then a lower-rank approximation can capture a large share of that structure compactly. This is the same broad mathematical idea that appears in PCA: high-dimensional observations may be governed by lower-dimensional patterns. The difference is that matrix factorization in recommendation is optimized to explain user-item interactions rather than generic variance.",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems",
        "section": "recommendation-systems-12-why-low-rank-structure-helps"
      }
    },
    {
      "kind": "section",
      "topic": "recommendation-systems",
      "title": "Recommendation: 7.13 Implicit Feedback Is Not the Same as Ratings",
      "body": "One of the most important industrial realities is that many systems do not have explicit ratings at all. Instead, they have implicit data such as views, clicks, or purchases. Hu, Koren, and Volinsky&#x27;s 2008 work on implicit feedback is important here. Their key insight is that observed interactions indicate preference with varying confidence, while missing entries are not plain negative labels. This changes the learning problem. In implicit recommendation: observed actions often mean &quot;the user probably had some interest&quot; unobserved items may be unknown, irrelevant, or simply unseen confidence differs across interaction types This is why naive treatment of zeros as dislike is often misleading.",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems",
        "section": "recommendation-systems-13-implicit-feedback-is-not-the-same-as-ratings"
      }
    },
    {
      "kind": "section",
      "topic": "recommendation-systems",
      "title": "Recommendation: 7.14 Cold Start",
      "body": "Cold start is central to recommendation. 7.14.1 New User Cold Start A new user has little or no interaction history. Collaborative methods struggle because the system does not yet know where to place that user in taste space. 7.14.2 New Item Cold Start A new item has not yet accumulated interactions, so collaborative methods do not know which users it should match. Content-based signals help especially on the new-item side because the item can be recommended from its features before many interactions arrive. This is one of the strongest reasons hybrid systems are common.",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems",
        "section": "recommendation-systems-14-cold-start"
      }
    },
    {
      "kind": "section",
      "topic": "recommendation-systems",
      "title": "Recommendation: 7.15 Hybrid Recommendation",
      "body": "In practice, many high-performing recommenders combine multiple signals: content-based features collaborative signals user context sequence behavior popularity priors business rules Hybrid systems exist because no single method solves every part of the recommendation problem. Content-based methods help with explainability and new items. Collaborative methods help uncover latent community taste. Sequential models help reflect recent intent. Business heuristics help enforce platform goals and safety constraints. A mature recommender is usually a system, not a single formula.",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems",
        "section": "recommendation-systems-15-hybrid-recommendation"
      }
    },
    {
      "kind": "section",
      "topic": "recommendation-systems",
      "title": "Recommendation: 7.16 Memorization and Generalization",
      "body": "Google&#x27;s Wide and Deep paper gives a useful industrial framing. Recommendation often needs both memorization and generalization. Memorization means remembering specific feature interactions that historically worked well. For example, a particular user segment may love a specific kind of app. Generalization means using embeddings and dense representations to recommend plausible new combinations not seen often before. The wide part captures memorized sparse interactions. The deep part learns more general patterns. Together they address an important real-world tradeoff. This is a very good concept to remember for the final because it explains why deep models alone are not automatically sufficient.",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems",
        "section": "recommendation-systems-16-memorization-and-generalization"
      }
    },
    {
      "kind": "section",
      "topic": "recommendation-systems",
      "title": "Recommendation: 7.17 Two-Stage Industrial Pipelines",
      "body": "Large-scale recommenders rarely score every item in the catalog with a heavy model for every request. The catalog may contain millions of items. A common architecture is therefore two-stage: 7.17.1 Candidate Generation Retrieve a manageable set of plausible items from the full catalog. This stage values speed and recall. It should avoid missing good candidates. 7.17.2 Ranking or Re-Ranking Apply a stronger model to that smaller candidate set. This stage values fine ranking quality. It can use richer features because the candidate set is smaller. The YouTube recommendation paper by Covington, Adams, and Sargin explains this industrial split clearly. This design is one of the most important high-level patterns in recommendation engineering.",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems",
        "section": "recommendation-systems-17-two-stage-industrial-pipelines"
      }
    },
    {
      "kind": "section",
      "topic": "recommendation-systems",
      "title": "Recommendation: 7.18 Time, Context, and Sequence",
      "body": "User preferences are not static. What someone liked years ago may matter less than what they clicked five minutes ago. Recommendation often benefits from: recency session context time of day device context short-term sequence patterns A user who has watched several children&#x27;s videos in a row is in a different moment than a user whose long-term history contains one children&#x27;s video among many unrelated activities. This motivates sequence-aware recommendation and connects recommendation to sequence models studied elsewhere in the course.",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems",
        "section": "recommendation-systems-18-time-context-and-sequence"
      }
    },
    {
      "kind": "section",
      "topic": "recommendation-systems",
      "title": "Recommendation: 7.19 Evaluation Must Match the Task",
      "body": "Because recommendation is a ranking problem, evaluation should emphasize ranked quality. Important metrics include: Precision@K Recall@K Hit Rate Average Precision Mean Average Precision Mean Reciprocal Rank nDCG These metrics answer slightly different questions. Precision@K asks: among the top \\(K\\) shown items, how many were relevant? Recall@K asks: of all relevant items, how many did we manage to surface in the top \\(K\\)? MRR focuses on how early the first relevant item appears. nDCG rewards ranking relevant items high while discounting lower positions. Students should not merely memorize names. They should understand that the top of the ranking matters much more than the bottom.",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems",
        "section": "recommendation-systems-19-evaluation-must-match-the-task"
      }
    },
    {
      "kind": "section",
      "topic": "recommendation-systems",
      "title": "Recommendation: 7.20 Offline Metrics and Online Reality",
      "body": "Offline evaluation is useful, but it is not the whole story. A recommender may improve an offline metric yet fail to improve real user outcomes. Why? Because real systems operate in a feedback loop: the system decides what users see what users see affects what they click those clicks affect future training data Online success may be measured by: click-through rate watch time conversion retention satisfaction diversity of exposure An especially important caution is that missing interaction does not mean irrelevance. The user may never have seen the item. This selection bias makes offline recommendation evaluation fundamentally tricky.",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems",
        "section": "recommendation-systems-20-offline-metrics-and-online-reality"
      }
    },
    {
      "kind": "section",
      "topic": "recommendation-systems",
      "title": "Recommendation: 7.21 Diversity, Novelty, and Over-Specialization",
      "body": "A recommender that only shows the safest similar items may get stuck in a narrow loop. This can reduce discovery and long-term satisfaction. Therefore practical systems often care not only about immediate relevance, but also about: diversity novelty serendipity coverage These ideas matter because recommendation is not just prediction. It shapes what the user experiences.",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems",
        "section": "recommendation-systems-21-diversity-novelty-and-over-specialization"
      }
    },
    {
      "kind": "section",
      "topic": "recommendation-systems",
      "title": "Recommendation: 7.22 Exploration and Exploitation",
      "body": "Another deep issue is exploration versus exploitation. If a system always recommends what it already thinks is best, it may never gather evidence about other possibilities. But if it explores too aggressively, user experience may suffer. A good recommender balances: exploitation of what currently seems promising exploration to learn more about users and items Even if your course treats this only lightly, the idea is worth understanding because it explains why recommendation is tied to online decision-making.",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems",
        "section": "recommendation-systems-22-exploration-and-exploitation"
      }
    },
    {
      "kind": "section",
      "topic": "recommendation-systems",
      "title": "Recommendation: 7.23 Common Exam Questions",
      "body": "Typical exam questions on recommendation often ask you to: compare content-based and collaborative filtering explain cold start interpret cosine similarity describe matrix factorization intuitively explain why ranking metrics are preferred discuss why implicit feedback is difficult describe a two-stage recommender pipeline The strongest answers will not only define terms but also explain why each method exists.",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems",
        "section": "recommendation-systems-23-common-exam-questions"
      }
    },
    {
      "kind": "section",
      "topic": "recommendation-systems",
      "title": "Recommendation: 7.24 Common Misunderstandings",
      "body": "Students often make the following mistakes. treating recommendation as ordinary classification assuming missing interaction means dislike claiming collaborative filtering needs item metadata claiming content-based recommendation can solve everything if enough features are added forgetting that ranking position matters describing matrix factorization as merely compressing the matrix without explaining latent preference structure These mistakes usually happen when someone memorizes vocabulary without understanding the task structure.",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems",
        "section": "recommendation-systems-24-common-misunderstandings"
      }
    },
    {
      "kind": "section",
      "topic": "recommendation-systems",
      "title": "Recommendation: 7.25 Big Picture Summary",
      "body": "Recommendation systems predict and rank items for users under sparse, biased, and dynamic data conditions. Content-based methods use item features and profile similarity. Collaborative filtering uses interaction patterns across users and items. Matrix factorization learns latent user and item vectors that explain preference structure compactly. Hybrid systems combine content, collaboration, sequence, and business constraints. Real systems often use candidate generation followed by ranking. Evaluation must respect the fact that recommendation is a ranking problem embedded in a live feedback loop. If you remember one sentence from this chapter, remember this: a recommender is not just trying to predict what is good in general, but what should be shown next to this user, from this catalog, under this context, and in this order.",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems",
        "section": "recommendation-systems-25-big-picture-summary"
      }
    },
    {
      "kind": "section",
      "topic": "recommendation-systems",
      "title": "Recommendation: 7.26 Primary References Used to Expand This Chapter",
      "body": "Koren, Y., Bell, R., and Volinsky, C. &quot;Matrix Factorization Techniques for Recommender Systems&quot; (IEEE Computer 2009): https://www.chrisvolinsky.com/publications/17545-matrix-factorization-techniques-for-recommender-systems Hu, Y., Koren, Y., and Volinsky, C. &quot;Collaborative Filtering for Implicit Feedback Datasets&quot; (ICDM 2008): https://www.chrisvolinsky.com/publications/17546-collaborative-filtering-for-implicit-feedback-datasets Covington, P., Adams, J., and Sargin, E. &quot;Deep Neural Networks for YouTube Recommendations&quot; (RecSys 2016): https://research.google/pubs/pub45530 Cheng, H. et al. &quot;Wide &amp; Deep Learning for Recommender Systems&quot; (2016): https://research.google/pubs/pub45413",
      "target": {
        "view": "reader",
        "topic": "recommendation-systems",
        "section": "recommendation-systems-26-primary-references-used-to-expand-this-chapter"
      }
    },
    {
      "kind": "chapter",
      "topic": "sequence-models",
      "title": "8 Sequence Models",
      "body": "Many machine-learning problems cannot be understood correctly unless order is taken seriously. Language is ordered. Speech is ordered. User behavior in a session is ordered. Financial signals are ordered. Weather unfolds over time. In all of these settings, the same set of elements arranged in a different order can mean something completely different. This chapter studies the family of models designed for such data. We begin with recurrent neural networks, explain why they are conceptually natural but hard to train over long ranges, then develop LSTMs, sequence-to-sequence models, attention, and Transformers. These ideas are among the most important bridges between classical deep learning and modern generative AI. The goal is not only to know the names of the architectures. The goal is to understand what problem each one was trying to solve. Sequence models must preserve useful context over time: a plain RNN repeatedly rewrites one hidden state, while an LSTM adds a longer-lived cell state that is controlled by gates. If we ignore order, then many tasks collapse into nonsense. The sentence: dog bites man contains the same words as: man bites dog but the meaning is very different. Likewise, a user who watched three videos about calculus in a row is in a different short-term state than a user who watched one calculus video three years ago. A weather pattern that intensifies over five time steps is different from one that weakens over those same values in reverse order. This is the key reason ordinary feedforward models are often insufficient for sequence tasks. They do not have a built-in mechanism for state that evolves over time. A recurrent neural network, or RNN, processes a sequence one step at a time. At time \\(t\\), it reads the current input \\(x_t\\) together with a hidden state \\(h_{t-1}\\) carried from the previous step. It then updates the hidden state: \\[h_t = \\phi(W_x x_t + W_h h_{t-1} + b)\\] where phi is usually a nonlinearity such as tanh . This recurrence creates memory. The hidden state is meant to summarize the relevant past. That is the beauty of the RNN idea. The same network can process variable-length sequences because it reuses the same parameters at every time step. The fact that an RNN reuses the same weights at every time step is extremely important. Without this sharing, a model handling 100 time steps would need a different set of parameters for each position. That would be wasteful and would not generalize naturally to different sequence lengths. Parameter sharing means: the same update rule is reused over time the model can process variable-length inputs the number of parameters does not grow with sequence length This is why recurrence was such a natural early solution for sequence learning. Sequence models can be used in several structural settings. 8.4.1 Sequence to One A sequence input produces one output. Example: sentiment classification from a sentence. 8.4.2 One to Sequence A fixed input produces a sequence output. Example: image captioning. 8.4.3 Sequence to Sequence A sequence input produces a sequence output. Example: machine translation. 8.4.4 Sequence to Sequence with Aligned Outputs An output is produced at every time step. Example: part-of-speech tagging or frame-by-frame event labeling. Understanding these patterns helps students see that sequence modeling is not one single task but a family of structured problems. Training an RNN uses gradient descent just like other neural networks, but the chain rule must pass through repeated time steps. This procedure is called backpropagation through time, or BPTT. You can think of an RNN unrolled across time as a deep network whose depth equals the number of time steps. The same parameters appear again and again in that unrolled graph. This viewpoint makes the central training difficulty obvious: long sequences create long gradient paths. When gradients are multiplied through many time steps, they can shrink toward zero or grow very large. If they shrink, we get vanishing gradients. Then information from far back in the sequence has very little influence on parameter updates. The model becomes biased toward short-term dependencies. If they grow uncontrollably, we get exploding gradients. Then training becomes unstable and can diverge. This is not a minor technical annoyance. It is the main reason simple RNNs struggle with long-range dependencies. A useful intuition is this: even if the model should remember something from 100 steps ago, gradient signals may die before they get there. Imagine a sentence where the meaning of a later word depends on context introduced much earlier. Or imagine a long time series where a key event at the beginning determines what later states mean. A plain RNN stores everything in one evolving hidden state and repeatedly transforms it. Over many steps, old information can be overwritten, distorted, or simply become inaccessible to learning. This does not mean RNNs are useless. It means their memory mechanism is fragile. The search for better sequence models therefore focused on making memory more stable and selective. Long Short-Term Memory, or LSTM, was introduced by Hochreiter and Schmidhuber in 1997 to address long-range learning difficulties. Later work added forget gates and helped make the architecture more practical. The big idea is that the model should have a more controlled path for memory. Instead of storing everything in one plain hidden state transformation, it maintains a cell state \\(c_t\\) together with gates that regulate information flow. The cell state acts like a memory conveyor belt. Gates decide: what to forget what new information to write what to expose as output This makes it easier for useful information to persist over longer ranges. The forget gate determines how much of the previous cell state should remain: \\[f_t = \\sigma(W_f [h_{t-1}, x_t] + b_f)\\] If a component of \\(f_t\\) is near 1, the corresponding memory is mostly retained. If it is near 0, that memory is mostly discarded. This is conceptually important because good memory is not only about remembering. It is also about forgetting what no longer matters. The input gate determines how much new candidate information should be written into memory: \\[i_t = \\sigma(W_i [h_{t-1}, x_t] + b_i)\\] and a candidate memory is formed, often as \\[g_t = \\tanh(W_g [h_{t-1}, x_t] + b_g)\\] The cell state update then combines retention and writing: \\[c_t = f_t \\cdot c_{t-1} + i_t \\cdot g_t\\] This equation is one of the most important in sequence modeling because it shows why LSTM can maintain more stable information. The old memory is not always completely re-created from scratch. It can be carried forward directly and only selectively modified. The output gate determines how much of the internal memory should be exposed to the hidden state: \\[o_t = \\sigma(W_o [h_{t-1}, x_t] + b_o)\\] and then \\[h_t = o_t \\cdot \\tanh(c_t)\\] This separation between internal memory and exposed state is part of what gives LSTM its flexibility. LSTM does not magically solve every sequence problem, but it greatly improves the ability to learn long-range patterns. The reason is not simply &quot;more parameters.&quot; The reason is architectural control over information flow. The network can: preserve useful memory avoid overwriting it too aggressively selectively reveal information This is why LSTM became a dominant sequence architecture before Transformers took over many large-scale tasks. Although the lecture may focus more on LSTM, it is worth knowing that Gated Recurrent Units, or GRUs, are a related architecture with fewer gates and a somewhat simpler structure. The exam may not require detailed GRU equations, but the conceptual point is useful: many later recurrent architectures tried to keep the gating idea while simplifying the machinery. Some problems require transforming one sequence into another: English sentence to Thai sentence speech signal to text input text to summary question to answer sequence The classical seq2seq architecture uses: an encoder to read the input sequence a decoder to generate the output sequence The 2014 sequence-to-sequence paper by Sutskever, Vinyals, and Le showed that a neural network could learn this mapping end to end with LSTMs. Early seq2seq models often compressed the entire input sequence into one final encoder vector, then asked the decoder to produce the full output from that fixed representation. This worked surprisingly well, but it created a bottleneck. Long or information-rich inputs were hard to compress into one vector without losing useful detail. This bottleneck is one of the main reasons attention became transformative. During training of a decoder, the model often uses teacher forcing. That means the decoder receives the true previous output token as input for the next step rather than the model&#x27;s own previous prediction. This stabilizes training because one early mistake does not immediately corrupt the rest of the generated sequence during learning. But it also creates a mismatch: during training, the decoder sees the true history during inference, it must rely on its own generated history This difference is sometimes called exposure bias. It is a subtle but very important concept. Bahdanau, Cho, and Bengio&#x27;s attention-based translation model addressed the encoder bottleneck by letting the decoder look back at the encoder states at every output step. Instead of one fixed summary vector, the decoder forms a context vector dynamically. It can focus more on whichever source positions matter for the current word being generated. This changed sequence modeling profoundly. The model no longer needed to compress everything into one static memory. It could retrieve relevant source information as needed. Conceptually, attention says: &quot;Do not try to remember everything equally. Learn where to look.&quot; The original attention model is often described as learning alignment. When producing one target token, the decoder assigns scores to different input positions, converts them into weights, and forms a weighted combination of encoder representations. This is a soft search rather than a hard discrete jump. The model can spread attention across several positions if needed. This idea is so important because it replaces one fixed bottleneck with a flexible routing mechanism. Classical attention in seq2seq models connects decoder steps to encoder states. Self-attention generalizes the idea. Here, elements of the same sequence attend to one another. This means a token can directly gather information from other relevant tokens in the input, regardless of how far away they are. That is a major advantage over recurrence, where long-range interaction must pass through many intermediate steps. Attention lets one token look directly at multiple relevant positions, and the Transformer stacks self-attention with feed-forward blocks plus residual connections. The Transformer, introduced in &quot;Attention Is All You Need,&quot; made attention the central computation rather than just an auxiliary mechanism added to RNNs. This was historically decisive. Instead of processing tokens strictly through recurrence, Transformers build contextual representations by repeated attention and feed-forward blocks. This gives two major advantages: much better parallelization during training more direct modeling of long-range interactions That is why Transformers became dominant in language modeling and later in many other domains. The most famous Transformer equation is: \\[\\mathrm{Attention}(Q, K, V) = \\mathrm{softmax}\\!\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V\\] To understand it deeply, forget the symbols for a moment and ask what job each part is doing. Query: what information is this token looking for? Key: what information does each token advertise as relevant? Value: what content should actually be passed along if attention selects that token? Attention scores compare queries with keys. Softmax turns those scores into weights. Those weights combine the values. So attention is a content-addressed lookup mechanism. If the key dimension is large, raw dot products can become large in magnitude. That can make the softmax overly sharp and hurt optimization. Dividing by \\(\\sqrt{d_k}\\) keeps the score scale more controlled. Students often memorize this factor mechanically. A better understanding is that it is there for numerical stability and learning behavior. One attention operation may not capture every kind of relationship needed in a sequence. Multi-head attention lets the model learn several different attention patterns in parallel using separate learned projections. Different heads may specialize in different roles: local syntactic relations long-distance agreement entity reference phrase-level grouping The important point is not that every head becomes humanly interpretable. The point is that multiple attention subspaces increase representational flexibility. If a Transformer only used self-attention with no positional information, then the set of tokens would matter but their order would be ambiguous. Therefore position must be injected somehow. The original Transformer used positional encodings. Later models also use learned positional embeddings or related variants. This reminds us of a deep principle: attention is powerful, but order does not come for free. The original Transformer has both encoder and decoder stacks. Each encoder layer contains: self-attention feed-forward network residual connections normalization Each decoder layer contains: masked self-attention encoder-decoder attention feed-forward network residual connections normalization Masked self-attention prevents the decoder from seeing future target tokens during training. This preserves the autoregressive nature of generation. Just as ResNet helped image models train deeply, residual connections also help Transformer optimization. The model can refine representations rather than rebuild them from zero at each layer. Layer normalization stabilizes hidden representations and helps optimization. Together, these components are part of why deep attention-based stacks can train effectively. Transformers are powerful, but they are not free. RNNs process tokens sequentially, which limits parallelism but keeps memory structure simple. Transformers allow broad parallelization during training, but standard self-attention has cost that grows quickly with sequence length. This is one reason long-context modeling remains an active area of research. A strong student answer should recognize that no architecture is universally best under every resource constraint. When a sequence model generates output autoregressively, it must choose tokens step by step. Greedy decoding picks the highest-probability token each time. Beam search keeps several promising partial sequences alive at once. Beam search is important because locally best token choices do not always lead to globally best sequences. Even if your course treats beam search lightly, the concept is useful: sequence generation involves search, not only local prediction. Transformers became dominant not because recurrence was wrong, but because attention-based models scaled better under modern data and hardware regimes. They offered: better parallel training strong long-range interaction modeling better scaling to large corpora a flexible foundation for pretraining This made them especially effective for language modeling, translation, summarization, and later multimodal generation. Sequence modeling is not an isolated topic. It connects directly to: recommendation through session modeling generative AI through autoregressive text generation machine translation through seq2seq learning evaluation metrics such as BLEU and COMET Understanding sequence models therefore helps unify much of the later course content. Typical questions include: explain why order matters compare feedforward networks and RNNs explain vanishing gradients describe how LSTM gates work explain teacher forcing explain why attention helps seq2seq models interpret the roles of query, key, and value compare RNNs and Transformers The best answers explain the problem each mechanism solves, not just the definition. Students often make the following mistakes. saying RNNs remember everything automatically claiming LSTM completely solves long-range reasoning confusing the cell state with the hidden state thinking teacher forcing is used during normal inference memorizing the attention equation without understanding matching and weighted aggregation claiming Transformers ignore order entirely without noting positional encoding These mistakes usually come from memorizing names without understanding information flow. Sequence models exist because ordered data cannot be treated as ordinary fixed vectors. RNNs introduced recurrent state, but simple recurrence struggles with vanishing and exploding gradients. LSTMs improved memory through gated control of information flow. Sequence-to-sequence learning enabled end-to-end mapping between sequences, while attention removed the bottleneck of fixed encoder summaries. Transformers then made attention the central engine of sequence modeling, enabling powerful contextual learning at scale. If you remember one sentence from this chapter, remember this: sequence modeling is the story of better ways to preserve, access, and update information across positions in ordered data. Hochreiter, S. and Schmidhuber, J. &quot;Long Short-Term Memory&quot; (Neural Computation 1997): https://direct.mit.edu/neco/article/9/8/1735/6109/Long-Short-Term-Memory Gers, F., Schmidhuber, J., and Cummins, F. &quot;Learning to Forget: Continual Prediction with LSTM&quot; (Neural Computation 2000): https://direct.mit.edu/neco/article/12/10/2451/6415/Learning-to-Forget-Continual-Prediction-with-LSTM Sutskever, I., Vinyals, O., and Le, Q. &quot;Sequence to Sequence Learning with Neural Networks&quot; (NeurIPS 2014): https://papers.nips.cc/paper/5346-sequence-to-sequence-learning-with-neural Bahdanau, D., Cho, K., and Bengio, Y. &quot;Neural Machine Translation by Jointly Learning to Align and Translate&quot; (2014): https://arxiv.org/abs/1409.0473 Vaswani, A. et al. &quot;Attention Is All You Need&quot; (NeurIPS 2017): https://papers.nips.cc/paper/7181-attention-is-all-you-need Sequence models exist because order changes meaning. The model must not only know what the pieces are, but also how earlier pieces affect later ones. You can think of sequence modeling as memory management. The central question is always: what information should be preserved, what should be forgotten, and how should the model retrieve the relevant past when it needs it? Large language models and modern generative AI are direct descendants of this topic. If sequence modeling clicks, the jump to autoregressive text generation becomes much easier. I can explain why sequence order changes the problem fundamentally. I can explain vanishing gradients and why LSTM gating helps. I can explain teacher forcing and exposure bias. I can explain attention as learned relevance weighting rather than as a mysterious black box. RNN state update A recurrent model updates its hidden state from the current input and the previous state. The hidden state is trying to summarize the relevant past, but in a plain RNN that memory path is fragile over long ranges. LSTM memory update The cell state keeps part of the old memory and writes selected new content. This is why LSTM can preserve important information more stably than a plain recurrent update. Scaled dot-product attention Attention scores how strongly a query should use each key, then mixes the values using those normalized weights. It is a learned relevance lookup: matching decides where to look, and values provide the content to aggregate. Why LSTM was introduced A plain RNN must carry important information through many repeated transformations, and gradients can vanish or explode before they connect early evidence to late decisions. LSTM creates a more controlled memory path. Forget, input, and output gates regulate what gets kept, written, and exposed, making long-range learning far more stable in practice. Why attention changed the field A decoder trying to generate one token from one fixed encoder vector may lose access to detail from long inputs. Attention replaces that one-vector bottleneck with dynamic lookup over source states. The model can focus on whichever parts of the input matter for the current output step, which is a major conceptual leap. Why is it useful to think of an unrolled RNN as a deep network over time? Because it makes the gradient problem easier to see: long sequences create long paths for error signals, which is exactly why vanishing and exploding gradients appear. Why does teacher forcing help during training but create a mismatch at inference time? Because during training the decoder sees the true previous token, but during inference it must condition on its own predictions, which may include mistakes. Why can Transformers be trained more efficiently on modern hardware than RNNs? Because attention-based layers allow much more parallel computation during training instead of strict token-by-token recurrence. Why are multiple attention heads useful rather than redundant? Because different heads can learn different relevance patterns or relational views of the same sequence in parallel. Why does positional information still matter in a Transformer? Because attention alone does not inherently encode token order, so positional signals are needed to distinguish sequences with the same tokens in different arrangements.",
      "target": {
        "view": "reader",
        "topic": "sequence-models"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.1 Why Sequence Structure Changes the Problem",
      "body": "If we ignore order, then many tasks collapse into nonsense. The sentence: dog bites man contains the same words as: man bites dog but the meaning is very different. Likewise, a user who watched three videos about calculus in a row is in a different short-term state than a user who watched one calculus video three years ago. A weather pattern that intensifies over five time steps is different from one that weakens over those same values in reverse order. This is the key reason ordinary feedforward models are often insufficient for sequence tasks. They do not have a built-in mechanism for state that evolves over time.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-01-why-sequence-structure-changes-the-problem"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.2 Recurrent Neural Networks",
      "body": "A recurrent neural network, or RNN, processes a sequence one step at a time. At time \\(t\\), it reads the current input \\(x_t\\) together with a hidden state \\(h_{t-1}\\) carried from the previous step. It then updates the hidden state: \\[h_t = \\phi(W_x x_t + W_h h_{t-1} + b)\\] where phi is usually a nonlinearity such as tanh . This recurrence creates memory. The hidden state is meant to summarize the relevant past. That is the beauty of the RNN idea. The same network can process variable-length sequences because it reuses the same parameters at every time step.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-02-recurrent-neural-networks"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.3 Why Parameter Sharing Across Time Matters",
      "body": "The fact that an RNN reuses the same weights at every time step is extremely important. Without this sharing, a model handling 100 time steps would need a different set of parameters for each position. That would be wasteful and would not generalize naturally to different sequence lengths. Parameter sharing means: the same update rule is reused over time the model can process variable-length inputs the number of parameters does not grow with sequence length This is why recurrence was such a natural early solution for sequence learning.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-03-why-parameter-sharing-across-time-matters"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.4 Input-Output Patterns in Sequence Tasks",
      "body": "Sequence models can be used in several structural settings. 8.4.1 Sequence to One A sequence input produces one output. Example: sentiment classification from a sentence. 8.4.2 One to Sequence A fixed input produces a sequence output. Example: image captioning. 8.4.3 Sequence to Sequence A sequence input produces a sequence output. Example: machine translation. 8.4.4 Sequence to Sequence with Aligned Outputs An output is produced at every time step. Example: part-of-speech tagging or frame-by-frame event labeling. Understanding these patterns helps students see that sequence modeling is not one single task but a family of structured problems.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-04-input-output-patterns-in-sequence-tasks"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.5 Backpropagation Through Time",
      "body": "Training an RNN uses gradient descent just like other neural networks, but the chain rule must pass through repeated time steps. This procedure is called backpropagation through time, or BPTT. You can think of an RNN unrolled across time as a deep network whose depth equals the number of time steps. The same parameters appear again and again in that unrolled graph. This viewpoint makes the central training difficulty obvious: long sequences create long gradient paths.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-05-backpropagation-through-time"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.6 Vanishing and Exploding Gradients",
      "body": "When gradients are multiplied through many time steps, they can shrink toward zero or grow very large. If they shrink, we get vanishing gradients. Then information from far back in the sequence has very little influence on parameter updates. The model becomes biased toward short-term dependencies. If they grow uncontrollably, we get exploding gradients. Then training becomes unstable and can diverge. This is not a minor technical annoyance. It is the main reason simple RNNs struggle with long-range dependencies. A useful intuition is this: even if the model should remember something from 100 steps ago, gradient signals may die before they get there.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-06-vanishing-and-exploding-gradients"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.7 Why Long-Term Dependencies Are Hard",
      "body": "Imagine a sentence where the meaning of a later word depends on context introduced much earlier. Or imagine a long time series where a key event at the beginning determines what later states mean. A plain RNN stores everything in one evolving hidden state and repeatedly transforms it. Over many steps, old information can be overwritten, distorted, or simply become inaccessible to learning. This does not mean RNNs are useless. It means their memory mechanism is fragile. The search for better sequence models therefore focused on making memory more stable and selective.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-07-why-long-term-dependencies-are-hard"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.8 Long Short-Term Memory",
      "body": "Long Short-Term Memory, or LSTM, was introduced by Hochreiter and Schmidhuber in 1997 to address long-range learning difficulties. Later work added forget gates and helped make the architecture more practical. The big idea is that the model should have a more controlled path for memory. Instead of storing everything in one plain hidden state transformation, it maintains a cell state \\(c_t\\) together with gates that regulate information flow. The cell state acts like a memory conveyor belt. Gates decide: what to forget what new information to write what to expose as output This makes it easier for useful information to persist over longer ranges.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-08-long-short-term-memory"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.9 The Forget Gate",
      "body": "The forget gate determines how much of the previous cell state should remain: \\[f_t = \\sigma(W_f [h_{t-1}, x_t] + b_f)\\] If a component of \\(f_t\\) is near 1, the corresponding memory is mostly retained. If it is near 0, that memory is mostly discarded. This is conceptually important because good memory is not only about remembering. It is also about forgetting what no longer matters.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-09-the-forget-gate"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.10 The Input Gate and Candidate Memory",
      "body": "The input gate determines how much new candidate information should be written into memory: \\[i_t = \\sigma(W_i [h_{t-1}, x_t] + b_i)\\] and a candidate memory is formed, often as \\[g_t = \\tanh(W_g [h_{t-1}, x_t] + b_g)\\] The cell state update then combines retention and writing: \\[c_t = f_t \\cdot c_{t-1} + i_t \\cdot g_t\\] This equation is one of the most important in sequence modeling because it shows why LSTM can maintain more stable information. The old memory is not always completely re-created from scratch. It can be carried forward directly and only selectively modified.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-10-the-input-gate-and-candidate-memory"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.11 The Output Gate",
      "body": "The output gate determines how much of the internal memory should be exposed to the hidden state: \\[o_t = \\sigma(W_o [h_{t-1}, x_t] + b_o)\\] and then \\[h_t = o_t \\cdot \\tanh(c_t)\\] This separation between internal memory and exposed state is part of what gives LSTM its flexibility.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-11-the-output-gate"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.12 Why LSTM Helps",
      "body": "LSTM does not magically solve every sequence problem, but it greatly improves the ability to learn long-range patterns. The reason is not simply &quot;more parameters.&quot; The reason is architectural control over information flow. The network can: preserve useful memory avoid overwriting it too aggressively selectively reveal information This is why LSTM became a dominant sequence architecture before Transformers took over many large-scale tasks.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-12-why-lstm-helps"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.13 GRU in Brief",
      "body": "Although the lecture may focus more on LSTM, it is worth knowing that Gated Recurrent Units, or GRUs, are a related architecture with fewer gates and a somewhat simpler structure. The exam may not require detailed GRU equations, but the conceptual point is useful: many later recurrent architectures tried to keep the gating idea while simplifying the machinery.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-13-gru-in-brief"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.14 Sequence-to-Sequence Learning",
      "body": "Some problems require transforming one sequence into another: English sentence to Thai sentence speech signal to text input text to summary question to answer sequence The classical seq2seq architecture uses: an encoder to read the input sequence a decoder to generate the output sequence The 2014 sequence-to-sequence paper by Sutskever, Vinyals, and Le showed that a neural network could learn this mapping end to end with LSTMs.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-14-sequence-to-sequence-learning"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.15 The Encoder Bottleneck",
      "body": "Early seq2seq models often compressed the entire input sequence into one final encoder vector, then asked the decoder to produce the full output from that fixed representation. This worked surprisingly well, but it created a bottleneck. Long or information-rich inputs were hard to compress into one vector without losing useful detail. This bottleneck is one of the main reasons attention became transformative.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-15-the-encoder-bottleneck"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.16 Teacher Forcing",
      "body": "During training of a decoder, the model often uses teacher forcing. That means the decoder receives the true previous output token as input for the next step rather than the model&#x27;s own previous prediction. This stabilizes training because one early mistake does not immediately corrupt the rest of the generated sequence during learning. But it also creates a mismatch: during training, the decoder sees the true history during inference, it must rely on its own generated history This difference is sometimes called exposure bias. It is a subtle but very important concept.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-16-teacher-forcing"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.17 Attention",
      "body": "Bahdanau, Cho, and Bengio&#x27;s attention-based translation model addressed the encoder bottleneck by letting the decoder look back at the encoder states at every output step. Instead of one fixed summary vector, the decoder forms a context vector dynamically. It can focus more on whichever source positions matter for the current word being generated. This changed sequence modeling profoundly. The model no longer needed to compress everything into one static memory. It could retrieve relevant source information as needed. Conceptually, attention says: &quot;Do not try to remember everything equally. Learn where to look.&quot;",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-17-attention"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.18 Alignment as a Learned Soft Search",
      "body": "The original attention model is often described as learning alignment. When producing one target token, the decoder assigns scores to different input positions, converts them into weights, and forms a weighted combination of encoder representations. This is a soft search rather than a hard discrete jump. The model can spread attention across several positions if needed. This idea is so important because it replaces one fixed bottleneck with a flexible routing mechanism.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-18-alignment-as-a-learned-soft-search"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.19 From Attention to Self-Attention",
      "body": "Classical attention in seq2seq models connects decoder steps to encoder states. Self-attention generalizes the idea. Here, elements of the same sequence attend to one another. This means a token can directly gather information from other relevant tokens in the input, regardless of how far away they are. That is a major advantage over recurrence, where long-range interaction must pass through many intermediate steps. Attention lets one token look directly at multiple relevant positions, and the Transformer stacks self-attention with feed-forward blocks plus residual connections.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-19-from-attention-to-self-attention"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.20 Transformers",
      "body": "The Transformer, introduced in &quot;Attention Is All You Need,&quot; made attention the central computation rather than just an auxiliary mechanism added to RNNs. This was historically decisive. Instead of processing tokens strictly through recurrence, Transformers build contextual representations by repeated attention and feed-forward blocks. This gives two major advantages: much better parallelization during training more direct modeling of long-range interactions That is why Transformers became dominant in language modeling and later in many other domains.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-20-transformers"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.21 Query, Key, and Value",
      "body": "The most famous Transformer equation is: \\[\\mathrm{Attention}(Q, K, V) = \\mathrm{softmax}\\!\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V\\] To understand it deeply, forget the symbols for a moment and ask what job each part is doing. Query: what information is this token looking for? Key: what information does each token advertise as relevant? Value: what content should actually be passed along if attention selects that token? Attention scores compare queries with keys. Softmax turns those scores into weights. Those weights combine the values. So attention is a content-addressed lookup mechanism.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-21-query-key-and-value"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.22 Why the Scaling by `sqrt(d_k)` Appears",
      "body": "If the key dimension is large, raw dot products can become large in magnitude. That can make the softmax overly sharp and hurt optimization. Dividing by \\(\\sqrt{d_k}\\) keeps the score scale more controlled. Students often memorize this factor mechanically. A better understanding is that it is there for numerical stability and learning behavior.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-22-why-the-scaling-by-sqrt-d-k-appears"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.23 Multi-Head Attention",
      "body": "One attention operation may not capture every kind of relationship needed in a sequence. Multi-head attention lets the model learn several different attention patterns in parallel using separate learned projections. Different heads may specialize in different roles: local syntactic relations long-distance agreement entity reference phrase-level grouping The important point is not that every head becomes humanly interpretable. The point is that multiple attention subspaces increase representational flexibility.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-23-multi-head-attention"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.24 Positional Information",
      "body": "If a Transformer only used self-attention with no positional information, then the set of tokens would matter but their order would be ambiguous. Therefore position must be injected somehow. The original Transformer used positional encodings. Later models also use learned positional embeddings or related variants. This reminds us of a deep principle: attention is powerful, but order does not come for free.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-24-positional-information"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.25 Encoder and Decoder in the Transformer",
      "body": "The original Transformer has both encoder and decoder stacks. Each encoder layer contains: self-attention feed-forward network residual connections normalization Each decoder layer contains: masked self-attention encoder-decoder attention feed-forward network residual connections normalization Masked self-attention prevents the decoder from seeing future target tokens during training. This preserves the autoregressive nature of generation.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-25-encoder-and-decoder-in-the-transformer"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.26 Residual Connections and Layer Normalization",
      "body": "Just as ResNet helped image models train deeply, residual connections also help Transformer optimization. The model can refine representations rather than rebuild them from zero at each layer. Layer normalization stabilizes hidden representations and helps optimization. Together, these components are part of why deep attention-based stacks can train effectively.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-26-residual-connections-and-layer-normalization"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.27 Complexity and Tradeoffs",
      "body": "Transformers are powerful, but they are not free. RNNs process tokens sequentially, which limits parallelism but keeps memory structure simple. Transformers allow broad parallelization during training, but standard self-attention has cost that grows quickly with sequence length. This is one reason long-context modeling remains an active area of research. A strong student answer should recognize that no architecture is universally best under every resource constraint.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-27-complexity-and-tradeoffs"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.28 Decoding and Beam Search",
      "body": "When a sequence model generates output autoregressively, it must choose tokens step by step. Greedy decoding picks the highest-probability token each time. Beam search keeps several promising partial sequences alive at once. Beam search is important because locally best token choices do not always lead to globally best sequences. Even if your course treats beam search lightly, the concept is useful: sequence generation involves search, not only local prediction.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-28-decoding-and-beam-search"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.29 Why Transformers Replaced Many RNN Systems",
      "body": "Transformers became dominant not because recurrence was wrong, but because attention-based models scaled better under modern data and hardware regimes. They offered: better parallel training strong long-range interaction modeling better scaling to large corpora a flexible foundation for pretraining This made them especially effective for language modeling, translation, summarization, and later multimodal generation.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-29-why-transformers-replaced-many-rnn-systems"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.30 Sequence Models and the Rest of the Course",
      "body": "Sequence modeling is not an isolated topic. It connects directly to: recommendation through session modeling generative AI through autoregressive text generation machine translation through seq2seq learning evaluation metrics such as BLEU and COMET Understanding sequence models therefore helps unify much of the later course content.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-30-sequence-models-and-the-rest-of-the-course"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.31 Common Exam Questions",
      "body": "Typical questions include: explain why order matters compare feedforward networks and RNNs explain vanishing gradients describe how LSTM gates work explain teacher forcing explain why attention helps seq2seq models interpret the roles of query, key, and value compare RNNs and Transformers The best answers explain the problem each mechanism solves, not just the definition.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-31-common-exam-questions"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.32 Common Misunderstandings",
      "body": "Students often make the following mistakes. saying RNNs remember everything automatically claiming LSTM completely solves long-range reasoning confusing the cell state with the hidden state thinking teacher forcing is used during normal inference memorizing the attention equation without understanding matching and weighted aggregation claiming Transformers ignore order entirely without noting positional encoding These mistakes usually come from memorizing names without understanding information flow.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-32-common-misunderstandings"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.33 Big Picture Summary",
      "body": "Sequence models exist because ordered data cannot be treated as ordinary fixed vectors. RNNs introduced recurrent state, but simple recurrence struggles with vanishing and exploding gradients. LSTMs improved memory through gated control of information flow. Sequence-to-sequence learning enabled end-to-end mapping between sequences, while attention removed the bottleneck of fixed encoder summaries. Transformers then made attention the central engine of sequence modeling, enabling powerful contextual learning at scale. If you remember one sentence from this chapter, remember this: sequence modeling is the story of better ways to preserve, access, and update information across positions in ordered data.",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-33-big-picture-summary"
      }
    },
    {
      "kind": "section",
      "topic": "sequence-models",
      "title": "Sequence Models: 8.34 Primary References Used to Expand This Chapter",
      "body": "Hochreiter, S. and Schmidhuber, J. &quot;Long Short-Term Memory&quot; (Neural Computation 1997): https://direct.mit.edu/neco/article/9/8/1735/6109/Long-Short-Term-Memory Gers, F., Schmidhuber, J., and Cummins, F. &quot;Learning to Forget: Continual Prediction with LSTM&quot; (Neural Computation 2000): https://direct.mit.edu/neco/article/12/10/2451/6415/Learning-to-Forget-Continual-Prediction-with-LSTM Sutskever, I., Vinyals, O., and Le, Q. &quot;Sequence to Sequence Learning with Neural Networks&quot; (NeurIPS 2014): https://papers.nips.cc/paper/5346-sequence-to-sequence-learning-with-neural Bahdanau, D., Cho, K., and Bengio, Y. &quot;Neural Machine Translation by Jointly Learning to Align and Translate&quot; (2014): https://arxiv.org/abs/1409.0473 Vaswani, A. et al. &quot;Attention Is All You Need&quot; (NeurIPS 2017): https://papers.nips.cc/paper/7181-attention-is-all-you-need",
      "target": {
        "view": "reader",
        "topic": "sequence-models",
        "section": "sequence-models-34-primary-references-used-to-expand-this-chapter"
      }
    },
    {
      "kind": "chapter",
      "topic": "generative-ai",
      "title": "9 Generative AI",
      "body": "Generative AI is the part of machine learning concerned with creating new content rather than only predicting existing labels. Modern systems can generate text, code, images, audio, and other structured outputs. Because these models now power chatbots, coding systems, translation tools, image generation, and document assistants, generative AI has become one of the most visible parts of the field. But the public visibility can make the topic feel more magical than it really is. Under the surface, generative AI is built from ideas we have already studied: probability modeling sequence modeling representation learning optimization attention This chapter takes a slow and detailed approach. We begin with the basic meaning of generative modeling, then study autoregressive language models, tokenization, decoding, prompting, instruction tuning, RLHF, evaluation, retrieval, parameter-efficient adaptation, efficiency, safety, and diffusion-based image generation. The aim is to build a strong conceptual foundation rather than a pile of fashionable terms. Modern generative AI is a stack: tokenized data supports pretraining, instruction tuning and RLHF shape behavior, and deployed systems often add retrieval, tools, LoRA adapters, caching, and guardrails. A predictive model usually maps input to a label or number: classify an email as spam or not spam predict house price identify an image category A generative model tries to model a data distribution well enough to produce new samples from it. Depending on the setting, it may model: \\(P(X)\\) for unconditional generation \\(P(X \\mid Y)\\) for conditional generation sometimes joint structure involving both inputs and outputs If the model learns the distribution of natural-language sequences, it can generate text. If it learns the distribution of images, it can generate images. If it learns a conditional mapping from prompt to image, it can generate images guided by language. The deepest difference is this: predictive modeling selects among known outcomes, while generative modeling creates new outputs that should still look plausible under the learned distribution. Language is a natural fit for generative modeling because it is already a sequence. A sentence can be generated token by token. This leads to the autoregressive factorization: \\[P(x_1, x_2, \\ldots, x_T) = \\prod_t P(x_t \\mid x_{&lt;t})\\] In words, the probability of a full sequence is decomposed into next-token prediction conditioned on the previous context. This is one of the most important ideas in generative AI. It means that a model can learn to generate a long output by repeatedly solving a simpler local problem: given the context so far, what token should come next? During training, the model sees real text sequences and is asked to predict the next token at each position. The usual loss is cross-entropy over the vocabulary. This training setup uses teacher forcing: the model is given the true previous tokens it predicts the next true token This is efficient because one training example can contribute prediction loss at many positions at once. The result is a model that has learned a probability distribution over next tokens in context. During inference, the model no longer has access to the future true token. It must generate one token, append it to the context, and continue. This difference matters because errors can compound. A mediocre token choice early in the sequence may pull the rest of the generation in a weaker direction. That is why generation quality depends on two things: the trained model the decoding strategy used at inference time Students often understand the training objective but forget that generation is also a search and control problem. Modern language models do not usually operate on full words directly. Instead they operate on tokens, which may be: whole words subword pieces punctuation marks special symbols Tokenization matters more than beginners expect. It affects: vocabulary size sequence length treatment of rare words multilingual handling efficiency 9.5.1 Why Subword Tokenization Became Standard A pure word-level vocabulary becomes huge and still fails on rare or unseen words. A pure character-level model avoids out-of-vocabulary words but makes sequences much longer and learning harder. Subword tokenization is a compromise. Frequent words may remain whole, while rare words can be broken into meaningful pieces. 9.5.2 BPE and Related Methods The subword-BPE approach popularized by Sennrich, Haddow, and Birch showed how rare-word problems in neural machine translation could be reduced by learning frequent subword merges. WordPiece and similar methods use related ideas. SentencePiece is especially important conceptually because it treats tokenization itself as a learnable text segmentation process and does not rely on whitespace word boundaries. That is useful for languages such as Thai, where whitespace does not segment words in the same way as English. Once text is tokenized, each token is mapped to a vector embedding. In a Transformer-based language model, these embeddings are then contextualized by attention layers. That means the representation of a token is shaped by surrounding tokens. This is why the same token can have different effective meanings in different contexts. The model is not just looking up a static dictionary entry. It is building context-aware representations before predicting the next token. At each generation step, the model produces a probability distribution over the next token. But probabilities alone are not yet output. A decision rule is needed. This is decoding. 9.7.1 Greedy Decoding Greedy decoding selects the highest-probability token at every step. It is fast and simple, but it can become repetitive or get trapped in dull local choices. The locally best next token is not always part of the globally best sequence. 9.7.2 Beam Search Beam search keeps several promising partial sequences instead of only one. It is common in tasks like translation, where fidelity may matter more than creative diversity. However, beam search can still over-favor bland or overly high-probability continuations, and it is not always preferred for open-ended chat generation. 9.7.3 Sampling Sampling draws the next token from the probability distribution. This introduces diversity. But unrestricted sampling can become unstable because low-probability tokens may derail the sequence. 9.7.4 Top-k and Top-p Top-k sampling restricts the choice to the \\(k\\) highest-probability tokens. Top-p, or nucleus sampling, restricts the choice to the smallest token set whose cumulative probability exceeds a threshold \\(p\\). These methods try to balance coherence and diversity. 9.7.5 Temperature Temperature rescales logits before softmax. Lower temperature makes the distribution sharper and more conservative. Higher temperature makes it flatter and more random. Temperature does not change the model&#x27;s knowledge. It changes how boldly or cautiously the model samples from that knowledge. One of the striking discoveries of large language models is that scale changes behavior. The GPT-3 paper showed that sufficiently large autoregressive models can perform many tasks in zero-shot, one-shot, or few-shot settings by conditioning on examples in the prompt. This is called in-context learning. The important conceptual point is that the model is not updating its weights during the prompt. It is adapting behavior from context alone. This is one reason large language models feel unusually flexible. A single pretrained model can perform many tasks if prompted appropriately. Prompting is the practice of shaping the model&#x27;s input so the output better matches the user&#x27;s goal. A strong prompt often includes: the task needed context desired style or role output format examples if useful constraints Prompting matters because a language model is a conditional generator. Small changes in conditioning can strongly affect output behavior. But prompting also has limits. It cannot reliably substitute for missing knowledge, external retrieval, or alignment. It is a control interface, not a miracle repair tool. A raw language model trained only on next-token prediction can imitate text well, but imitation alone does not guarantee that it will: follow instructions reliably answer helpfully refuse unsafe requests stay grounded in truth format answers in useful ways This leads to the alignment problem. The model may be fluent without being appropriately helpful. Instruction tuning, also called supervised fine-tuning on instruction data, teaches a pretrained language model to respond to tasks phrased as instructions. Instead of only continuing generic internet text, the model is trained on pairs such as: instruction desired response This changes the model&#x27;s behavior significantly. It becomes more likely to interpret prompts as requests and to respond in a helpful task-oriented style. The FLAN and InstructGPT lines of work helped make this idea especially visible. The InstructGPT paper is central because it clarified a widely used alignment pipeline. At a high level: pretrain a language model with next-token prediction perform supervised fine-tuning on instruction-response data collect human preference comparisons between candidate outputs train a reward model to predict those preferences optimize the model with reinforcement learning so outputs score highly under the reward model This is reinforcement learning from human feedback, or RLHF. RLHF does not mean the model discovers truth directly from reality. It means the model is further optimized to align with judged human preference. RLHF often improves: helpfulness instruction following tone harmlessness refusal behavior But it does not guarantee truthfulness. A model can learn to produce answers that sound good to human raters while still containing incorrect facts. Fluency and confidence are not the same as correctness. This is one of the most important conceptual warnings in generative AI. A hallucination is an output that is fluent and plausible but unsupported or false. Hallucinations happen for deep reasons: the model is trained to generate likely text, not to verify reality parametric knowledge can be outdated the prompt may be ambiguous decoding may favor plausible continuations over abstention This is why grounding methods matter. If factual correctness is important, we often need: retrieval tool use database access citation workflows external verification Retrieval-Augmented Generation, or RAG, combines a language model with external documents retrieved at inference time. The RAG paper by Lewis and colleagues framed this as combining: parametric memory inside the model weights non-parametric memory in an external document store This is valuable because external knowledge can be: updated without retraining the whole model cited or inspected domain-specific fresher than the model&#x27;s internal knowledge In practice, RAG is often preferable to fine-tuning when the main need is factual grounding or knowledge freshness. Full fine-tuning of large models is expensive. LoRA, or Low-Rank Adaptation, addresses this by freezing the main model weights and learning small low-rank update matrices. Conceptually, LoRA says: &quot;Do not rewrite the whole model if a much smaller update can steer it.&quot; This dramatically reduces trainable parameters and memory cost. It is useful when adapting a model to: a domain a task a style an internal workflow The important exam distinction is this: LoRA changes model behavior through learned parameter updates RAG changes available context by retrieving documents at inference time They solve different problems. Students often confuse RAG and LoRA, so it is worth stating the difference plainly. Use RAG when you need: current facts source-grounded answers document-specific reasoning easier updates to knowledge Use LoRA when you need: cheaper adaptation task-specific style or behavior changes domain-specific tuning RAG is mainly about supplying knowledge from outside the model. LoRA is mainly about changing how the model behaves. Evaluating generated text is hard because many different outputs may be acceptable. This is why text-generation evaluation uses several families of metrics. 9.18.1 BLEU BLEU measures n-gram overlap between a candidate and a reference, with a brevity penalty. It was historically very influential in translation. Its limitation is that semantic paraphrases may get poor scores if the wording differs from the reference. 9.18.2 BERTScore BERTScore compares contextual token embeddings instead of only exact word matches. This makes it more sensitive to semantic similarity. 9.18.3 COMET COMET uses a learned model to predict translation quality and correlates better with human judgments than older lexical-overlap metrics in many settings. 9.18.4 Human Evaluation Ultimately, many important properties still require human judgment: helpfulness factuality safety usefulness style fit This is why automatic evaluation is important but not sufficient. Modern generative AI systems are often more than a single model call. A model can be embedded inside a larger system that allows it to: search the web retrieve documents run code call APIs use structured tools cooperate with other agents This matters because capability is partly systemic. A model with tool access can solve tasks that would be much harder from internal text continuation alone. The course lecture mentions MCP and similar tool-use ideas because they show how generative models become parts of practical workflows rather than isolated next-token engines. Autoregressive generation repeatedly extends a context by one token. Without optimization, the model would keep recomputing attention over the already-processed prefix. The KV cache stores previously computed key and value tensors so that generation can reuse them instead of recomputing the whole prefix every step. This reduces latency and cost substantially. The broader lesson is that deployed generative AI is not only about model quality. It is also about: latency throughput memory use serving cost Engineering concerns strongly shape real-world system design. Large generative models inherit patterns from training data, including undesirable ones. They can produce: harmful stereotypes unsafe instructions privacy leaks overconfident falsehoods Guardrails can be placed at multiple levels: prompt constraints retrieval filtering moderation classifiers output checks human review in high-risk settings But guardrails are not perfect. Safety is an ongoing systems problem. It involves data, alignment, product design, monitoring, and policy decisions. Generative AI is no longer only about text. Models can connect language with images, audio, and video. This happens because learned representations can align different modalities in shared or cooperating spaces. A text prompt can therefore guide image generation, and an image can condition caption generation or question answering. The conceptual jump is that once models learn strong representations and conditioning mechanisms, &quot;generate from prompt&quot; becomes a general pattern across modalities. Earlier image-generation work often focused on GANs. GANs produced striking results but were often difficult to train and could suffer from instability or mode collapse. Diffusion models became dominant because they offered a different and often more stable route to high-quality image synthesis. Diffusion generation gradually adds noise in the forward process and then learns a reverse process that denoises step by step, often guided by a text prompt. Diffusion models define a forward process and a reverse process. In the forward process, noise is gradually added to a real image over many steps until the image becomes nearly pure noise. In the reverse process, a neural network learns how to undo that corruption step by step. This gives a beautiful intuition: generation starts from noise structure emerges through repeated denoising The DDPM paper by Ho, Jain, and Abbeel made this framework especially influential. Instead of trying to jump directly from randomness to a perfect image in one shot, diffusion breaks the problem into many easier denoising steps. That staged process is part of why the model can generate detailed and coherent images. At each step, the model only needs to answer a more local question: &quot;Given a noisy sample, what direction moves it toward a less noisy, more data-like sample?&quot; This is one reason diffusion became such a powerful generative framework. To generate images from text, the diffusion process is conditioned on a text representation. The text prompt tells the model what kind of image should emerge from noise. Systems such as DALL-E style pipelines and later text-to-image models rely on language-image alignment mechanisms so that text semantics can influence visual generation. The exact architecture varies across systems, but the high-level story is consistent: encode the prompt use it to guide denoising generate an image increasingly aligned with the text Although your exam may not require a deep CLIP derivation, the broad idea is worth knowing. If a model learns compatible image and text representations, then a text prompt can guide the generator toward images whose visual features align with the prompt meaning. This is part of what makes text-to-image generation possible as a controllable system rather than an unconditional sampler. Diffusion models produce excellent images, but they are not free. Their limitations include: slow iterative sampling compared with one-shot generation heavy compute cost sensitivity to prompt phrasing and conditioning possible artifact generation inherited bias from training data This is why later work often tries to speed up sampling or improve controllability. A practical understanding of generative AI includes knowing when it is a good fit. It is especially useful for: drafting brainstorming summarization translation code assistance synthetic creative generation multimodal content creation It is less trustworthy when: factual precision must be guaranteed the cost of error is high citations or provenance are essential and unavailable compliance and safety requirements are strict This is not a weakness of one particular model. It is a consequence of the statistical nature of generation. Typical questions include: explain next-token prediction compare training and inference in language models explain tokenization and why subwords matter compare greedy decoding, beam search, top-k, and top-p explain in-context learning explain instruction tuning and RLHF distinguish LoRA from RAG explain why automatic evaluation is difficult describe diffusion at a high level The strongest answers explain why each method exists, not just what it is called. Students often make the following mistakes. assuming a fluent answer is probably true treating prompting as a full substitute for knowledge grounding confusing instruction tuning with RLHF claiming RLHF guarantees factual correctness confusing LoRA and RAG assuming diffusion directly paints the final image in one step These are exactly the kinds of mistakes an exam may try to expose. Generative AI is the study of models that create new outputs by learning data distributions. In text generation, autoregressive language models predict the next token conditioned on previous context. Tokenization, embeddings, and decoding determine how generation operates in practice. Larger models exhibit in-context learning, while instruction tuning and RLHF steer them toward more useful behavior. Because fluent generation is not the same as truth, retrieval, tool use, grounding, and evaluation remain essential. In image generation, diffusion models create high-quality outputs by learning to reverse a gradual noising process. If you remember one sentence from this chapter, remember this: generative AI is not just about making content, but about controlling how statistical models turn learned distributions into useful, grounded, and safe outputs. Brown, T. et al. &quot;Language Models are Few-Shot Learners&quot; (2020): https://arxiv.org/abs/2005.14165 Ouyang, L. et al. &quot;Training language models to follow instructions with human feedback&quot; (InstructGPT, 2022): https://arxiv.org/pdf/2203.02155 Sennrich, R., Haddow, B., and Birch, A. &quot;Neural Machine Translation of Rare Words with Subword Units&quot; (ACL 2016): https://aclanthology.org/P16-1162/ Kudo, T. and Richardson, J. &quot;SentencePiece: A simple and language independent subword tokenizer and detokenizer for Neural Text Processing&quot; (EMNLP 2018 demo): https://aclanthology.org/D18-2012/ Lewis, P. et al. &quot;Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks&quot; (NeurIPS 2020): https://papers.neurips.cc/paper_files/paper/2020/file/6b493230205f780e1bc26945df7481e5-Paper.pdf Hu, E. et al. &quot;LoRA: Low-Rank Adaptation of Large Language Models&quot; (2021): https://arxiv.org/abs/2106.09685 Zhang, T. et al. &quot;BERTScore: Evaluating Text Generation with BERT&quot; (ICLR 2020): https://openreview.net/forum?id=SkeHuCVFDr Rei, R. et al. &quot;COMET: A Neural Framework for MT Evaluation&quot; (EMNLP 2020): https://aclanthology.org/2020.emnlp-main.213/ Ho, J., Jain, A., and Abbeel, P. &quot;Denoising Diffusion Probabilistic Models&quot; (NeurIPS 2020): https://papers.nips.cc/paper/2020/file/4c5bcfec8584af0d967f1ab10179ca4b-Paper.pdf Generative AI is about learning a distribution well enough to create new samples from it. In language models, that usually means predicting one token at a time so well that long coherent outputs can emerge. Think of a large language model as a powerful next-step predictor wrapped inside a broader system. The model predicts likely continuations; prompting, retrieval, alignment, and tools shape which continuations become useful answers. This topic blends ideas from probability, sequence modeling, optimization, and systems design. It is less one algorithm than a stack of methods working together. I can explain next-token prediction and why inference differs from training. I can compare prompting, instruction tuning, and RLHF without mixing them up. I can explain why RAG and LoRA solve different problems. I can describe diffusion at a high level without pretending it is one-step image drawing. Autoregressive factorization A full sequence probability is decomposed into next-token predictions conditioned on previous context. This is why a language model can generate long outputs from one repeated local skill: predicting what should come next. Softmax with temperature intuition Temperature rescales logits before softmax, changing how sharp or flat the sampling distribution becomes. Lower temperature makes the model more conservative. Higher temperature makes it more diverse but also more prone to drift. Diffusion story The forward process gradually corrupts clean data with noise, and the learned reverse process removes it step by step. Diffusion works by solving many small denoising tasks instead of one giant jump from randomness to a finished image. Why fluent text is not the same as true text A model can produce a very confident answer that sounds polished and still be wrong. The model is trained to continue text plausibly, not to directly verify reality. Alignment can make it more helpful or safer, but factual grounding often still needs retrieval, tools, or external checking. Why RAG beats fine-tuning for fresh facts A company policy changes every month and the model keeps getting asked about the latest version. Updating model weights every time is expensive and brittle. RAG lets the system retrieve the newest document at inference time, which is usually the better design when freshness and traceability matter more than stylistic adaptation. Why does decoding matter if the model already outputs probabilities? Because probabilities are not yet final text. The decoding rule decides how those probabilities are turned into an actual token sequence, which strongly affects diversity and coherence. Why is instruction tuning different from pretraining? Pretraining teaches broad next-token modeling from general corpora, while instruction tuning specifically teaches the model to respond helpfully to task-like prompts. Why does RLHF improve user experience without guaranteeing truth? Because it optimizes toward outputs preferred by human raters, which often improves tone and helpfulness but is not the same as direct factual verification. Why is KV cache a system optimization rather than a new learning objective? Because it speeds up autoregressive inference by reusing prior attention computations rather than changing how the model was trained. Why are diffusion models often slower than autoregressive text generation feels conceptually? Because image generation typically requires many iterative denoising steps, whereas text generation emits one token at a time from a directly trained autoregressive model.",
      "target": {
        "view": "reader",
        "topic": "generative-ai"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.1 Predictive Models Versus Generative Models",
      "body": "A predictive model usually maps input to a label or number: classify an email as spam or not spam predict house price identify an image category A generative model tries to model a data distribution well enough to produce new samples from it. Depending on the setting, it may model: \\(P(X)\\) for unconditional generation \\(P(X \\mid Y)\\) for conditional generation sometimes joint structure involving both inputs and outputs If the model learns the distribution of natural-language sequences, it can generate text. If it learns the distribution of images, it can generate images. If it learns a conditional mapping from prompt to image, it can generate images guided by language. The deepest difference is this: predictive modeling selects among known outcomes, while generative modeling creates new outputs that should still look plausible under the learned distribution.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-01-predictive-models-versus-generative-models"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.2 Why Language Modeling Became Central",
      "body": "Language is a natural fit for generative modeling because it is already a sequence. A sentence can be generated token by token. This leads to the autoregressive factorization: \\[P(x_1, x_2, \\ldots, x_T) = \\prod_t P(x_t \\mid x_{&lt;t})\\] In words, the probability of a full sequence is decomposed into next-token prediction conditioned on the previous context. This is one of the most important ideas in generative AI. It means that a model can learn to generate a long output by repeatedly solving a simpler local problem: given the context so far, what token should come next?",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-02-why-language-modeling-became-central"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.3 Training an Autoregressive Language Model",
      "body": "During training, the model sees real text sequences and is asked to predict the next token at each position. The usual loss is cross-entropy over the vocabulary. This training setup uses teacher forcing: the model is given the true previous tokens it predicts the next true token This is efficient because one training example can contribute prediction loss at many positions at once. The result is a model that has learned a probability distribution over next tokens in context.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-03-training-an-autoregressive-language-model"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.4 Inference Is Different From Training",
      "body": "During inference, the model no longer has access to the future true token. It must generate one token, append it to the context, and continue. This difference matters because errors can compound. A mediocre token choice early in the sequence may pull the rest of the generation in a weaker direction. That is why generation quality depends on two things: the trained model the decoding strategy used at inference time Students often understand the training objective but forget that generation is also a search and control problem.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-04-inference-is-different-from-training"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.5 Tokens and Tokenization",
      "body": "Modern language models do not usually operate on full words directly. Instead they operate on tokens, which may be: whole words subword pieces punctuation marks special symbols Tokenization matters more than beginners expect. It affects: vocabulary size sequence length treatment of rare words multilingual handling efficiency 9.5.1 Why Subword Tokenization Became Standard A pure word-level vocabulary becomes huge and still fails on rare or unseen words. A pure character-level model avoids out-of-vocabulary words but makes sequences much longer and learning harder. Subword tokenization is a compromise. Frequent words may remain whole, while rare words can be broken into meaningful pieces. 9.5.2 BPE and Related Methods The subword-BPE approach popularized by Sennrich, Haddow, and Birch showed how rare-word problems in neural machine translation could be reduced by learning frequent subword merges. WordPiece and similar methods use related ideas. SentencePiece is especially important conceptually because it treats tokenization itself as a learnable text segmentation process and does not rely on whitespace word boundaries. That is useful for languages such as Thai, where whitespace does not segment words in the same way as English.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-05-tokens-and-tokenization"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.6 Embeddings and Contextualization",
      "body": "Once text is tokenized, each token is mapped to a vector embedding. In a Transformer-based language model, these embeddings are then contextualized by attention layers. That means the representation of a token is shaped by surrounding tokens. This is why the same token can have different effective meanings in different contexts. The model is not just looking up a static dictionary entry. It is building context-aware representations before predicting the next token.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-06-embeddings-and-contextualization"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.7 Decoding: Turning Probabilities Into Output",
      "body": "At each generation step, the model produces a probability distribution over the next token. But probabilities alone are not yet output. A decision rule is needed. This is decoding. 9.7.1 Greedy Decoding Greedy decoding selects the highest-probability token at every step. It is fast and simple, but it can become repetitive or get trapped in dull local choices. The locally best next token is not always part of the globally best sequence. 9.7.2 Beam Search Beam search keeps several promising partial sequences instead of only one. It is common in tasks like translation, where fidelity may matter more than creative diversity. However, beam search can still over-favor bland or overly high-probability continuations, and it is not always preferred for open-ended chat generation. 9.7.3 Sampling Sampling draws the next token from the probability distribution. This introduces diversity. But unrestricted sampling can become unstable because low-probability tokens may derail the sequence. 9.7.4 Top-k and Top-p Top-k sampling restricts the choice to the \\(k\\) highest-probability tokens. Top-p, or nucleus sampling, restricts the choice to the smallest token set whose cumulative probability exceeds a threshold \\(p\\). These methods try to balance coherence and diversity. 9.7.5 Temperature Temperature rescales logits before softmax. Lower temperature makes the distribution sharper and more conservative. Higher temperature makes it flatter and more random. Temperature does not change the model&#x27;s knowledge. It changes how boldly or cautiously the model samples from that knowledge.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-07-decoding-turning-probabilities-into-output"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.8 Scale and In-Context Learning",
      "body": "One of the striking discoveries of large language models is that scale changes behavior. The GPT-3 paper showed that sufficiently large autoregressive models can perform many tasks in zero-shot, one-shot, or few-shot settings by conditioning on examples in the prompt. This is called in-context learning. The important conceptual point is that the model is not updating its weights during the prompt. It is adapting behavior from context alone. This is one reason large language models feel unusually flexible. A single pretrained model can perform many tasks if prompted appropriately.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-08-scale-and-in-context-learning"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.9 Prompting",
      "body": "Prompting is the practice of shaping the model&#x27;s input so the output better matches the user&#x27;s goal. A strong prompt often includes: the task needed context desired style or role output format examples if useful constraints Prompting matters because a language model is a conditional generator. Small changes in conditioning can strongly affect output behavior. But prompting also has limits. It cannot reliably substitute for missing knowledge, external retrieval, or alignment. It is a control interface, not a miracle repair tool.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-09-prompting"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.10 Why Next-Token Prediction Is Not Enough",
      "body": "A raw language model trained only on next-token prediction can imitate text well, but imitation alone does not guarantee that it will: follow instructions reliably answer helpfully refuse unsafe requests stay grounded in truth format answers in useful ways This leads to the alignment problem. The model may be fluent without being appropriately helpful.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-10-why-next-token-prediction-is-not-enough"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.11 Instruction Tuning",
      "body": "Instruction tuning, also called supervised fine-tuning on instruction data, teaches a pretrained language model to respond to tasks phrased as instructions. Instead of only continuing generic internet text, the model is trained on pairs such as: instruction desired response This changes the model&#x27;s behavior significantly. It becomes more likely to interpret prompts as requests and to respond in a helpful task-oriented style. The FLAN and InstructGPT lines of work helped make this idea especially visible.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-11-instruction-tuning"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.12 InstructGPT and the RLHF Pipeline",
      "body": "The InstructGPT paper is central because it clarified a widely used alignment pipeline. At a high level: pretrain a language model with next-token prediction perform supervised fine-tuning on instruction-response data collect human preference comparisons between candidate outputs train a reward model to predict those preferences optimize the model with reinforcement learning so outputs score highly under the reward model This is reinforcement learning from human feedback, or RLHF. RLHF does not mean the model discovers truth directly from reality. It means the model is further optimized to align with judged human preference.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-12-instructgpt-and-the-rlhf-pipeline"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.13 Why RLHF Helps and Why It Does Not Solve Everything",
      "body": "RLHF often improves: helpfulness instruction following tone harmlessness refusal behavior But it does not guarantee truthfulness. A model can learn to produce answers that sound good to human raters while still containing incorrect facts. Fluency and confidence are not the same as correctness. This is one of the most important conceptual warnings in generative AI.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-13-why-rlhf-helps-and-why-it-does-not-solve-everything"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.14 Hallucination and Grounding",
      "body": "A hallucination is an output that is fluent and plausible but unsupported or false. Hallucinations happen for deep reasons: the model is trained to generate likely text, not to verify reality parametric knowledge can be outdated the prompt may be ambiguous decoding may favor plausible continuations over abstention This is why grounding methods matter. If factual correctness is important, we often need: retrieval tool use database access citation workflows external verification",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-14-hallucination-and-grounding"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.15 Retrieval-Augmented Generation",
      "body": "Retrieval-Augmented Generation, or RAG, combines a language model with external documents retrieved at inference time. The RAG paper by Lewis and colleagues framed this as combining: parametric memory inside the model weights non-parametric memory in an external document store This is valuable because external knowledge can be: updated without retraining the whole model cited or inspected domain-specific fresher than the model&#x27;s internal knowledge In practice, RAG is often preferable to fine-tuning when the main need is factual grounding or knowledge freshness.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-15-retrieval-augmented-generation"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.16 LoRA and Parameter-Efficient Adaptation",
      "body": "Full fine-tuning of large models is expensive. LoRA, or Low-Rank Adaptation, addresses this by freezing the main model weights and learning small low-rank update matrices. Conceptually, LoRA says: &quot;Do not rewrite the whole model if a much smaller update can steer it.&quot; This dramatically reduces trainable parameters and memory cost. It is useful when adapting a model to: a domain a task a style an internal workflow The important exam distinction is this: LoRA changes model behavior through learned parameter updates RAG changes available context by retrieving documents at inference time They solve different problems.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-16-lora-and-parameter-efficient-adaptation"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.17 RAG Versus LoRA",
      "body": "Students often confuse RAG and LoRA, so it is worth stating the difference plainly. Use RAG when you need: current facts source-grounded answers document-specific reasoning easier updates to knowledge Use LoRA when you need: cheaper adaptation task-specific style or behavior changes domain-specific tuning RAG is mainly about supplying knowledge from outside the model. LoRA is mainly about changing how the model behaves.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-17-rag-versus-lora"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.18 Evaluation of Generated Text",
      "body": "Evaluating generated text is hard because many different outputs may be acceptable. This is why text-generation evaluation uses several families of metrics. 9.18.1 BLEU BLEU measures n-gram overlap between a candidate and a reference, with a brevity penalty. It was historically very influential in translation. Its limitation is that semantic paraphrases may get poor scores if the wording differs from the reference. 9.18.2 BERTScore BERTScore compares contextual token embeddings instead of only exact word matches. This makes it more sensitive to semantic similarity. 9.18.3 COMET COMET uses a learned model to predict translation quality and correlates better with human judgments than older lexical-overlap metrics in many settings. 9.18.4 Human Evaluation Ultimately, many important properties still require human judgment: helpfulness factuality safety usefulness style fit This is why automatic evaluation is important but not sufficient.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-18-evaluation-of-generated-text"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.19 Tool Use and Agentic Systems",
      "body": "Modern generative AI systems are often more than a single model call. A model can be embedded inside a larger system that allows it to: search the web retrieve documents run code call APIs use structured tools cooperate with other agents This matters because capability is partly systemic. A model with tool access can solve tasks that would be much harder from internal text continuation alone. The course lecture mentions MCP and similar tool-use ideas because they show how generative models become parts of practical workflows rather than isolated next-token engines.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-19-tool-use-and-agentic-systems"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.20 Efficiency: KV Cache and Why It Matters",
      "body": "Autoregressive generation repeatedly extends a context by one token. Without optimization, the model would keep recomputing attention over the already-processed prefix. The KV cache stores previously computed key and value tensors so that generation can reuse them instead of recomputing the whole prefix every step. This reduces latency and cost substantially. The broader lesson is that deployed generative AI is not only about model quality. It is also about: latency throughput memory use serving cost Engineering concerns strongly shape real-world system design.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-20-efficiency-kv-cache-and-why-it-matters"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.21 Safety, Guardrails, and Bias",
      "body": "Large generative models inherit patterns from training data, including undesirable ones. They can produce: harmful stereotypes unsafe instructions privacy leaks overconfident falsehoods Guardrails can be placed at multiple levels: prompt constraints retrieval filtering moderation classifiers output checks human review in high-risk settings But guardrails are not perfect. Safety is an ongoing systems problem. It involves data, alignment, product design, monitoring, and policy decisions.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-21-safety-guardrails-and-bias"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.22 Multimodal Generative AI",
      "body": "Generative AI is no longer only about text. Models can connect language with images, audio, and video. This happens because learned representations can align different modalities in shared or cooperating spaces. A text prompt can therefore guide image generation, and an image can condition caption generation or question answering. The conceptual jump is that once models learn strong representations and conditioning mechanisms, &quot;generate from prompt&quot; becomes a general pattern across modalities.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-22-multimodal-generative-ai"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.23 Image Generation Before Diffusion",
      "body": "Earlier image-generation work often focused on GANs. GANs produced striking results but were often difficult to train and could suffer from instability or mode collapse. Diffusion models became dominant because they offered a different and often more stable route to high-quality image synthesis. Diffusion generation gradually adds noise in the forward process and then learns a reverse process that denoises step by step, often guided by a text prompt.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-23-image-generation-before-diffusion"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.24 The Core Idea of Diffusion Models",
      "body": "Diffusion models define a forward process and a reverse process. In the forward process, noise is gradually added to a real image over many steps until the image becomes nearly pure noise. In the reverse process, a neural network learns how to undo that corruption step by step. This gives a beautiful intuition: generation starts from noise structure emerges through repeated denoising The DDPM paper by Ho, Jain, and Abbeel made this framework especially influential.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-24-the-core-idea-of-diffusion-models"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.25 Why Diffusion Works Conceptually",
      "body": "Instead of trying to jump directly from randomness to a perfect image in one shot, diffusion breaks the problem into many easier denoising steps. That staged process is part of why the model can generate detailed and coherent images. At each step, the model only needs to answer a more local question: &quot;Given a noisy sample, what direction moves it toward a less noisy, more data-like sample?&quot; This is one reason diffusion became such a powerful generative framework.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-25-why-diffusion-works-conceptually"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.26 Conditional Image Generation",
      "body": "To generate images from text, the diffusion process is conditioned on a text representation. The text prompt tells the model what kind of image should emerge from noise. Systems such as DALL-E style pipelines and later text-to-image models rely on language-image alignment mechanisms so that text semantics can influence visual generation. The exact architecture varies across systems, but the high-level story is consistent: encode the prompt use it to guide denoising generate an image increasingly aligned with the text",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-26-conditional-image-generation"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.27 CLIP-Like Alignment Intuition",
      "body": "Although your exam may not require a deep CLIP derivation, the broad idea is worth knowing. If a model learns compatible image and text representations, then a text prompt can guide the generator toward images whose visual features align with the prompt meaning. This is part of what makes text-to-image generation possible as a controllable system rather than an unconditional sampler.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-27-clip-like-alignment-intuition"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.28 Diffusion Tradeoffs",
      "body": "Diffusion models produce excellent images, but they are not free. Their limitations include: slow iterative sampling compared with one-shot generation heavy compute cost sensitivity to prompt phrasing and conditioning possible artifact generation inherited bias from training data This is why later work often tries to speed up sampling or improve controllability.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-28-diffusion-tradeoffs"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.29 What Generative AI Is Good At",
      "body": "A practical understanding of generative AI includes knowing when it is a good fit. It is especially useful for: drafting brainstorming summarization translation code assistance synthetic creative generation multimodal content creation It is less trustworthy when: factual precision must be guaranteed the cost of error is high citations or provenance are essential and unavailable compliance and safety requirements are strict This is not a weakness of one particular model. It is a consequence of the statistical nature of generation.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-29-what-generative-ai-is-good-at"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.30 Common Exam Questions",
      "body": "Typical questions include: explain next-token prediction compare training and inference in language models explain tokenization and why subwords matter compare greedy decoding, beam search, top-k, and top-p explain in-context learning explain instruction tuning and RLHF distinguish LoRA from RAG explain why automatic evaluation is difficult describe diffusion at a high level The strongest answers explain why each method exists, not just what it is called.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-30-common-exam-questions"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.31 Common Misunderstandings",
      "body": "Students often make the following mistakes. assuming a fluent answer is probably true treating prompting as a full substitute for knowledge grounding confusing instruction tuning with RLHF claiming RLHF guarantees factual correctness confusing LoRA and RAG assuming diffusion directly paints the final image in one step These are exactly the kinds of mistakes an exam may try to expose.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-31-common-misunderstandings"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.32 Big Picture Summary",
      "body": "Generative AI is the study of models that create new outputs by learning data distributions. In text generation, autoregressive language models predict the next token conditioned on previous context. Tokenization, embeddings, and decoding determine how generation operates in practice. Larger models exhibit in-context learning, while instruction tuning and RLHF steer them toward more useful behavior. Because fluent generation is not the same as truth, retrieval, tool use, grounding, and evaluation remain essential. In image generation, diffusion models create high-quality outputs by learning to reverse a gradual noising process. If you remember one sentence from this chapter, remember this: generative AI is not just about making content, but about controlling how statistical models turn learned distributions into useful, grounded, and safe outputs.",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-32-big-picture-summary"
      }
    },
    {
      "kind": "section",
      "topic": "generative-ai",
      "title": "Generative AI: 9.33 Primary References Used to Expand This Chapter",
      "body": "Brown, T. et al. &quot;Language Models are Few-Shot Learners&quot; (2020): https://arxiv.org/abs/2005.14165 Ouyang, L. et al. &quot;Training language models to follow instructions with human feedback&quot; (InstructGPT, 2022): https://arxiv.org/pdf/2203.02155 Sennrich, R., Haddow, B., and Birch, A. &quot;Neural Machine Translation of Rare Words with Subword Units&quot; (ACL 2016): https://aclanthology.org/P16-1162/ Kudo, T. and Richardson, J. &quot;SentencePiece: A simple and language independent subword tokenizer and detokenizer for Neural Text Processing&quot; (EMNLP 2018 demo): https://aclanthology.org/D18-2012/ Lewis, P. et al. &quot;Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks&quot; (NeurIPS 2020): https://papers.neurips.cc/paper_files/paper/2020/file/6b493230205f780e1bc26945df7481e5-Paper.pdf Hu, E. et al. &quot;LoRA: Low-Rank Adaptation of Large Language Models&quot; (2021): https://arxiv.org/abs/2106.09685 Zhang, T. et al. &quot;BERTScore: Evaluating Text Generation with BERT&quot; (ICLR 2020): https://openreview.net/forum?id=SkeHuCVFDr Rei, R. et al. &quot;COMET: A Neural Framework for MT Evaluation&quot; (EMNLP 2020): https://aclanthology.org/2020.emnlp-main.213/ Ho, J., Jain, A., and Abbeel, P. &quot;Denoising Diffusion Probabilistic Models&quot; (NeurIPS 2020): https://papers.nips.cc/paper/2020/file/4c5bcfec8584af0d967f1ab10179ca4b-Paper.pdf",
      "target": {
        "view": "reader",
        "topic": "generative-ai",
        "section": "generative-ai-33-primary-references-used-to-expand-this-chapter"
      }
    },
    {
      "kind": "cram",
      "topic": "mixed",
      "title": "# Cram Sheet",
      "body": "Use this in the final 24-48 hours.",
      "target": {
        "view": "cram",
        "title": "# Cram Sheet"
      }
    },
    {
      "kind": "cram",
      "topic": "mixed",
      "title": "1. Unsupervised Learning",
      "body": "Unsupervised means no labels. K-means: choose \\(k\\) assign to nearest centroid recompute mean repeat Normalize before distance-based clustering. Elbow method is heuristic, not exact truth. Hierarchical clustering: merge closest clusters step by step inspect dendrogram height PCA: linear projection to maximum-variance axes not clustering t-SNE: good for local visualization bad for strong global geometric claims",
      "target": {
        "view": "cram",
        "title": "1. Unsupervised Learning"
      }
    },
    {
      "kind": "cram",
      "topic": "mixed",
      "title": "2. Neural Networks",
      "body": "Neural network = stacked linear layers plus nonlinear activations. No nonlinearity means still just linear. ReLU is common hidden activation. Classification: softmax + cross-entropy Regression: linear output + MSE Gradient descent updates parameters using negative gradient direction. Backprop = efficient chain rule. Overfitting: training good, validation worse Dropout: turns off random neurons during training CNNs: local filters parameter sharing better for images Conv output size: \\(\\left\\lfloor \\frac{n + 2p - f}{s} \\right\\rfloor + 1\\) Transfer learning: reuse pretrained features",
      "target": {
        "view": "cram",
        "title": "2. Neural Networks"
      }
    },
    {
      "kind": "cram",
      "topic": "mixed",
      "title": "3. Recommender Systems",
      "body": "Content-based: recommend similar items using item features Collaborative filtering: recommend from group behavior Matrix factorization: learn user and item latent vectors Cold start: new user or new item Ranking metrics matter more than plain accuracy: precision recall MAP hit rate nDCG MRR Two-stage pipeline: candidate generation reranking",
      "target": {
        "view": "cram",
        "title": "3. Recommender Systems"
      }
    },
    {
      "kind": "cram",
      "topic": "mixed",
      "title": "4. Sequence Models",
      "body": "Sequence problems care about order. Plain RNNs: can forget long-range information suffer vanishing and exploding gradients LSTM: forget gate input gate output gate cell state Seq2seq: encoder + decoder Teacher forcing: use true previous token during training Attention: focus on relevant parts of input Transformer: self-attention Query, Key, Value multi-head attention more parallel than RNNs",
      "target": {
        "view": "cram",
        "title": "4. Sequence Models"
      }
    },
    {
      "kind": "cram",
      "topic": "mixed",
      "title": "5. Generative AI",
      "body": "Generative AI creates new content. LLMs are autoregressive: predict next token from previous context Tokens matter. Tokenization examples: BPE WordPiece SentencePiece Decoding: greedy top-k top-p temperature In-context learning: examples in prompt Instruction tuning: supervised finetuning for following instructions RLHF: align outputs to human preferences BLEU is limited. BERTScore and COMET are more semantic / learned. LoRA: efficient tuning for behavior/capability RAG: retrieve documents at inference time better for new facts KV cache: reuse old keys and values Guardrails: try to reduce unsafe outputs Diffusion: forward = add noise reverse = denoise",
      "target": {
        "view": "cram",
        "title": "5. Generative AI"
      }
    },
    {
      "kind": "cram",
      "topic": "mixed",
      "title": "6. The Most Important Comparisons",
      "body": "K-means vs hierarchical clustering PCA vs t-SNE classification vs regression losses MLP vs CNN RNN vs LSTM LSTM vs Transformer content-based vs collaborative filtering LoRA vs RAG greedy vs top-p",
      "target": {
        "view": "cram",
        "title": "6. The Most Important Comparisons"
      }
    },
    {
      "kind": "cram",
      "topic": "mixed",
      "title": "7. The Most Common Traps",
      "body": "forgetting normalization in clustering calling PCA a clustering method mixing up softmax and linear output confusing validation and test roles saying RAG changes model weights saying BLEU equals true quality saying Transformers are just bigger RNNs",
      "target": {
        "view": "cram",
        "title": "7. The Most Common Traps"
      }
    },
    {
      "kind": "cram",
      "topic": "mixed",
      "title": "8. Last-Minute Verbal Check",
      "body": "Make sure you can explain these from memory: Why does K-means need normalization? Why does nonlinearity matter? Why is MSE used for rainfall prediction? Why are CNNs better for images? Why does LSTM help long-term dependencies? Why did Transformers become dominant? Why is RAG better than LoRA for fresh facts? Why is diffusion strong but slow?",
      "target": {
        "view": "cram",
        "title": "8. Last-Minute Verbal Check"
      }
    },
    {
      "kind": "quiz",
      "topic": "unsupervised-learning",
      "title": "What is the difference between supervised and unsupervised learning?",
      "body": "Unsupervised learning has no labels and tries to discover hidden structure.",
      "target": {
        "view": "practice",
        "topic": "unsupervised-learning",
        "question": "unsupervised-learning-quiz-01"
      }
    },
    {
      "kind": "quiz",
      "topic": "unsupervised-learning",
      "title": "Why does normalization matter so much for K-means?",
      "body": "Because distance gets dominated by large-scale features if data is not normalized.",
      "target": {
        "view": "practice",
        "topic": "unsupervised-learning",
        "question": "unsupervised-learning-quiz-02"
      }
    },
    {
      "kind": "quiz",
      "topic": "unsupervised-learning",
      "title": "Explain K-means step by step.",
      "body": "Initialize centroids, assign points to nearest centroid, recompute means, repeat.",
      "target": {
        "view": "practice",
        "topic": "unsupervised-learning",
        "question": "unsupervised-learning-quiz-03"
      }
    },
    {
      "kind": "quiz",
      "topic": "unsupervised-learning",
      "title": "Why does inertia always decrease when `k` increases?",
      "body": "More clusters always reduce within-cluster spread.",
      "target": {
        "view": "practice",
        "topic": "unsupervised-learning",
        "question": "unsupervised-learning-quiz-04"
      }
    },
    {
      "kind": "quiz",
      "topic": "unsupervised-learning",
      "title": "Why is the elbow method only a heuristic?",
      "body": "Because the elbow may be weak or ambiguous and does not define a mathematically unique best `k`.",
      "target": {
        "view": "practice",
        "topic": "unsupervised-learning",
        "question": "unsupervised-learning-quiz-05"
      }
    },
    {
      "kind": "quiz",
      "topic": "unsupervised-learning",
      "title": "What does a dendrogram show?",
      "body": "The sequence and height of hierarchical merges.",
      "target": {
        "view": "practice",
        "topic": "unsupervised-learning",
        "question": "unsupervised-learning-quiz-06"
      }
    },
    {
      "kind": "quiz",
      "topic": "unsupervised-learning",
      "title": "Compare Ward linkage and single linkage.",
      "body": "Ward prefers compact low-variance merges; single linkage uses minimum pair distance and can chain clusters.",
      "target": {
        "view": "practice",
        "topic": "unsupervised-learning",
        "question": "unsupervised-learning-quiz-07"
      }
    },
    {
      "kind": "quiz",
      "topic": "unsupervised-learning",
      "title": "What is PCA geometrically?",
      "body": "PCA rotates the data to directions of maximum variance.",
      "target": {
        "view": "practice",
        "topic": "unsupervised-learning",
        "question": "unsupervised-learning-quiz-08"
      }
    },
    {
      "kind": "quiz",
      "topic": "unsupervised-learning",
      "title": "Why is PCA not a clustering algorithm?",
      "body": "It projects data to new axes but does not assign cluster labels.",
      "target": {
        "view": "practice",
        "topic": "unsupervised-learning",
        "question": "unsupervised-learning-quiz-09"
      }
    },
    {
      "kind": "quiz",
      "topic": "unsupervised-learning",
      "title": "Why should t-SNE plots be interpreted carefully?",
      "body": "Because local neighborhoods may be preserved while global distances and cluster spacing can mislead.",
      "target": {
        "view": "practice",
        "topic": "unsupervised-learning",
        "question": "unsupervised-learning-quiz-10"
      }
    },
    {
      "kind": "quiz",
      "topic": "neural-networks-foundations",
      "title": "Why is nonlinearity necessary in neural networks?",
      "body": "Without nonlinearity, stacked linear layers still behave like one linear layer.",
      "target": {
        "view": "practice",
        "topic": "neural-networks-foundations",
        "question": "neural-networks-foundations-quiz-01"
      }
    },
    {
      "kind": "quiz",
      "topic": "neural-networks-foundations",
      "title": "When do you use cross-entropy? When do you use MSE?",
      "body": "Cross-entropy for classification, MSE for regression.",
      "target": {
        "view": "practice",
        "topic": "neural-networks-foundations",
        "question": "neural-networks-foundations-quiz-02"
      }
    },
    {
      "kind": "quiz",
      "topic": "neural-networks-foundations",
      "title": "Why is a linear output appropriate for rainfall prediction?",
      "body": "Because rainfall is a real-valued target and should not be artificially bounded.",
      "target": {
        "view": "practice",
        "topic": "neural-networks-foundations",
        "question": "neural-networks-foundations-quiz-03"
      }
    },
    {
      "kind": "quiz",
      "topic": "neural-networks-foundations",
      "title": "What is backpropagation?",
      "body": "Efficient chain-rule computation of gradients through the network.",
      "target": {
        "view": "practice",
        "topic": "neural-networks-foundations",
        "question": "neural-networks-foundations-quiz-04"
      }
    },
    {
      "kind": "quiz",
      "topic": "neural-networks-foundations",
      "title": "What does the learning rate control?",
      "body": "The step size of optimization updates.",
      "target": {
        "view": "practice",
        "topic": "neural-networks-foundations",
        "question": "neural-networks-foundations-quiz-05"
      }
    },
    {
      "kind": "quiz",
      "topic": "neural-networks-foundations",
      "title": "How do you tell overfitting from underfitting?",
      "body": "Underfitting means both train and validation are poor; overfitting means train is good but validation degrades.",
      "target": {
        "view": "practice",
        "topic": "neural-networks-foundations",
        "question": "neural-networks-foundations-quiz-06"
      }
    },
    {
      "kind": "quiz",
      "topic": "neural-networks-foundations",
      "title": "What does dropout do?",
      "body": "Randomly disables units during training to reduce co-adaptation and improve generalization.",
      "target": {
        "view": "practice",
        "topic": "neural-networks-foundations",
        "question": "neural-networks-foundations-quiz-07"
      }
    },
    {
      "kind": "quiz",
      "topic": "neural-networks-foundations",
      "title": "Why are CNNs better than MLPs for images?",
      "body": "CNNs exploit spatial locality and parameter sharing.",
      "target": {
        "view": "practice",
        "topic": "neural-networks-foundations",
        "question": "neural-networks-foundations-quiz-08"
      }
    },
    {
      "kind": "quiz",
      "topic": "neural-networks-foundations",
      "title": "Compute parameters for a dense layer from 75 inputs to 200 outputs.",
      "body": "`75 * 200 + 200 = 15200`",
      "target": {
        "view": "practice",
        "topic": "neural-networks-foundations",
        "question": "neural-networks-foundations-quiz-09"
      }
    },
    {
      "kind": "quiz",
      "topic": "neural-networks-foundations",
      "title": "Why does transfer learning help on small datasets?",
      "body": "Because pretrained features give a better starting point and usually converge faster with better accuracy.",
      "target": {
        "view": "practice",
        "topic": "neural-networks-foundations",
        "question": "neural-networks-foundations-quiz-10"
      }
    },
    {
      "kind": "quiz",
      "topic": "recommendation-systems",
      "title": "What is the difference between content-based and collaborative filtering?",
      "body": "Content-based uses item features; collaborative filtering uses behavior patterns across users and items.",
      "target": {
        "view": "practice",
        "topic": "recommendation-systems",
        "question": "recommendation-systems-quiz-01"
      }
    },
    {
      "kind": "quiz",
      "topic": "recommendation-systems",
      "title": "What is the cold start problem?",
      "body": "Difficulty recommending for new users or new items with little history.",
      "target": {
        "view": "practice",
        "topic": "recommendation-systems",
        "question": "recommendation-systems-quiz-02"
      }
    },
    {
      "kind": "quiz",
      "topic": "recommendation-systems",
      "title": "What is matrix factorization trying to learn?",
      "body": "Low-dimensional latent vectors for users and items.",
      "target": {
        "view": "practice",
        "topic": "recommendation-systems",
        "question": "recommendation-systems-quiz-03"
      }
    },
    {
      "kind": "quiz",
      "topic": "recommendation-systems",
      "title": "Why is cosine similarity useful in content-based recommendation?",
      "body": "It compares profile direction and works well for vector similarity.",
      "target": {
        "view": "practice",
        "topic": "recommendation-systems",
        "question": "recommendation-systems-quiz-04"
      }
    },
    {
      "kind": "quiz",
      "topic": "recommendation-systems",
      "title": "Why are ranking metrics more useful than plain accuracy here?",
      "body": "Because what matters is whether good items appear high in the ranked list.",
      "target": {
        "view": "practice",
        "topic": "recommendation-systems",
        "question": "recommendation-systems-quiz-05"
      }
    },
    {
      "kind": "quiz",
      "topic": "recommendation-systems",
      "title": "What does hit rate measure?",
      "body": "Whether at least one relevant item appears in the recommendation list.",
      "target": {
        "view": "practice",
        "topic": "recommendation-systems",
        "question": "recommendation-systems-quiz-06"
      }
    },
    {
      "kind": "quiz",
      "topic": "recommendation-systems",
      "title": "What does MRR care about?",
      "body": "The position of the first relevant result.",
      "target": {
        "view": "practice",
        "topic": "recommendation-systems",
        "question": "recommendation-systems-quiz-07"
      }
    },
    {
      "kind": "quiz",
      "topic": "recommendation-systems",
      "title": "What is the purpose of candidate generation in a two-stage pipeline?",
      "body": "To quickly narrow a huge item set into a smaller plausible subset before expensive reranking.",
      "target": {
        "view": "practice",
        "topic": "recommendation-systems",
        "question": "recommendation-systems-quiz-08"
      }
    },
    {
      "kind": "quiz",
      "topic": "sequence-models",
      "title": "Why are some tasks sequence tasks?",
      "body": "Because order changes meaning.",
      "target": {
        "view": "practice",
        "topic": "sequence-models",
        "question": "sequence-models-quiz-01"
      }
    },
    {
      "kind": "quiz",
      "topic": "sequence-models",
      "title": "Why do plain RNNs struggle with long-range dependencies?",
      "body": "Because gradients can vanish or explode over many time steps.",
      "target": {
        "view": "practice",
        "topic": "sequence-models",
        "question": "sequence-models-quiz-02"
      }
    },
    {
      "kind": "quiz",
      "topic": "sequence-models",
      "title": "What problem does LSTM solve?",
      "body": "It improves long-range memory through gated cell-state updates.",
      "target": {
        "view": "practice",
        "topic": "sequence-models",
        "question": "sequence-models-quiz-03"
      }
    },
    {
      "kind": "quiz",
      "topic": "sequence-models",
      "title": "What does the forget gate do?",
      "body": "It decides what old information to discard.",
      "target": {
        "view": "practice",
        "topic": "sequence-models",
        "question": "sequence-models-quiz-04"
      }
    },
    {
      "kind": "quiz",
      "topic": "sequence-models",
      "title": "What is teacher forcing?",
      "body": "Feeding the true previous token during decoder training.",
      "target": {
        "view": "practice",
        "topic": "sequence-models",
        "question": "sequence-models-quiz-05"
      }
    },
    {
      "kind": "quiz",
      "topic": "sequence-models",
      "title": "Why was attention introduced in seq2seq?",
      "body": "To let the model focus on relevant input parts instead of compressing everything into one fixed vector.",
      "target": {
        "view": "practice",
        "topic": "sequence-models",
        "question": "sequence-models-quiz-06"
      }
    },
    {
      "kind": "quiz",
      "topic": "sequence-models",
      "title": "What do Query, Key, and Value mean conceptually?",
      "body": "Query asks what to look for, Key says what is available, Value carries the content to aggregate.",
      "target": {
        "view": "practice",
        "topic": "sequence-models",
        "question": "sequence-models-quiz-07"
      }
    },
    {
      "kind": "quiz",
      "topic": "sequence-models",
      "title": "Why are Transformers easier to parallelize than RNNs?",
      "body": "Because they do not rely on strict step-by-step recurrence during training.",
      "target": {
        "view": "practice",
        "topic": "sequence-models",
        "question": "sequence-models-quiz-08"
      }
    },
    {
      "kind": "quiz",
      "topic": "sequence-models",
      "title": "Why is multi-head attention useful?",
      "body": "Because different heads can capture different relationships at the same time.",
      "target": {
        "view": "practice",
        "topic": "sequence-models",
        "question": "sequence-models-quiz-09"
      }
    },
    {
      "kind": "quiz",
      "topic": "generative-ai",
      "title": "Predictive AI vs generative AI?",
      "body": "Predictive AI predicts labels or values; generative AI creates new content.",
      "target": {
        "view": "practice",
        "topic": "generative-ai",
        "question": "generative-ai-quiz-01"
      }
    },
    {
      "kind": "quiz",
      "topic": "generative-ai",
      "title": "What is an autoregressive language model?",
      "body": "A model that generates text token by token using previous context.",
      "target": {
        "view": "practice",
        "topic": "generative-ai",
        "question": "generative-ai-quiz-02"
      }
    },
    {
      "kind": "quiz",
      "topic": "generative-ai",
      "title": "Greedy decoding vs top-p sampling?",
      "body": "Greedy takes the highest-probability token each step; top-p samples from the smallest token set whose cumulative probability exceeds threshold `p`.",
      "target": {
        "view": "practice",
        "topic": "generative-ai",
        "question": "generative-ai-quiz-03"
      }
    },
    {
      "kind": "quiz",
      "topic": "generative-ai",
      "title": "Why does tokenization matter?",
      "body": "It determines how text is split and affects vocabulary, efficiency, and multilingual behavior.",
      "target": {
        "view": "practice",
        "topic": "generative-ai",
        "question": "generative-ai-quiz-04"
      }
    },
    {
      "kind": "quiz",
      "topic": "generative-ai",
      "title": "What is in-context learning?",
      "body": "Learning from examples given directly in the prompt without updating weights.",
      "target": {
        "view": "practice",
        "topic": "generative-ai",
        "question": "generative-ai-quiz-05"
      }
    },
    {
      "kind": "quiz",
      "topic": "generative-ai",
      "title": "What is instruction tuning?",
      "body": "Supervised finetuning on instruction-following examples.",
      "target": {
        "view": "practice",
        "topic": "generative-ai",
        "question": "generative-ai-quiz-06"
      }
    },
    {
      "kind": "quiz",
      "topic": "generative-ai",
      "title": "What is RLHF trying to improve?",
      "body": "Alignment with human preferences and more helpful instruction-following behavior.",
      "target": {
        "view": "practice",
        "topic": "generative-ai",
        "question": "generative-ai-quiz-07"
      }
    },
    {
      "kind": "quiz",
      "topic": "generative-ai",
      "title": "Why is BLEU limited?",
      "body": "It rewards surface overlap and may miss semantic equivalence.",
      "target": {
        "view": "practice",
        "topic": "generative-ai",
        "question": "generative-ai-quiz-08"
      }
    },
    {
      "kind": "quiz",
      "topic": "generative-ai",
      "title": "LoRA vs RAG?",
      "body": "LoRA adapts behavior with small trainable updates; RAG retrieves external knowledge at inference time.",
      "target": {
        "view": "practice",
        "topic": "generative-ai",
        "question": "generative-ai-quiz-09"
      }
    },
    {
      "kind": "quiz",
      "topic": "generative-ai",
      "title": "What does KV cache do?",
      "body": "It reuses previous attention keys and values to reduce recomputation in autoregressive decoding.",
      "target": {
        "view": "practice",
        "topic": "generative-ai",
        "question": "generative-ai-quiz-10"
      }
    },
    {
      "kind": "quiz",
      "topic": "generative-ai",
      "title": "Why are guardrails needed?",
      "body": "Because LLMs can output harmful, biased, or unsafe content.",
      "target": {
        "view": "practice",
        "topic": "generative-ai",
        "question": "generative-ai-quiz-11"
      }
    },
    {
      "kind": "quiz",
      "topic": "generative-ai",
      "title": "What is the forward process in diffusion?",
      "body": "Gradually add noise to clean data.",
      "target": {
        "view": "practice",
        "topic": "generative-ai",
        "question": "generative-ai-quiz-12"
      }
    },
    {
      "kind": "quiz",
      "topic": "generative-ai",
      "title": "What is the reverse process in diffusion?",
      "body": "Learn to denoise step by step from noise back to data.",
      "target": {
        "view": "practice",
        "topic": "generative-ai",
        "question": "generative-ai-quiz-13"
      }
    },
    {
      "kind": "quiz",
      "topic": "unsupervised-learning",
      "title": "Why can an unsupervised method produce a useful answer even though there is no label to compare against?",
      "body": "Because usefulness can come from revealing structure, compression, or interpretable organization in the data even without a single ground-truth target label.",
      "target": {
        "view": "practice",
        "topic": "unsupervised-learning",
        "question": "unsupervised-learning-deep-01"
      }
    },
    {
      "kind": "quiz",
      "topic": "unsupervised-learning",
      "title": "Why does K-means prefer compact clusters instead of arbitrary shapes?",
      "body": "Because its objective is based on squared distance to a centroid, so clusters are summarized by one mean point and curved or disconnected shapes are represented poorly.",
      "target": {
        "view": "practice",
        "topic": "unsupervised-learning",
        "question": "unsupervised-learning-deep-02"
      }
    },
    {
      "kind": "quiz",
      "topic": "unsupervised-learning",
      "title": "What does a dendrogram give you that K-means does not?",
      "body": "A dendrogram gives the full merge history across scales, so you can inspect structure at multiple cut levels rather than committing to one flat partition only.",
      "target": {
        "view": "practice",
        "topic": "unsupervised-learning",
        "question": "unsupervised-learning-deep-03"
      }
    },
    {
      "kind": "quiz",
      "topic": "unsupervised-learning",
      "title": "Why might PCA help before clustering even though PCA itself does not cluster?",
      "body": "Because PCA can reduce noise or redundant dimensions and create a cleaner lower-dimensional representation for a later clustering method.",
      "target": {
        "view": "practice",
        "topic": "unsupervised-learning",
        "question": "unsupervised-learning-deep-04"
      }
    },
    {
      "kind": "quiz",
      "topic": "unsupervised-learning",
      "title": "Why is it dangerous to compare large empty spaces between t-SNE clusters too literally?",
      "body": "Because t-SNE is optimized to preserve local neighborhoods, not exact global geometry, so large inter-cluster gaps in the plot can exaggerate separation.",
      "target": {
        "view": "practice",
        "topic": "unsupervised-learning",
        "question": "unsupervised-learning-deep-05"
      }
    },
    {
      "kind": "quiz",
      "topic": "neural-networks-foundations",
      "title": "Why is a hidden layer called hidden rather than magical?",
      "body": "Because it is simply an internal representation layer whose activations are not the final outputs. It is learned, but it still follows explicit algebraic operations.",
      "target": {
        "view": "practice",
        "topic": "neural-networks-foundations",
        "question": "neural-networks-foundations-deep-01"
      }
    },
    {
      "kind": "quiz",
      "topic": "neural-networks-foundations",
      "title": "What does backpropagation actually compute?",
      "body": "It efficiently computes how changing each parameter would change the loss, using the chain rule through the network's layered structure.",
      "target": {
        "view": "practice",
        "topic": "neural-networks-foundations",
        "question": "neural-networks-foundations-deep-02"
      }
    },
    {
      "kind": "quiz",
      "topic": "neural-networks-foundations",
      "title": "Why is low training loss not enough to claim success?",
      "body": "Because the real goal is generalization. A model can memorize training data and still perform poorly on validation or test data.",
      "target": {
        "view": "practice",
        "topic": "neural-networks-foundations",
        "question": "neural-networks-foundations-deep-03"
      }
    },
    {
      "kind": "quiz",
      "topic": "neural-networks-foundations",
      "title": "Why can learning-rate scheduling help even if the architecture stays the same?",
      "body": "Because optimization behavior changes during training. Larger steps help early movement, while smaller steps often help late refinement.",
      "target": {
        "view": "practice",
        "topic": "neural-networks-foundations",
        "question": "neural-networks-foundations-deep-04"
      }
    },
    {
      "kind": "quiz",
      "topic": "neural-networks-foundations",
      "title": "Why is dropout considered regularization instead of ordinary architecture?",
      "body": "Because its main role is to reduce over-reliance on specific units and improve generalization rather than to change the function class in a deterministic way.",
      "target": {
        "view": "practice",
        "topic": "neural-networks-foundations",
        "question": "neural-networks-foundations-deep-05"
      }
    },
    {
      "kind": "quiz",
      "topic": "convolutional-networks",
      "title": "Why does parameter sharing help both learning and efficiency?",
      "body": "Because the same filter can detect the same kind of pattern anywhere in the image, which reduces parameters and encourages reuse of meaningful local features.",
      "target": {
        "view": "practice",
        "topic": "convolutional-networks",
        "question": "convolutional-networks-deep-01"
      }
    },
    {
      "kind": "quiz",
      "topic": "convolutional-networks",
      "title": "Why is a 1 x 1 convolution useful even though it has almost no spatial extent?",
      "body": "Because it mixes information across channels and can change channel dimension, acting like a learned projection at each spatial location.",
      "target": {
        "view": "practice",
        "topic": "convolutional-networks",
        "question": "convolutional-networks-deep-02"
      }
    },
    {
      "kind": "quiz",
      "topic": "convolutional-networks",
      "title": "What problem did ResNet mainly solve?",
      "body": "It mainly improved optimization of very deep networks by allowing identity shortcuts and better gradient flow through residual connections.",
      "target": {
        "view": "practice",
        "topic": "convolutional-networks",
        "question": "convolutional-networks-deep-03"
      }
    },
    {
      "kind": "quiz",
      "topic": "convolutional-networks",
      "title": "Why is a CNN more natural than a dense network for a 5 x 5 x 3 weather grid?",
      "body": "Because nearby cells have spatial relationships, and a CNN can exploit local structure and shared filters instead of flattening away that geometry.",
      "target": {
        "view": "practice",
        "topic": "convolutional-networks",
        "question": "convolutional-networks-deep-04"
      }
    },
    {
      "kind": "quiz",
      "topic": "convolutional-networks",
      "title": "Why is pooling not the only way to shrink spatial size?",
      "body": "Because strided convolutions can also reduce spatial dimensions while still learning the downsampling transformation.",
      "target": {
        "view": "practice",
        "topic": "convolutional-networks",
        "question": "convolutional-networks-deep-05"
      }
    },
    {
      "kind": "quiz",
      "topic": "recommendation-systems",
      "title": "Why can content-based recommendation help with brand-new items better than pure collaborative filtering?",
      "body": "Because a new item can be represented from its known features immediately, while collaborative methods need interaction history before they know where that item belongs in behavior space.",
      "target": {
        "view": "practice",
        "topic": "recommendation-systems",
        "question": "recommendation-systems-deep-01"
      }
    },
    {
      "kind": "quiz",
      "topic": "recommendation-systems",
      "title": "Why do large systems use candidate generation before ranking?",
      "body": "Because scoring an enormous catalog with a heavy model for every request is too expensive, so a fast stage first narrows the catalog to a plausible smaller set.",
      "target": {
        "view": "practice",
        "topic": "recommendation-systems",
        "question": "recommendation-systems-deep-02"
      }
    },
    {
      "kind": "quiz",
      "topic": "recommendation-systems",
      "title": "What is the danger of optimizing only click-through rate?",
      "body": "It can favor short-term engagement while ignoring diversity, novelty, satisfaction, or long-term user value.",
      "target": {
        "view": "practice",
        "topic": "recommendation-systems",
        "question": "recommendation-systems-deep-03"
      }
    },
    {
      "kind": "quiz",
      "topic": "recommendation-systems",
      "title": "Why do embeddings help recommendation beyond hand-built metadata?",
      "body": "Because embeddings can capture hidden structure and interaction patterns that are not explicitly described by manual item fields.",
      "target": {
        "view": "practice",
        "topic": "recommendation-systems",
        "question": "recommendation-systems-deep-04"
      }
    },
    {
      "kind": "quiz",
      "topic": "recommendation-systems",
      "title": "Why is evaluation harder in recommendation than in many classification problems?",
      "body": "Because the system only observes interactions on exposed items, ranking order matters, and the model's own behavior shapes the future data it gets to learn from.",
      "target": {
        "view": "practice",
        "topic": "recommendation-systems",
        "question": "recommendation-systems-deep-05"
      }
    },
    {
      "kind": "quiz",
      "topic": "sequence-models",
      "title": "Why is it useful to think of an unrolled RNN as a deep network over time?",
      "body": "Because it makes the gradient problem easier to see: long sequences create long paths for error signals, which is exactly why vanishing and exploding gradients appear.",
      "target": {
        "view": "practice",
        "topic": "sequence-models",
        "question": "sequence-models-deep-01"
      }
    },
    {
      "kind": "quiz",
      "topic": "sequence-models",
      "title": "Why does teacher forcing help during training but create a mismatch at inference time?",
      "body": "Because during training the decoder sees the true previous token, but during inference it must condition on its own predictions, which may include mistakes.",
      "target": {
        "view": "practice",
        "topic": "sequence-models",
        "question": "sequence-models-deep-02"
      }
    },
    {
      "kind": "quiz",
      "topic": "sequence-models",
      "title": "Why can Transformers be trained more efficiently on modern hardware than RNNs?",
      "body": "Because attention-based layers allow much more parallel computation during training instead of strict token-by-token recurrence.",
      "target": {
        "view": "practice",
        "topic": "sequence-models",
        "question": "sequence-models-deep-03"
      }
    },
    {
      "kind": "quiz",
      "topic": "sequence-models",
      "title": "Why are multiple attention heads useful rather than redundant?",
      "body": "Because different heads can learn different relevance patterns or relational views of the same sequence in parallel.",
      "target": {
        "view": "practice",
        "topic": "sequence-models",
        "question": "sequence-models-deep-04"
      }
    },
    {
      "kind": "quiz",
      "topic": "sequence-models",
      "title": "Why does positional information still matter in a Transformer?",
      "body": "Because attention alone does not inherently encode token order, so positional signals are needed to distinguish sequences with the same tokens in different arrangements.",
      "target": {
        "view": "practice",
        "topic": "sequence-models",
        "question": "sequence-models-deep-05"
      }
    },
    {
      "kind": "quiz",
      "topic": "generative-ai",
      "title": "Why does decoding matter if the model already outputs probabilities?",
      "body": "Because probabilities are not yet final text. The decoding rule decides how those probabilities are turned into an actual token sequence, which strongly affects diversity and coherence.",
      "target": {
        "view": "practice",
        "topic": "generative-ai",
        "question": "generative-ai-deep-01"
      }
    },
    {
      "kind": "quiz",
      "topic": "generative-ai",
      "title": "Why is instruction tuning different from pretraining?",
      "body": "Pretraining teaches broad next-token modeling from general corpora, while instruction tuning specifically teaches the model to respond helpfully to task-like prompts.",
      "target": {
        "view": "practice",
        "topic": "generative-ai",
        "question": "generative-ai-deep-02"
      }
    },
    {
      "kind": "quiz",
      "topic": "generative-ai",
      "title": "Why does RLHF improve user experience without guaranteeing truth?",
      "body": "Because it optimizes toward outputs preferred by human raters, which often improves tone and helpfulness but is not the same as direct factual verification.",
      "target": {
        "view": "practice",
        "topic": "generative-ai",
        "question": "generative-ai-deep-03"
      }
    },
    {
      "kind": "quiz",
      "topic": "generative-ai",
      "title": "Why is KV cache a system optimization rather than a new learning objective?",
      "body": "Because it speeds up autoregressive inference by reusing prior attention computations rather than changing how the model was trained.",
      "target": {
        "view": "practice",
        "topic": "generative-ai",
        "question": "generative-ai-deep-04"
      }
    },
    {
      "kind": "quiz",
      "topic": "generative-ai",
      "title": "Why are diffusion models often slower than autoregressive text generation feels conceptually?",
      "body": "Because image generation typically requires many iterative denoising steps, whereas text generation emits one token at a time from a directly trained autoregressive model.",
      "target": {
        "view": "practice",
        "topic": "generative-ai",
        "question": "generative-ai-deep-05"
      }
    },
    {
      "kind": "glossary",
      "topic": "unsupervised-learning",
      "title": "Agglomerative clustering",
      "body": "A hierarchical clustering method that starts with each point as its own cluster and repeatedly merges the closest pair.",
      "target": {
        "view": "glossary",
        "term": "Agglomerative clustering"
      }
    },
    {
      "kind": "glossary",
      "topic": "unsupervised-learning",
      "title": "Centroid",
      "body": "The mean of the points assigned to a cluster in K-means.",
      "target": {
        "view": "glossary",
        "term": "Centroid"
      }
    },
    {
      "kind": "glossary",
      "topic": "unsupervised-learning",
      "title": "Dendrogram",
      "body": "A tree-like diagram showing the order and height of hierarchical merges.",
      "target": {
        "view": "glossary",
        "term": "Dendrogram"
      }
    },
    {
      "kind": "glossary",
      "topic": "unsupervised-learning",
      "title": "Inertia",
      "body": "The within-cluster sum of squared distances minimized by K-means.",
      "target": {
        "view": "glossary",
        "term": "Inertia"
      }
    },
    {
      "kind": "glossary",
      "topic": "unsupervised-learning",
      "title": "Principal component",
      "body": "A direction in feature space that captures as much variance as possible subject to orthogonality constraints.",
      "target": {
        "view": "glossary",
        "term": "Principal component"
      }
    },
    {
      "kind": "glossary",
      "topic": "unsupervised-learning",
      "title": "t-SNE",
      "body": "A nonlinear visualization method that preserves local neighborhoods better than global geometry.",
      "target": {
        "view": "glossary",
        "term": "t-SNE"
      }
    },
    {
      "kind": "glossary",
      "topic": "neural-networks-foundations",
      "title": "Activation function",
      "body": "A nonlinearity applied after an affine transformation so stacked layers can represent nonlinear structure.",
      "target": {
        "view": "glossary",
        "term": "Activation function"
      }
    },
    {
      "kind": "glossary",
      "topic": "neural-networks-foundations",
      "title": "Backpropagation",
      "body": "Efficient chain-rule computation of gradients through a layered network.",
      "target": {
        "view": "glossary",
        "term": "Backpropagation"
      }
    },
    {
      "kind": "glossary",
      "topic": "neural-networks-foundations",
      "title": "Cross-entropy",
      "body": "A loss that penalizes assigning low probability to the correct class and is standard for classification.",
      "target": {
        "view": "glossary",
        "term": "Cross-entropy"
      }
    },
    {
      "kind": "glossary",
      "topic": "neural-networks-foundations",
      "title": "Dropout",
      "body": "A regularization method that randomly zeros some units during training to reduce co-adaptation.",
      "target": {
        "view": "glossary",
        "term": "Dropout"
      }
    },
    {
      "kind": "glossary",
      "topic": "neural-networks-foundations",
      "title": "Learning rate",
      "body": "The step size used when updating parameters with gradient-based optimization.",
      "target": {
        "view": "glossary",
        "term": "Learning rate"
      }
    },
    {
      "kind": "glossary",
      "topic": "neural-networks-foundations",
      "title": "ReLU",
      "body": "The rectified linear unit max(0, x), a common hidden-layer activation in modern deep learning.",
      "target": {
        "view": "glossary",
        "term": "ReLU"
      }
    },
    {
      "kind": "glossary",
      "topic": "convolutional-networks",
      "title": "Batch normalization",
      "body": "A normalization layer that stabilizes hidden activations and often makes deep networks easier to optimize.",
      "target": {
        "view": "glossary",
        "term": "Batch normalization"
      }
    },
    {
      "kind": "glossary",
      "topic": "convolutional-networks",
      "title": "Depthwise separable convolution",
      "body": "A factorized convolution that separates spatial filtering from channel mixing to reduce cost.",
      "target": {
        "view": "glossary",
        "term": "Depthwise separable convolution"
      }
    },
    {
      "kind": "glossary",
      "topic": "convolutional-networks",
      "title": "Receptive field",
      "body": "The region of the original input that can influence a given unit's activation.",
      "target": {
        "view": "glossary",
        "term": "Receptive field"
      }
    },
    {
      "kind": "glossary",
      "topic": "convolutional-networks",
      "title": "Residual connection",
      "body": "A shortcut path that lets a block learn a refinement relative to its input, helping deep optimization.",
      "target": {
        "view": "glossary",
        "term": "Residual connection"
      }
    },
    {
      "kind": "glossary",
      "topic": "convolutional-networks",
      "title": "Transfer learning",
      "body": "Reusing a model pretrained on a large source task as the starting point for a new target task.",
      "target": {
        "view": "glossary",
        "term": "Transfer learning"
      }
    },
    {
      "kind": "glossary",
      "topic": "recommendation-systems",
      "title": "Candidate generation",
      "body": "The fast retrieval stage that narrows a huge recommendation catalog into a plausible smaller set.",
      "target": {
        "view": "glossary",
        "term": "Candidate generation"
      }
    },
    {
      "kind": "glossary",
      "topic": "recommendation-systems",
      "title": "Collaborative filtering",
      "body": "Recommendation based on user-item interaction patterns rather than only explicit item features.",
      "target": {
        "view": "glossary",
        "term": "Collaborative filtering"
      }
    },
    {
      "kind": "glossary",
      "topic": "recommendation-systems",
      "title": "Cold start",
      "body": "The difficulty of recommending for new users or new items with little interaction history.",
      "target": {
        "view": "glossary",
        "term": "Cold start"
      }
    },
    {
      "kind": "glossary",
      "topic": "recommendation-systems",
      "title": "Cosine similarity",
      "body": "A similarity measure based on vector angle that is common in content-based recommendation and text features.",
      "target": {
        "view": "glossary",
        "term": "Cosine similarity"
      }
    },
    {
      "kind": "glossary",
      "topic": "recommendation-systems",
      "title": "Matrix factorization",
      "body": "A latent-factor model that learns low-dimensional user and item vectors whose alignment predicts preference.",
      "target": {
        "view": "glossary",
        "term": "Matrix factorization"
      }
    },
    {
      "kind": "glossary",
      "topic": "recommendation-systems",
      "title": "MRR",
      "body": "Mean Reciprocal Rank, a metric that emphasizes how early the first relevant result appears.",
      "target": {
        "view": "glossary",
        "term": "MRR"
      }
    },
    {
      "kind": "glossary",
      "topic": "recommendation-systems",
      "title": "nDCG",
      "body": "Normalized Discounted Cumulative Gain, a ranking metric that rewards placing relevant items near the top.",
      "target": {
        "view": "glossary",
        "term": "nDCG"
      }
    },
    {
      "kind": "glossary",
      "topic": "sequence-models",
      "title": "Attention",
      "body": "A mechanism that learns where to look by weighting other positions according to contextual relevance.",
      "target": {
        "view": "glossary",
        "term": "Attention"
      }
    },
    {
      "kind": "glossary",
      "topic": "sequence-models",
      "title": "Encoder-decoder",
      "body": "A sequence architecture in which one module reads the input sequence and another generates the output sequence.",
      "target": {
        "view": "glossary",
        "term": "Encoder-decoder"
      }
    },
    {
      "kind": "glossary",
      "topic": "sequence-models",
      "title": "Exploding gradient",
      "body": "A gradient that grows too large across many time steps or layers, destabilizing training.",
      "target": {
        "view": "glossary",
        "term": "Exploding gradient"
      }
    },
    {
      "kind": "glossary",
      "topic": "sequence-models",
      "title": "LSTM",
      "body": "A gated recurrent architecture that controls memory with forget, input, and output gates.",
      "target": {
        "view": "glossary",
        "term": "LSTM"
      }
    },
    {
      "kind": "glossary",
      "topic": "sequence-models",
      "title": "Teacher forcing",
      "body": "Training a decoder by feeding the true previous token rather than the model's own previous prediction.",
      "target": {
        "view": "glossary",
        "term": "Teacher forcing"
      }
    },
    {
      "kind": "glossary",
      "topic": "sequence-models",
      "title": "Transformer",
      "body": "An architecture that uses attention as the main sequence-processing mechanism and scales well to large tasks.",
      "target": {
        "view": "glossary",
        "term": "Transformer"
      }
    },
    {
      "kind": "glossary",
      "topic": "generative-ai",
      "title": "Autoregressive model",
      "body": "A model that generates a sequence step by step by conditioning each token on the previous context.",
      "target": {
        "view": "glossary",
        "term": "Autoregressive model"
      }
    },
    {
      "kind": "glossary",
      "topic": "generative-ai",
      "title": "BLEU",
      "body": "A classic overlap-based text generation metric that can miss semantic equivalence.",
      "target": {
        "view": "glossary",
        "term": "BLEU"
      }
    },
    {
      "kind": "glossary",
      "topic": "generative-ai",
      "title": "Diffusion model",
      "body": "A generative model that learns to reverse a gradual noising process.",
      "target": {
        "view": "glossary",
        "term": "Diffusion model"
      }
    },
    {
      "kind": "glossary",
      "topic": "generative-ai",
      "title": "In-context learning",
      "body": "Task adaptation from examples placed inside the prompt without updating model weights.",
      "target": {
        "view": "glossary",
        "term": "In-context learning"
      }
    },
    {
      "kind": "glossary",
      "topic": "generative-ai",
      "title": "Instruction tuning",
      "body": "Supervised fine-tuning on instruction-response pairs so a model behaves more helpfully as an assistant.",
      "target": {
        "view": "glossary",
        "term": "Instruction tuning"
      }
    },
    {
      "kind": "glossary",
      "topic": "generative-ai",
      "title": "KV cache",
      "body": "Stored attention keys and values from earlier tokens that reduce recomputation during autoregressive decoding.",
      "target": {
        "view": "glossary",
        "term": "KV cache"
      }
    },
    {
      "kind": "glossary",
      "topic": "generative-ai",
      "title": "LoRA",
      "body": "Low-Rank Adaptation, a parameter-efficient way to fine-tune very large models.",
      "target": {
        "view": "glossary",
        "term": "LoRA"
      }
    },
    {
      "kind": "glossary",
      "topic": "generative-ai",
      "title": "RAG",
      "body": "Retrieval-Augmented Generation, which supplies external documents at inference time for grounding or freshness.",
      "target": {
        "view": "glossary",
        "term": "RAG"
      }
    },
    {
      "kind": "glossary",
      "topic": "generative-ai",
      "title": "RLHF",
      "body": "Reinforcement Learning from Human Feedback, an alignment pipeline that optimizes outputs toward human preferences.",
      "target": {
        "view": "glossary",
        "term": "RLHF"
      }
    },
    {
      "kind": "glossary",
      "topic": "generative-ai",
      "title": "Tokenization",
      "body": "The process of splitting text into tokens such as words, subwords, punctuation, or special units.",
      "target": {
        "view": "glossary",
        "term": "Tokenization"
      }
    }
  ]
};
