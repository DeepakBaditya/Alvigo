import heapq

class Graph:
    def __init__(self, vertices):
        self.V = vertices
        self.adj_list = {i: [] for i in range(vertices)}

    def add_edge(self, u, v, weight):
        self.adj_list[u].append((weight, v))
        self.adj_list[v].append((weight, u))  # Since the graph is undirected

    def prim_mst(self):
        visited = [False] * self.V
        min_heap = [(0, 0)]  # (Weight, Vertex) starting from vertex 0
        mst_weight = 0
        mst_edges = []

        while min_heap:
            weight, u = heapq.heappop(min_heap)

            if visited[u]:
                continue  # Skip if node already included in MST

            visited[u] = True
            mst_weight += weight

            for edge_weight, v in self.adj_list[u]:
                if not visited[v]:
                    heapq.heappush(min_heap, (edge_weight, v))
                    mst_edges.append((u, v, edge_weight))

        return mst_weight, mst_edges

# Example usage
if __name__ == "__main__":
    g = Graph(5)
    g.add_edge(0, 1, 2)
    g.add_edge(0, 3, 6)
    g.add_edge(1, 2, 3)
    g.add_edge(1, 3, 8)
    g.add_edge(1, 4, 5)
    g.add_edge(2, 4, 7)
    g.add_edge(3, 4, 9)

    mst_weight, mst_edges = g.prim_mst()
    print("Minimum Spanning Tree Weight:", mst_weight)
    print("Edges in MST:")
    for u, v, w in mst_edges:
        print(f"{u} -- {v} (Weight: {w})")
