# how-the-web-actually-works
A simple project explaining how a web request travels from the browser to a website.
# Request Trace Lab

This project contains a diagram tracing an HTTP request to a shipping tracking website, labeling every hop along with a short explanation.

## Request Trace Diagram

```mermaid
sequenceDiagram
    autonumber
    actor User as User Browser (Client)
    participant DNS as DNS Resolver
    participant CDN as CDN / Load Balancer
    participant Web as Web Server (Frontend)
    participant API as Application API Server
    participant DB as Database (DB)

    User->>DNS: DNS Lookup ("[www.ship-track.com](https://www.ship-track.com)")
    DNS-->>User: IP Address returned
    User->>CDN: HTTP GET Request ("/track/SA123456789")
    CDN->>Web: Forwarding Request to Origin
    Web->>API: Internal API Call (`fetch_tracking_details`)
    API->>DB: Database Query (`SELECT * FROM shipments`)
    DB-->>API: Shipment data retrieved
    API-->>Web: JSON data (status, location, date)
    Web-->>CDN: Rendered HTML Page
    CDN-->>User: HTTP Response (200 OK) + Content
    User->>User: Browser renders the tracking page
