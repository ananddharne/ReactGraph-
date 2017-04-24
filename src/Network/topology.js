module.exports = {
  "description": "Simple topo",
  "name": "simple",
  "nodes": [
      {
            "label_dx": null,
            "label_dy": null,
            "label_position": "top",
            "name": "Kansas",
            "type": "esnet_site",
            "x": 100,
            "y": 20,
          },
      {
            "label_dx": null,
            "label_dy": null,
            "label_position": "top",
            "name": "Houston",
            "site": 5,
            "type": "esnet_site",
            "x": 100,
            "y": 80,
          },
      {
            "label_dx": null,
            "label_dy": null,
            "label_position": "top",
            "name": "Sunn",
            "site": 5,
            "type": "hub",
            "x": 50,
            "y": 80,
          },

          {
            "label_dx": null,
            "label_dy": null,
            "label_position": "top",
            "name": "Boston",
            "site": 5,
            "type": "hub",
            "x": 140,
            "y": 16,
          },
          {
            "label_dx": null,
            "label_dy": null,
            "label_position": "top",
            "name": "New-York",
            "site": 5,
            "type": "hub",
            "x": 140,
            "y": 25,
          },
{
            "label_dx": null,
            "label_dy": null,
            "label_position": "top",
            "name": "Chicago",
            "site": 5,
            "type": "hub",
            "x": 115,
            "y": 25,
          },

{
            "label_dx": null,
            "label_dy": null,
            "label_position": "top",
            "name": "Amst",
            "site": 5,
            "type": "hub",
            "x": 166,
            "y": 21,
          },
{
            "label_dx": null,
            "label_dy": null,
            "label_position": "top",
            "name": "Cern",
            "site": 5,
            "type": "hub",
            "x": 166,
            "y": 30,
          },

{
            "label_dx": null,
            "label_dy": null,
            "label_position": "top",
            "name": "Lond",
            "site": 5,
            "type": "hub",
            "x": 163,
            "y": 26,
          },

{
            "label_dx": null,
            "label_dy": null,
            "label_position": "top",
            "name": "SACR",
            "site": 5,
            "type": "hub",
            "x": 50,
            "y": 60,
          },


{
            "label_dx": null,
            "label_dy": null,
            "label_position": "top",
            "name": "SAND",
            "site": 5,
            "type": "hub",
            "x": 50,
            "y": 85,
          },


{
            "label_dx": null,
            "label_dy": null,
            "label_position": "top",
            "name": "Denv",
            "site": 5,
            "type": "hub",
            "x": 80,
            "y": 60,
          },


{
            "label_dx": null,
            "label_dy": null,
            "label_position": "top",
            "name": "ALBQ",
            "site": 5,
            "type": "hub",
            "x": 80,
            "y": 75,
          },


{
            "label_dx": null,
            "label_dy": null,
            "label_position": "top",
            "name": "ELPA",
            "site": 5,
            "type": "hub",
            "x": 80,
            "y": 147,
          }




    ],
  "edges": [
      {
            "capacity": "100G",
            "source": "Kansas",
            "target": "Houston"
          },
      {
            "capacity": "40G",
            "source": "Houston",
            "target": "New-York"
          },
      {
            "capacity": "10G",
            "source": "Node3",
            "target": "Node1"
          }
    ]
};
