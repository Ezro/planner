from datetime import datetime
import pytz
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


notes = {
    1: {
        "id": 1,
        "createDate": datetime.fromisoformat("2023-08-13T00:00:00").astimezone(tz=pytz.timezone('US/Eastern')),
        'week': 33,
        "text": "Buy groceries",
        "category": "Work"
    },
    2: {
        "id": 2,
        "createDate": datetime.fromisoformat("2023-08-12T00:00:00").astimezone(tz=pytz.timezone('US/Eastern')),
        'week': 32,
        "text": "Finish Svelte tutorial",
        "category": "Personal"
    }
}

weeks = {
    2022: {
        31: {
            "startDate": datetime.fromisoformat("2022-08-13T00:00:00").astimezone(tz=pytz.timezone('US/Eastern')),
            "endDate": datetime.fromisoformat("2022-08-19T23:59:59").astimezone(tz=pytz.timezone('US/Eastern')),
            "weekNumber": 31
        },
        32: {
            "startDate": datetime.fromisoformat("2022-08-13T00:00:00").astimezone(tz=pytz.timezone('US/Eastern')),
            "endDate": datetime.fromisoformat("2022-08-19T23:59:59").astimezone(tz=pytz.timezone('US/Eastern')),
            "weekNumber": 32,
            "categories": {
                "Personal": {
                    "notesUrl": "/api/notes?year=2022&week=32"
                }
            }
        },
        33: {
            "startDate": datetime.fromisoformat("2022-08-13T00:00:00").astimezone(tz=pytz.timezone('US/Eastern')),
            "endDate": datetime.fromisoformat("2022-08-19T23:59:59").astimezone(tz=pytz.timezone('US/Eastern')),
            "weekNumber": 33,
            "categories": {
                "Work": {
                    "notesUrl": "/api/notes?year=2022&week=33"
                }
            }
        }
    },
    2023: {
        31: {
            "startDate": datetime.fromisoformat("2023-08-13T00:00:00").astimezone(tz=pytz.timezone('US/Eastern')),
            "endDate": datetime.fromisoformat("2023-08-19T23:59:59").astimezone(tz=pytz.timezone('US/Eastern')),
            "weekNumber": 31
        },
        32: {
            "startDate": datetime.fromisoformat("2023-08-13T00:00:00").astimezone(tz=pytz.timezone('US/Eastern')),
            "endDate": datetime.fromisoformat("2023-08-19T23:59:59").astimezone(tz=pytz.timezone('US/Eastern')),
            "weekNumber": 32,
            "categories": {
                "Personal": {
                    "notesUrl": "/api/notes?year=2023&week=32"
                }
            }
        },
        33: {
            "startDate": datetime.fromisoformat("2023-08-13T00:00:00").astimezone(tz=pytz.timezone('US/Eastern')),
            "endDate": datetime.fromisoformat("2023-08-19T23:59:59").astimezone(tz=pytz.timezone('US/Eastern')),
            "weekNumber": 33,
            "categories": {
                "Work": {
                    "notesUrl": "/api/notes?year=2023&week=33"
                }
            }
        }
    }
}

@app.route("/api/notes", methods=["GET"])
def get_notes():
    args = request.args
    year = args.get('year')
    week = args.get('week')
    category = args.get('category')
    print(year, week, category)
    return jsonify(filter_notes(year, week, category))

def filter_notes(year, week, category):
    filtered_notes = []
    for _, note in notes.items():
        if year and note['createDate'].year != int(year):
            continue
        if week and note['week'] != int(week):
            continue
        if category and note['category'] != category:
            continue
        filtered_notes.append(note)
    return filtered_notes

@app.route("/api/notes/<int:note_id>", methods=["GET"])
def get_note(note_id):
    if note_id not in notes:
        return None
    return jsonify(notes[note_id])

@app.route("/api/weeks", methods=["GET"])
def get_weeks():
    return jsonify(weeks)

@app.route("/api/weeks/<int:year>", methods=["GET"])
def get_weeks_by_year(year):
    if int(year) not in weeks:
        return {'error': 'Not Found'}, 404
    return jsonify(weeks[year])

@app.route("/api/weeks/<int:year>/<int:week_number>", methods=["GET"])
def get_week(year, week_number):
    print(year, week_number)
    if year not in weeks or week_number not in weeks[year]:
        return {'error': 'Not Found'}, 404
    return jsonify(weeks[year][week_number])

@app.route("/api/notes", methods=["POST"])
def add_note():
    new_note = {"id": len(notes) + 1, "text": request.json["text"]}
    notes.append(new_note)
    return jsonify(new_note), 201


@app.route("/api/notes/<int:note_id>", methods=["DELETE"])
def delete_note(note_id):
    global notes
    notes = [note for note in notes if note["id"] != note_id]
    return "", 204


if __name__ == "__main__":
    app.run(debug=True)
